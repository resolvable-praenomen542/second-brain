import OpenAI from 'openai';
import { SUPPORTED_LANGUAGES } from '../data/i18n';

const SYSTEM_PROMPT_BASE = `
[INSTRUÇÃO ESTRITA]
Você é um roteirista de teleprompter especialista em comunicação executiva e técnica, auxiliando um profissional sênior em uma entrevista.
O usuário vai enviar a pergunta que o entrevistador/cliente acabou de fazer.
Sua missão é escrever a RESPOSTA EXATA que o profissional deve ler em voz alta.
Você deve agir como o próprio profissional respondendo: em primeira pessoa ("Eu estruturei...", "Eu gerenciei...").

[REGRA DE OURO - LEITURA DINÂMICA E IMPACTO]
1. LEITURA DINÂMICA: O profissional vai ler isso no meio da entrevista! NUNCA crie blocos densos de texto. Escreva em frases curtas e de alto impacto (máximo 15 palavras por frase). PULE UMA LINHA a cada frase.
2. NUNCA DELEGUE A RESPOSTA ("Veja no meu portfólio", "Lá no meu relatório"). O recrutador quer ouvir a SUA experiência na hora. Fale como uma vivência real focada na AÇÃO e no RESULTADO.
3. Você DEVE extrair as habilidades e os resultados do [CONTEXTO DO CANDIDATO] fornecido abaixo para justificar o *como* e o *porquê* das suas soluções.

[EXEMPLO DO FORMATO DE RESPOSTA (Genérico)]
Entrevistador: "Como você lidou com um grande desafio recente?"
Sua resposta gerada: 
"Em um projeto recente de alta complexidade, eu fui o responsável por liderar a reestruturação.

Primeiro, fiz um diagnóstico profundo para identificar os gargalos principais.

Depois, implementei um plano de ação focado em otimização de recursos e eficiência.

Fiquei monitorando de perto os indicadores de performance ao longo de três meses.

O grande valor disso foi reduzir os custos operacionais em 20% antes do final do semestre."

[REGRAS GERAIS]
- Entregue a resposta EXATAMENTE no formato do exemplo: frases muito curtas, com espaço extra entre elas.
- Sem bullet points (bolinhas ou traços).
- Evite palavras longas que travam a língua. Use termos claros e diretos pertinentes à profissão indicada no currículo.
- Se a pergunta não fizer nenhum sentido no contexto corporativo, retorne VAZIO.
`;

export const generateInterviewSuggestions = async (transcript: string, cv?: string, job?: string, apiKey?: string, langId: string = 'pt-BR'): Promise<string[]> => {
  if (!transcript || transcript.trim().length < 10) return [];
  if (!apiKey) return ['Chave da Groq API não encontrada.', 'Por favor, insira nas configurações.'];

  const langObj = SUPPORTED_LANGUAGES.find(l => l.id === langId) || SUPPORTED_LANGUAGES[0];

  const groqClient = new OpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const contextPrompt = `
${SYSTEM_PROMPT_BASE}

[IDIOMA OBRIGATÓRIO]
${langObj.promptLanguageInstruction}

[CONTEXTO DO PROFISSIONAL]
Currículo/Experiência: ${cv || "Não informado"}
Descrição do Desafio/Vaga Atual: ${job || "Não informado"}
`;

  try {
    const response = await groqClient.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Modelo atualizado da Groq
      messages: [
        { role: 'system', content: contextPrompt },
        { role: 'user', content: `Entrevistador: "${transcript}"\nRoteiro exato para o candidato ler:` },
      ],
      temperature: 0.6,
      max_tokens: 500, // Aumentado para não cortar textos longos e respostas profundas
    });

    const content = response.choices[0].message.content;
    if (!content) return [];

    // Como o usuário agora quer um roteiro direto em primeira pessoa (e não bullet points),
    // vamos retornar o texto inteiro como um único parágrafo ou dividi-lo por quebras de linha reais.
    return content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  } catch (error) {
    console.error('Groq LLM Error:', error);
    return ['Erro de conexão com a IA da Groq.', 'Verifique a sua chave nas configurações.'];
  }
};
