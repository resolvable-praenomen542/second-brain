<div align="center">
  <img src="public/icon.png" alt="Second Brain Logo" width="120" />
  <h1>Second Brain 🧠</h1>
  <p><strong>O seu assistente de entrevistas invisível movido a IA</strong></p>

  [English](README.md) | [Português](README.pt.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md)
</div>

<br/>

O **Second Brain** é um assistente de desktop 100% gratuito e invisível criado para ajudar profissionais do mundo todo a brilharem em suas entrevistas de emprego. Ele roda silenciosamente em segundo plano, ouvindo a entrevista, e gera sugestões de resposta em primeira pessoa baseadas no seu próprio currículo e na descrição da vaga.

Alimentado pela inferência ultrarrápida da Llama-3 da [Groq](https://groq.com) e pelo modelo Whisper-large-v3, todo o processo — desde a captura de voz até a sugestão inteligente — acontece em milissegundos.

## ✨ Recursos

- **Transcrição de Voz em Tempo Real**: Usa o Whisper-v3 via Groq API para transcrever a fala do entrevistador com precisão e velocidade extremas.
- **Sugestões com Contexto**: Analisa a conversa atual, o seu currículo e a descrição da vaga para sugerir as melhores respostas possíveis.
- **Suporte Multilíngue**: Interface e motor de IA 100% localizados para Inglês, Português (Brasil e Portugal), Espanhol, Francês e Italiano.
- **Modo Invisível**: Construído com Electron, pode ser minimizado para não atrapalhar enquanto você foca na sua chamada de vídeo.
- **Privacidade em Primeiro Lugar**: O seu currículo, vaga e chaves de API ficam salvos exclusivamente na memória local (`localStorage`) do seu próprio computador.

## 🚀 Guia Rápido (Download)

1. **Baixe o Instalador:**
   Faça o download do `Second Brain Setup .exe` mais recente na nossa página de [Releases](../../releases).
   
2. **Crie uma Groq API Key Gratuita:**
   Acesse [console.groq.com](https://console.groq.com/keys) e gere uma chave de API gratuita. Ela é essencial para rodar o motor da IA em alta velocidade.

3. **Instale e Configure:**
   - Abra o aplicativo.
   - Cole sua Chave de API.
   - Cole seu Currículo e a Descrição da Vaga.
   - Selecione seu idioma.
   - Clique em **Começar Entrevista** e pronto!

## 🛠️ Desenvolvimento (Para Programadores)

Se você quiser compilar o código fonte ou contribuir:

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
git clone https://github.com/2brain/second-brain.git
cd second-brain

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Compilando para Produção (Instalador)

```bash
# Compilar e gerar o instalador do Electron
npm run dist
```
O instalador `.exe` será gerado dentro da pasta `dist-installers`.

## 🤝 Apoie o Projeto

O Second Brain é open-source e gratuito para a comunidade. Se esta ferramenta ajudou você a conseguir um emprego ou arrasar numa entrevista, considere nos pagar um café!

<a href="https://www.buymeacoffee.com/2brain" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 145px !important;" ></a>

## ❓ FAQ (Perguntas Frequentes)

**1. É realmente 100% gratuito?**
Sim! O aplicativo é de código aberto e totalmente gratuito. Você só precisa criar uma conta gratuita na Groq para pegar sua chave de API.

**2. Meus dados estão seguros? Vocês salvam meu currículo?**
Sua privacidade é nossa prioridade absoluta. Nós não temos banco de dados. Sua chave da API e seu currículo são salvos estritamente no seu próprio computador (`localStorage`). Nada é enviado para nossos servidores.

**3. Qual é a melhor forma de preencher os campos "Currículo" e "Vaga"?**
Basta copiar e colar todo o texto bruto do seu currículo (PDF ou LinkedIn) e da descrição da vaga. Não se preocupe com formatação; a IA do Second Brain irá organizar automaticamente os seus dados na memória dela para gerar respostas com extrema precisão.

**4. Como posso testar o sistema sem estar em uma entrevista real?**
Você pode testar agora mesmo! Abra o aplicativo, clique em "Ouvir" e coloque um vídeo de simulação de entrevista no YouTube para tocar, ou simplesmente finja ser o recrutador e faça uma pergunta em voz alta.

**5. O que fazer se não estiver capturando o áudio? (Aviso sobre Fones de Ouvido)**
O Second Brain escuta através do microfone padrão do seu sistema. Se você usar fones de ouvido com isolamento rigoroso, o microfone pode não captar a voz do recrutador saindo do seu fone. **Sempre teste o sistema antes de entrar em qualquer entrevista.** Caso a voz do recrutador não seja captada, use as caixas de som do computador ou ajuste o roteamento de áudio do seu sistema.

**6. O recrutador pode ver ou ouvir a IA?**
Não. O Second Brain roda como uma janela independente. Ele não injeta áudio no seu microfone e não compartilha a sua tela. É 100% invisível.

**7. Por que a IA demora alguns segundos para responder?**
A IA espera o entrevistador terminar um raciocínio completo antes de gerar uma resposta. Ela escuta em blocos de 7 segundos para garantir que entendeu a pergunta inteira.

**8. Funciona no Mac ou Linux?**
Os instaladores automáticos (`.exe`) são para Windows. No entanto, desenvolvedores podem clonar este repositório e rodar `npm run dist` para compilar nativamente para macOS ou Linux.

---

## 📝 Licença

Distribuído sob uma Licença Não-Comercial. Você é livre para usar e estudar o software, mas **a venda ou distribuição comercial é estritamente proibida**. Veja o arquivo `LICENSE` para mais informações.
