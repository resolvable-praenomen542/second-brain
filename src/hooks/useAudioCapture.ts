import { useState, useEffect, useRef, useCallback } from 'react';

import { SUPPORTED_LANGUAGES, getTranslations } from '../data/i18n';

export const useAudioCapture = (onTranscript: (text: string, isFinal: boolean) => void, groqApiKey: string, langId: string) => {
  const [isRecording, setIsRecording] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [debugLog, setDebugLog] = useState<string>('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isTranscribingRef = useRef<boolean>(false);
  const isRecordingRef = useRef<boolean>(false);
  
  // VAD (Voice Activity Detection) states
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const sendToGroq = async (blob: Blob) => {
    if (!groqApiKey) {
      setErrorMsg('Chave da Groq API não configurada.');
      stopRecording();
      return;
    }

    try {
      const formData = new FormData();
      const langObj = SUPPORTED_LANGUAGES.find(l => l.id === langId) || SUPPORTED_LANGUAGES[0];
      const whisperCode = langObj.whisperCode;

      // O Chrome gera blocos em webm (audio/webm). A Groq suporta esse formato perfeitamente.
      formData.append('file', blob, 'audio.webm');
      formData.append('model', 'whisper-large-v3');
      formData.append('language', whisperCode); // Idioma dinâmico
      formData.append('temperature', '0.0'); // Reduz criatividade e alucinação
      
      // Ajustar o prompt base pelo idioma ajuda o Whisper a pegar o sotaque
      const whisperPrompt = whisperCode === 'pt' ? 'Isto é uma entrevista de emprego corporativa. Transcreva com precisão.' 
                         : whisperCode === 'en' ? 'This is a corporate job interview. Transcribe accurately.'
                         : whisperCode === 'fr' ? "C'est un entretien d'embauche. Transcrivez avec précision."
                         : whisperCode === 'it' ? "Questo è un colloquio di lavoro. Trascrivi accuratamente."
                         : 'Isto é uma entrevista de emprego corporativa. Transcreva com precisão.';

      formData.append('prompt', whisperPrompt); 
      formData.append('response_format', 'json');

      const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Groq API falhou: ${response.status}`);
      }

      const data = await response.json();
      let text = data.text?.trim();
      
      // Filtro anti-alucinação de silêncio do Whisper (YouTube Dataset)
      const hallucinations = [
        "tchau", "e aí", "obrigado", "inscreva-se", "assistir", "canal", 
        "deixe o like", "amém", "obrigada", "legenda", "subscreva", "bye",
        "transcrição", "pedro", "comunidade", "youtube", "assistido", "valeu"
      ];
      
      // Checa se o texto INTEIRO é apenas uma alucinação comum
      const isHallucination = text && text.length < 50 && hallucinations.some(h => text!.toLowerCase().includes(h));

      if (text && text.length > 2 && !isHallucination) {
        setDebugLog(`Groq devolveu: ${text.substring(0, 30)}...`);
        // Envia o texto como final
        onTranscript(text, true);
      } else {
        setDebugLog(isHallucination ? 'Alucinação bloqueada.' : langObj.ui.log_empty);
      }

    } catch (err: any) {
      console.error('Groq Transcribe Error:', err);
      setDebugLog(`Erro Groq: ${err.message}`);
      // Não paramos a gravação por um erro isolado de rede, apenas logamos
    } finally {
      isTranscribingRef.current = false;
    }
  };

  const startRecording = useCallback(async () => {
    if (!groqApiKey) {
      setErrorMsg('Por favor, defina a Groq API Key nas Configurações.');
      return;
    }

    try {
      setErrorMsg(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      streamRef.current = stream;
      
      const ui = getTranslations(langId);
      setDebugLog(ui.log_started);

      // Setup VAD (Voice Activity Detection) via Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      // Função para gravar 1 bloco limpo e completo
      const recordChunk = () => {
        if (!streamRef.current || !isRecordingRef.current) return;
        
        const mediaRecorder = new MediaRecorder(streamRef.current, {
          mimeType: 'audio/webm;codecs=opus'
        });
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks: Blob[] = [];
        let hasVoice = false;
        let silenceCount = 0;
        let recordingTime = 0;

        // Verifica o volume periodicamente durante a gravação
        const checkVolume = setInterval(() => {
          recordingTime += 100;
          
          if (analyserRef.current && dataArrayRef.current) {
            analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
            let sum = 0;
            for (let i = 0; i < dataArrayRef.current.length; i++) {
              sum += dataArrayRef.current[i];
            }
            const average = sum / dataArrayRef.current.length;
            
            // Limiar de detecção de voz (ajustável). 15 filtra ventilador e estática.
            if (average > 15) {
              hasVoice = true;
              silenceCount = 0;
            } else {
              silenceCount += 100;
            }
          }

          // Endpointing Dinâmico: Corta o áudio apenas quando a pessoa faz uma pausa na fala
          // Corta se: falava e pausou por 800ms, OU chegou a 8 segundos (hard limit), OU 3s de puro silêncio (recicla)
          const shouldCut = (hasVoice && silenceCount >= 800 && recordingTime >= 1000) || recordingTime >= 8000 || (!hasVoice && silenceCount >= 3000);
          
          if (shouldCut) {
            clearInterval(checkVolume);
            if (mediaRecorder.state !== 'inactive') {
              mediaRecorder.stop();
            }
            if (isRecordingRef.current) {
              recordChunk();
            }
          }
        }, 100); // Check a cada 100ms

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunks.push(e.data);
          }
        };

        mediaRecorder.onstop = async () => {
          clearInterval(checkVolume);
          
          const blob = new Blob(audioChunks, { type: 'audio/webm' });
          if (blob.size > 0 && isRecordingRef.current) {
            if (!hasVoice) {
               const ui = getTranslations(langId);
               setDebugLog(ui.log_silence);
               return; // Não envia silêncio para a Groq (mata a alucinação na raiz)
            }
            
            if (isTranscribingRef.current) {
              // Ignore se ocupado
            } else {
              isTranscribingRef.current = true;
              const ui = getTranslations(langId);
              setDebugLog(ui.log_processing);
              await sendToGroq(blob);
            }
          }
        };

        mediaRecorder.start();
      };

      setIsRecording(true);
      isRecordingRef.current = true;
      recordChunk();

    } catch (err: any) {
      console.error(err);
      setErrorMsg('Não foi possível iniciar o microfone.');
      setIsRecording(false);
      isRecordingRef.current = false;
    }
  }, [groqApiKey, langId]);

  const stopRecording = useCallback(() => {
    isRecordingRef.current = false;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    const ui = getTranslations(langId);
    setDebugLog(ui.log_stopped);
    setIsRecording(false);
  }, []);

  // Removemos propriedades obsoletas do vosk
  return { isRecording, startRecording, stopRecording, errorMsg, isModelLoading: false, modelProgress: 100, debugLog };
};
