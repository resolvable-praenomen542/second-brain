export interface UI_Translations {
  // Common
  secondBrain: string;
  
  // Onboarding
  ob_title: string;
  ob_welcome: string;
  ob_desc: string;
  ob_apiKeyTitle: string;
  ob_apiKeyDesc1: string;
  ob_apiKeyDesc2: string;
  ob_apiKeyPlaceholder: string;
  ob_langTitle: string;
  ob_langDesc: string;
  ob_cvTitle: string;
  ob_cvDesc: string;
  ob_cvLabel: string;
  ob_cvPlaceholder: string;
  ob_jobLabel: string;
  ob_jobPlaceholder: string;
  ob_startButton: string;

  // Settings
  set_title: string;
  set_cvTitle: string;
  set_cvDesc: string;
  set_cvPlaceholder: string;
  set_jobTitle: string;
  set_jobDesc: string;
  set_jobPlaceholder: string;
  set_langTitle: string;
  set_langDesc: string;
  set_apiTitle: string;
  set_apiDesc: string;
  set_apiPlaceholder: string;
  set_saveButton: string;

  // App UI
  app_settingsTooltip: string;
  app_modelUnpacking: string;
  app_stopBtn: string;
  app_listenBtn: string;
  app_hideTooltip: string;
  app_closeTooltip: string;
  app_statusApi: string;
  app_statusActive: string;
  app_statusOffline: string;
  app_log: string;

  // Audio Logs
  log_silence: string;
  log_audioReady: string;
  log_processing: string;
  log_transcribed: string;
  log_empty: string;
  log_error: string;
  log_started: string;
  log_stopped: string;

  // Suggestion Panel
  sug_title: string;
  sug_processing: string;
  sug_listening: string;
  sug_clearBtn: string;

  // Transcription View
  trn_title: string;
  trn_waiting: string;
  trn_clearBtn: string;
}

export interface AppLanguage {
  id: string;          // Internal ID (e.g., pt-BR)
  name: string;        // Display Name (e.g., Português do Brasil)
  whisperCode: string; // ISO-639-1 code for Groq Whisper
  promptLanguageInstruction: string; // Instruction for Llama 3
  donateText: string;  // Text for the donation link
  ui: UI_Translations; // UI Dictionary
}

export const SUPPORTED_LANGUAGES: AppLanguage[] = [
  {
    id: 'pt-BR',
    name: 'Português (Brasil)',
    whisperCode: 'pt',
    promptLanguageInstruction: 'Você DEVE gerar a resposta estritamente em Português do Brasil (pt-BR), utilizando expressões e sotaque naturais do mercado de trabalho brasileiro.',
    donateText: 'Apoie o Projeto (Doar)',
    ui: {
      secondBrain: 'Second Brain',
      ob_title: 'Configuração Inicial',
      ob_welcome: 'Bem-vindo ao Second Brain',
      ob_desc: 'O seu assistente de entrevistas invisível. Precisamos de duas coisas para ligar o motor da Inteligência Artificial:',
      ob_apiKeyTitle: 'Chave da Groq API (Obrigatório)',
      ob_apiKeyDesc1: 'Nós usamos a IA Llama-3 de altíssima velocidade da Groq. É gratuita.',
      ob_apiKeyDesc2: 'Clique aqui para criar sua chave',
      ob_apiKeyPlaceholder: 'gsk_...',
      ob_langTitle: 'Idioma da Entrevista',
      ob_langDesc: 'A IA vai ouvir e responder neste idioma.',
      ob_cvTitle: 'Alimente o Cérebro (Opcional, mas recomendado)',
      ob_cvDesc: 'Cole o seu currículo e a descrição da vaga/projeto para a IA gerar roteiros baseados na sua experiência real, seja você de marketing, direito, saúde, TI ou engenharia.',
      ob_cvLabel: 'O Seu Currículo (Sua Experiência)',
      ob_cvPlaceholder: 'Cole seu currículo aqui...',
      ob_jobLabel: 'A Vaga / Desafio Atual',
      ob_jobPlaceholder: 'Cole a descrição da vaga aqui...',
      ob_startButton: 'Começar Entrevista',
      set_title: 'Configurações de Contexto',
      set_cvTitle: 'Seu Currículo / Portfólio (Recomendado)',
      set_cvDesc: 'Cole sua experiência profissional. Essencial para que a IA gere respostas fundamentadas na sua vivência real.',
      set_cvPlaceholder: 'Cole o seu currículo aqui...',
      set_jobTitle: 'Descrição da Vaga / Desafio',
      set_jobDesc: 'Cole aqui o anúncio da vaga ou o objetivo da reunião (qualquer área de atuação).',
      set_jobPlaceholder: 'Ex: Requisitos da vaga, problema a ser resolvido pelo seu serviço, etc...',
      set_langTitle: 'Idioma Base',
      set_langDesc: 'Define o idioma de transcrição e das respostas geradas.',
      set_apiTitle: 'Groq API Key (Transcrição de Voz)',
      set_apiDesc: 'Crie sua chave gratuita em console.groq.com. O áudio será processado na nuvem em milissegundos.',
      set_apiPlaceholder: 'gsk_...',
      set_saveButton: 'Salvar e Aplicar',
      app_settingsTooltip: 'Configurações',
      app_modelUnpacking: 'Descompactando Modelo...',
      app_stopBtn: 'Parar',
      app_listenBtn: 'Ouvir',
      app_hideTooltip: 'Esconder (Fica na bandeja)',
      app_closeTooltip: 'Fechar aplicativo',
      app_statusApi: 'Status da API:',
      app_statusActive: 'Ativa',
      app_statusOffline: 'Offline',
      app_log: 'Log:',
      log_silence: 'Silêncio detectado...',
      log_audioReady: 'Áudio pronto para transcrição',
      log_processing: 'Processando áudio na nuvem...',
      log_transcribed: 'Áudio transcrito com sucesso',
      log_empty: 'Áudio não continha fala.',
      log_error: 'Erro na transcrição.',
      log_started: 'Gravação Iniciada',
      log_stopped: 'Gravação Parada',
      sug_title: 'Sugestões de Resposta',
      sug_processing: 'Processando contexto do áudio e gerando sugestões em primeira pessoa...',
      sug_listening: 'Ouvindo entrevista... Nenhuma sugestão ainda.',
      sug_clearBtn: 'Limpar Respostas',
      trn_title: 'Transcrição',
      trn_waiting: 'Aguardando áudio...',
      trn_clearBtn: 'Limpar'
    }
  },
  {
    id: 'pt-PT',
    name: 'Português (Portugal)',
    whisperCode: 'pt',
    promptLanguageInstruction: 'Você DEVE gerar a resposta estritamente em Português de Portugal (pt-PT), utilizando expressões e sotaque naturais do mercado de trabalho português.',
    donateText: 'Apoie o Projeto (Donativo)',
    ui: {
      secondBrain: 'Second Brain',
      ob_title: 'Configuração Inicial',
      ob_welcome: 'Bem-vindo ao Second Brain',
      ob_desc: 'O seu assistente de entrevistas invisível. Precisamos de duas coisas para ligar o motor da Inteligência Artificial:',
      ob_apiKeyTitle: 'Chave da API Groq (Obrigatório)',
      ob_apiKeyDesc1: 'Usamos a IA Llama-3 de altíssima velocidade da Groq. É gratuita.',
      ob_apiKeyDesc2: 'Clique aqui para criar a sua chave',
      ob_apiKeyPlaceholder: 'gsk_...',
      ob_langTitle: 'Idioma da Entrevista',
      ob_langDesc: 'A IA vai ouvir e responder neste idioma.',
      ob_cvTitle: 'Alimente o Cérebro (Opcional, mas recomendado)',
      ob_cvDesc: 'Cole o seu currículo e a descrição da vaga/projeto para a IA gerar guiões baseados na sua experiência real, quer seja de marketing, direito, saúde, TI ou engenharia.',
      ob_cvLabel: 'O Seu Currículo (A Sua Experiência)',
      ob_cvPlaceholder: 'Cole o seu currículo aqui...',
      ob_jobLabel: 'A Vaga / Desafio Atual',
      ob_jobPlaceholder: 'Cole a descrição da vaga aqui...',
      ob_startButton: 'Começar Entrevista',
      set_title: 'Definições de Contexto',
      set_cvTitle: 'O Seu Currículo / Portefólio (Recomendado)',
      set_cvDesc: 'Cole a sua experiência profissional. Essencial para que a IA gere respostas fundamentadas na sua vivência real.',
      set_cvPlaceholder: 'Cole o seu currículo aqui...',
      set_jobTitle: 'Descrição da Vaga / Oferta',
      set_jobDesc: 'Cole aqui o anúncio da vaga ou o objetivo da reunião (qualquer área de atuação).',
      set_jobPlaceholder: 'Ex: Requisitos da vaga, problema a ser resolvido pelo seu serviço, etc...',
      set_langTitle: 'Idioma Base',
      set_langDesc: 'Define o idioma de transcrição e das respostas geradas.',
      set_apiTitle: 'Chave API Groq (Transcrição de Voz)',
      set_apiDesc: 'Crie a sua chave gratuita em console.groq.com. O áudio será processado na cloud em milissegundos.',
      set_apiPlaceholder: 'gsk_...',
      set_saveButton: 'Guardar e Aplicar',
      app_settingsTooltip: 'Definições',
      app_modelUnpacking: 'A descompactar Modelo...',
      app_stopBtn: 'Parar',
      app_listenBtn: 'Ouvir',
      app_hideTooltip: 'Esconder (Minimizar)',
      app_closeTooltip: 'Fechar aplicação',
      app_statusApi: 'Estado da API:',
      app_statusActive: 'Ativa',
      app_statusOffline: 'Offline',
      app_log: 'Registo:',
      log_silence: 'Silêncio detetado...',
      log_audioReady: 'Áudio pronto para transcrição',
      log_processing: 'A processar o áudio na cloud...',
      log_transcribed: 'Áudio transcrito com sucesso',
      log_empty: 'O áudio não continha voz.',
      log_error: 'Erro na transcrição.',
      log_started: 'Gravação Iniciada',
      log_stopped: 'Gravação Parada',
      sug_title: 'Sugestões de Resposta',
      sug_processing: 'A processar o contexto do áudio e a gerar sugestões na primeira pessoa...',
      sug_listening: 'A ouvir a entrevista... Nenhuma sugestão ainda.',
      sug_clearBtn: 'Limpar Respostas',
      trn_title: 'Transcrição',
      trn_waiting: 'A aguardar áudio...',
      trn_clearBtn: 'Limpar'
    }
  },
  {
    id: 'es-ES',
    name: 'Español',
    whisperCode: 'es',
    promptLanguageInstruction: 'DEBES generar la respuesta estrictamente en Español, utilizando expresiones corporativas y profesionales naturales.',
    donateText: 'Apoya el Proyecto (Donar)',
    ui: {
      secondBrain: 'Second Brain',
      ob_title: 'Configuración Inicial',
      ob_welcome: 'Bienvenido a Second Brain',
      ob_desc: 'Tu asistente de entrevistas invisible. Necesitamos dos cosas para encender el motor de la Inteligencia Artificial:',
      ob_apiKeyTitle: 'Clave de Groq API (Obligatorio)',
      ob_apiKeyDesc1: 'Usamos la IA Llama-3 de altísima velocidad de Groq. Es gratuita.',
      ob_apiKeyDesc2: 'Haz clic aquí para crear tu clave',
      ob_apiKeyPlaceholder: 'gsk_...',
      ob_langTitle: 'Idioma de la Entrevista',
      ob_langDesc: 'La IA escuchará y responderá en este idioma.',
      ob_cvTitle: 'Alimenta el Cerebro (Opcional, pero recomendado)',
      ob_cvDesc: 'Pega tu currículum y la descripción de la vacante/proyecto para que la IA genere guiones basados en tu experiencia real, ya seas de marketing, derecho, salud, TI o ingeniería.',
      ob_cvLabel: 'Tu Currículum (Tu Experiencia)',
      ob_cvPlaceholder: 'Pega tu currículum aquí...',
      ob_jobLabel: 'La Vacante / Desafío Actual',
      ob_jobPlaceholder: 'Pega la descripción de la vacante aquí...',
      ob_startButton: 'Comenzar Entrevista',
      set_title: 'Configuraciones de Contexto',
      set_cvTitle: 'Tu Currículum / Portafolio (Recomendado)',
      set_cvDesc: 'Pega tu experiencia profesional. Esencial para que la IA genere respuestas fundamentadas en tu vivencia real.',
      set_cvPlaceholder: 'Pega tu currículum aquí...',
      set_jobTitle: 'Descripción de la Vacante / Desafío',
      set_jobDesc: 'Pega aquí el anuncio de la vacante o el objetivo de la reunión (cualquier área de actuación).',
      set_jobPlaceholder: 'Ej: Requisitos de la vacante, problema a resolver por tu servicio, etc...',
      set_langTitle: 'Idioma Base',
      set_langDesc: 'Define el idioma de transcripción y de las respuestas generadas.',
      set_apiTitle: 'Groq API Key (Transcripción de Voz)',
      set_apiDesc: 'Crea tu clave gratuita en console.groq.com. El audio será procesado en la nube en milisegundos.',
      set_apiPlaceholder: 'gsk_...',
      set_saveButton: 'Guardar y Aplicar',
      app_settingsTooltip: 'Configuraciones',
      app_modelUnpacking: 'Descomprimiendo Modelo...',
      app_stopBtn: 'Parar',
      app_listenBtn: 'Escuchar',
      app_hideTooltip: 'Ocultar (En la bandeja)',
      app_closeTooltip: 'Cerrar aplicación',
      app_statusApi: 'Estado de API:',
      app_statusActive: 'Activa',
      app_statusOffline: 'Offline',
      app_log: 'Log:',
      log_silence: 'Silencio detectado...',
      log_audioReady: 'Audio listo para transcripción',
      log_processing: 'Procesando audio en la nube...',
      log_transcribed: 'Audio transcrito con éxito',
      log_empty: 'El audio no contenía voz.',
      log_error: 'Error en la transcripción.',
      log_started: 'Grabación Iniciada',
      log_stopped: 'Grabación Detenida',
      sug_title: 'Sugerencias de Respuesta',
      sug_processing: 'Procesando el contexto del audio y generando sugerencias en primera persona...',
      sug_listening: 'Escuchando entrevista... Aún no hay sugerencias.',
      sug_clearBtn: 'Limpiar Respuestas',
      trn_title: 'Transcripción',
      trn_waiting: 'Esperando audio...',
      trn_clearBtn: 'Limpiar'
    }
  },
  {
    id: 'en',
    name: 'English',
    whisperCode: 'en',
    promptLanguageInstruction: 'You MUST generate the response strictly in English, using natural corporate and professional expressions.',
    donateText: 'Support the Project (Donate)',
    ui: {
      secondBrain: 'Second Brain',
      ob_title: 'Initial Setup',
      ob_welcome: 'Welcome to Second Brain',
      ob_desc: 'Your invisible interview assistant. We need two things to start the AI engine:',
      ob_apiKeyTitle: 'Groq API Key (Required)',
      ob_apiKeyDesc1: 'We use the ultra-fast Llama-3 AI from Groq. It is free.',
      ob_apiKeyDesc2: 'Click here to create your key',
      ob_apiKeyPlaceholder: 'gsk_...',
      ob_langTitle: 'Interview Language',
      ob_langDesc: 'The AI will listen and reply in this language.',
      ob_cvTitle: 'Feed the Brain (Optional, but recommended)',
      ob_cvDesc: 'Paste your resume and the job/project description for the AI to generate scripts based on your real experience, whether in marketing, law, healthcare, IT, or engineering.',
      ob_cvLabel: 'Your Resume (Your Experience)',
      ob_cvPlaceholder: 'Paste your resume here...',
      ob_jobLabel: 'Current Job / Challenge',
      ob_jobPlaceholder: 'Paste the job description here...',
      ob_startButton: 'Start Interview',
      set_title: 'Context Settings',
      set_cvTitle: 'Your Resume / Portfolio (Recommended)',
      set_cvDesc: 'Paste your professional experience. Essential for the AI to generate responses based on your real background.',
      set_cvPlaceholder: 'Paste your resume here...',
      set_jobTitle: 'Job / Challenge Description',
      set_jobDesc: 'Paste the job ad or the meeting objective here (any field of expertise).',
      set_jobPlaceholder: 'Ex: Job requirements, the problem your service solves, etc...',
      set_langTitle: 'Base Language',
      set_langDesc: 'Sets the transcription language and the generated responses language.',
      set_apiTitle: 'Groq API Key (Voice Transcription)',
      set_apiDesc: 'Create your free key at console.groq.com. Audio is processed in the cloud in milliseconds.',
      set_apiPlaceholder: 'gsk_...',
      set_saveButton: 'Save and Apply',
      app_settingsTooltip: 'Settings',
      app_modelUnpacking: 'Unpacking Model...',
      app_stopBtn: 'Stop',
      app_listenBtn: 'Listen',
      app_hideTooltip: 'Hide (To system tray)',
      app_closeTooltip: 'Close application',
      app_statusApi: 'API Status:',
      app_statusActive: 'Active',
      app_statusOffline: 'Offline',
      app_log: 'Log:',
      log_silence: 'Silence detected...',
      log_audioReady: 'Audio ready for transcription',
      log_processing: 'Processing audio in the cloud...',
      log_transcribed: 'Audio successfully transcribed',
      log_empty: 'Audio contained no speech.',
      log_error: 'Transcription error.',
      log_started: 'Recording Started',
      log_stopped: 'Recording Stopped',
      sug_title: 'Response Suggestions',
      sug_processing: 'Processing audio context and generating first-person suggestions...',
      sug_listening: 'Listening to interview... No suggestions yet.',
      sug_clearBtn: 'Clear Responses',
      trn_title: 'Transcription',
      trn_waiting: 'Waiting for audio...',
      trn_clearBtn: 'Clear'
    }
  },
  {
    id: 'fr',
    name: 'Français',
    whisperCode: 'fr',
    promptLanguageInstruction: 'Vous DEVEZ générer la réponse strictement en Français, en utilisant des expressions professionnelles et naturelles.',
    donateText: 'Soutenez le projet (Faire un don)',
    ui: {
      secondBrain: 'Second Brain',
      ob_title: 'Configuration Initiale',
      ob_welcome: 'Bienvenue sur Second Brain',
      ob_desc: 'Votre assistant d’entretien invisible. Nous avons besoin de deux choses pour démarrer l’IA :',
      ob_apiKeyTitle: 'Clé API Groq (Requis)',
      ob_apiKeyDesc1: 'Nous utilisons l’IA ultra-rapide Llama-3 de Groq. C’est gratuit.',
      ob_apiKeyDesc2: 'Cliquez ici pour créer votre clé',
      ob_apiKeyPlaceholder: 'gsk_...',
      ob_langTitle: 'Langue de l’Entretien',
      ob_langDesc: 'L’IA écoutera et répondra dans cette langue.',
      ob_cvTitle: 'Nourrir le Cerveau (Optionnel, mais recommandé)',
      ob_cvDesc: 'Collez votre CV et la description du poste/projet pour que l’IA génère des scripts basés sur votre expérience réelle, que vous soyez dans le marketing, le droit, la santé, l’informatique ou l’ingénierie.',
      ob_cvLabel: 'Votre CV (Votre Expérience)',
      ob_cvPlaceholder: 'Collez votre CV ici...',
      ob_jobLabel: 'Poste / Défi Actuel',
      ob_jobPlaceholder: 'Collez la description du poste ici...',
      ob_startButton: 'Commencer l’Entretien',
      set_title: 'Paramètres de Contexte',
      set_cvTitle: 'Votre CV / Portfolio (Recommandé)',
      set_cvDesc: 'Collez votre expérience professionnelle. Indispensable pour que l’IA génère des réponses fondées sur votre vécu réel.',
      set_cvPlaceholder: 'Collez votre CV ici...',
      set_jobTitle: 'Description du Poste / Défi',
      set_jobDesc: 'Collez ici l’annonce du poste ou l’objectif de la réunion (tout domaine confondu).',
      set_jobPlaceholder: 'Ex : Exigences du poste, problème à résoudre par votre service, etc...',
      set_langTitle: 'Langue de Base',
      set_langDesc: 'Définit la langue de transcription et des réponses générées.',
      set_apiTitle: 'Clé API Groq (Transcription Vocale)',
      set_apiDesc: 'Créez votre clé gratuite sur console.groq.com. L’audio sera traité dans le cloud en quelques millisecondes.',
      set_apiPlaceholder: 'gsk_...',
      set_saveButton: 'Enregistrer et Appliquer',
      app_settingsTooltip: 'Paramètres',
      app_modelUnpacking: 'Décompression du modèle...',
      app_stopBtn: 'Arrêter',
      app_listenBtn: 'Écouter',
      app_hideTooltip: 'Masquer (Dans la barre d’état)',
      app_closeTooltip: 'Fermer l’application',
      app_statusApi: 'Statut de l’API :',
      app_statusActive: 'Active',
      app_statusOffline: 'Hors ligne',
      app_log: 'Log :',
      log_silence: 'Silence détecté...',
      log_audioReady: 'Audio prêt pour la transcription',
      log_processing: 'Traitement de l’audio dans le cloud...',
      log_transcribed: 'Audio transcrit avec succès',
      log_empty: 'L’audio ne contenait pas de voix.',
      log_error: 'Erreur de transcription.',
      log_started: 'Enregistrement démarré',
      log_stopped: 'Enregistrement arrêté',
      sug_title: 'Suggestions de Réponses',
      sug_processing: 'Traitement du contexte audio et génération de suggestions à la première personne...',
      sug_listening: 'Écoute de l’entretien... Aucune suggestion pour l’instant.',
      sug_clearBtn: 'Effacer les réponses',
      trn_title: 'Transcription',
      trn_waiting: 'En attente d’audio...',
      trn_clearBtn: 'Effacer'
    }
  },
  {
    id: 'it',
    name: 'Italiano',
    whisperCode: 'it',
    promptLanguageInstruction: 'DEVI generare la risposta strettamente in Italiano, utilizzando espressioni aziendali naturali e professionali.',
    donateText: 'Sostieni il progetto (Dona)',
    ui: {
      secondBrain: 'Second Brain',
      ob_title: 'Configurazione Iniziale',
      ob_welcome: 'Benvenuto in Second Brain',
      ob_desc: 'Il tuo assistente invisibile per i colloqui. Abbiamo bisogno di due cose per avviare il motore IA:',
      ob_apiKeyTitle: 'Chiave API Groq (Obbligatorio)',
      ob_apiKeyDesc1: 'Usiamo l’IA ultra veloce Llama-3 di Groq. È gratis.',
      ob_apiKeyDesc2: 'Clicca qui per creare la tua chiave',
      ob_apiKeyPlaceholder: 'gsk_...',
      ob_langTitle: 'Lingua del Colloquio',
      ob_langDesc: 'L’IA ascolterà e risponderà in questa lingua.',
      ob_cvTitle: 'Alimenta il Cervello (Opzionale, ma consigliato)',
      ob_cvDesc: 'Incolla il tuo curriculum e la descrizione della posizione/progetto affinché l’IA generi copioni basati sulla tua reale esperienza, che tu sia nel marketing, legge, sanità, IT o ingegneria.',
      ob_cvLabel: 'Il Tuo Curriculum (La Tua Esperienza)',
      ob_cvPlaceholder: 'Incolla qui il tuo curriculum...',
      ob_jobLabel: 'Posizione / Sfida Attuale',
      ob_jobPlaceholder: 'Incolla qui la descrizione della posizione...',
      ob_startButton: 'Inizia il Colloquio',
      set_title: 'Impostazioni di Contesto',
      set_cvTitle: 'Il Tuo Curriculum / Portfolio (Consigliato)',
      set_cvDesc: 'Incolla la tua esperienza professionale. Essenziale affinché l’IA generi risposte basate sulla tua esperienza reale.',
      set_cvPlaceholder: 'Incolla qui il tuo curriculum...',
      set_jobTitle: 'Descrizione della Posizione / Sfida',
      set_jobDesc: 'Incolla qui l’annuncio della posizione o l’obiettivo della riunione (qualsiasi settore).',
      set_jobPlaceholder: 'Es: Requisiti della posizione, problema da risolvere con il tuo servizio, ecc...',
      set_langTitle: 'Lingua di Base',
      set_langDesc: 'Imposta la lingua di trascrizione e delle risposte generate.',
      set_apiTitle: 'Chiave API Groq (Trascrizione Vocale)',
      set_apiDesc: 'Crea la tua chiave gratuita su console.groq.com. L’audio sarà elaborato nel cloud in millisecondi.',
      set_apiPlaceholder: 'gsk_...',
      set_saveButton: 'Salva e Applica',
      app_settingsTooltip: 'Impostazioni',
      app_modelUnpacking: 'Estrazione Modello...',
      app_stopBtn: 'Ferma',
      app_listenBtn: 'Ascolta',
      app_hideTooltip: 'Nascondi (Nella barra di sistema)',
      app_closeTooltip: 'Chiudi applicazione',
      app_statusApi: 'Stato API:',
      app_statusActive: 'Attiva',
      app_statusOffline: 'Offline',
      app_log: 'Log:',
      log_silence: 'Silenzio rilevato...',
      log_audioReady: 'Audio pronto per la trascrizione',
      log_processing: 'Elaborazione audio nel cloud...',
      log_transcribed: 'Audio trascritto con successo',
      log_empty: 'L’audio non conteneva voce.',
      log_error: 'Errore di trascrizione.',
      log_started: 'Registrazione Avviata',
      log_stopped: 'Registrazione Interrotta',
      sug_title: 'Suggerimenti di Risposta',
      sug_processing: 'Elaborazione del contesto audio e generazione di suggerimenti in prima persona...',
      sug_listening: 'Ascoltando il colloquio... Ancora nessun suggerimento.',
      sug_clearBtn: 'Cancella Risposte',
      trn_title: 'Trascrizione',
      trn_waiting: 'In attesa di audio...',
      trn_clearBtn: 'Cancella'
    }
  }
];

export const getDefaultLanguage = (): string => {
  try {
    const intlLang = Intl.DateTimeFormat().resolvedOptions().locale;
    const osLang = navigator.language || intlLang || 'pt-BR';
    
    if (osLang.toLowerCase().includes('pt-br')) return 'pt-BR';
    if (osLang.toLowerCase().includes('pt')) return 'pt-PT';
    if (osLang.toLowerCase().includes('es')) return 'es-ES';
    if (osLang.toLowerCase().includes('fr')) return 'fr';
    if (osLang.toLowerCase().includes('it')) return 'it';
    
    // Check main language tag (e.g. 'en-US' -> 'en')
    if (osLang.toLowerCase().startsWith('en')) return 'en';
  } catch (e) {
    // ignore error
  }
  return 'pt-BR'; // Fallback absoluto para Português do Brasil para evitar erro no Electron
};

export const getTranslations = (langId: string): UI_Translations => {
  const langObj = SUPPORTED_LANGUAGES.find(l => l.id === langId) || SUPPORTED_LANGUAGES[0];
  return langObj.ui;
};
