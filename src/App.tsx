import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Settings, X, Minus } from 'lucide-react';
import { useAudioCapture } from './hooks/useAudioCapture';
import { generateInterviewSuggestions } from './services/lmstudio';
import { TranscriptionView } from './components/TranscriptionView';
import { SuggestionPanel } from './components/SuggestionPanel';
import { SettingsModal } from './components/SettingsModal';
import { CANDIDATE_PROFILE } from './data/candidateProfile';

import { OnboardingScreen } from './components/OnboardingScreen';
import { getDefaultLanguage, SUPPORTED_LANGUAGES } from './data/i18n';

function App() {
  const [hasApiKey, setHasApiKey] = useState(() => {
    return !!(localStorage.getItem('secondBrain_groq') || import.meta.env.VITE_GROQ_API_KEY);
  });
  const [transcript, setTranscript] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Refs para manter o estado sem re-renderizar o intervalo
  const transcriptBufferRef = useRef<string>(''); // Texto novo desde a última sugestão
  const fullContextRef = useRef<string>(''); // Histórico completo para a IA entender o contexto

  const handleTranscript = useCallback((text: string, isFinal: boolean) => {
    if (isFinal) {
      setTranscript((prev) => {
        const updated = prev ? prev + '\n\n' + text : text;
        transcriptBufferRef.current = transcriptBufferRef.current ? transcriptBufferRef.current + ' ' + text : text;
        fullContextRef.current = updated;
        return updated;
      });
    } else {
      // For interim results, we could show them dynamically, 
      // but to keep it simple and less jittery, we only append final phrases.
      // You can implement interim display if desired.
    }
  }, []);

  const groqApiKey = localStorage.getItem('secondBrain_groq') || import.meta.env.VITE_GROQ_API_KEY || '';
  const currentLanguage = localStorage.getItem('secondBrain_language') || getDefaultLanguage();
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage) || SUPPORTED_LANGUAGES[0];
  
  const { isRecording, startRecording, stopRecording, errorMsg, isModelLoading, debugLog } = useAudioCapture(handleTranscript, groqApiKey, currentLanguage);

  // Interval to check for suggestions every X seconds if there is new text
  useEffect(() => {
    let interval: number;
    
    if (isRecording) {
      interval = window.setInterval(async () => {
        const currentText = transcriptBufferRef.current;
        
        // Only generate if we have enough new text
        if (currentText.length > 20) {
          setIsGenerating(true);
          const storedCv = localStorage.getItem('secondBrain_cv')?.trim() || '';
          const cv = storedCv.length > 5 ? storedCv : CANDIDATE_PROFILE;
          const job = localStorage.getItem('secondBrain_job') || '';
          
          // Pegamos os últimos 1500 caracteres da conversa para dar contexto, mas focando na última frase
          const recentHistory = fullContextRef.current.slice(-1500);
          
          const newSuggestions = await generateInterviewSuggestions(recentHistory, cv, job, groqApiKey, currentLanguage);
          if (newSuggestions.length > 0) {
            setSuggestions(newSuggestions);
          }
          setIsGenerating(false);
          
          // Limpar apenas o buffer invisível que vai para o LM Studio
          // Manter a transcrição visível na tela para o usuário não achar que sumiu
          transcriptBufferRef.current = ''; 
        }
      }, 7000); // Check every 7 seconds for Ollama to give it time to process
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      setTranscript('');
      transcriptBufferRef.current = '';
      fullContextRef.current = '';
      startRecording();
    }
  };

  const handleClose = () => {
    // @ts-ignore (ipcRenderer is injected by contextBridge)
    window.ipcRenderer?.send('quit-app');
  };

  const handleMinimize = () => {
    // @ts-ignore
    window.ipcRenderer?.send('hide-app');
  };

  if (!hasApiKey) {
    return <OnboardingScreen onComplete={() => setHasApiKey(true)} />;
  }

  return (
    <div className="flex flex-col h-screen w-full select-none">
      {/* Header (Draggable Area) */}
      <div className="flex items-center justify-between p-3 bg-slate-800 border-b border-slate-700 drag-area">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <h1 className="text-sm font-bold text-slate-100">Second Brain</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-1.5 hover:bg-slate-700 rounded-md transition-colors"
            title={currentLangObj.ui.app_settingsTooltip}
          >
            <Settings className="w-4 h-4 text-slate-400" />
          </button>
          <div className="w-px h-4 bg-slate-700 mx-1"></div>
          <button 
            onClick={handleMinimize}
            className="p-1.5 hover:bg-slate-700 rounded-md transition-colors"
            title={currentLangObj.ui.app_hideTooltip}
          >
            <Minus className="w-4 h-4 text-slate-400" />
          </button>
          <button 
            onClick={handleClose}
            className="p-1.5 hover:bg-red-500 hover:text-white rounded-md transition-colors"
            title={currentLangObj.ui.app_closeTooltip}
          >
            <X className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-900/50 p-2 text-xs text-red-200 border-b border-red-800 text-center">
          {errorMsg}
        </div>
      )}

      {/* Action Banner */}
      <div className="bg-slate-900 p-2 px-3 border-b border-slate-800 flex justify-between items-center shrink-0">
        <button
          onClick={() => {
            // @ts-ignore
            window.ipcRenderer?.send('open-external', 'https://www.buymeacoffee.com/2brain');
          }}
          className="text-[10px] bg-yellow-500/10 text-yellow-400/90 hover:text-yellow-400 hover:bg-yellow-500/20 px-3 py-1.5 rounded transition-colors font-medium cursor-pointer"
        >
          {currentLangObj.donateText}
        </button>

        <button 
          onClick={toggleRecording}
          disabled={isModelLoading}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-sm ${
            isModelLoading ? 'bg-slate-700 text-slate-500 cursor-not-allowed' :
            isRecording 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isModelLoading ? (
            <span className="animate-pulse">{currentLangObj.ui.app_modelUnpacking}</span>
          ) : isRecording ? (
            <>
              <MicOff className="w-4 h-4" />
              {currentLangObj.ui.app_stopBtn}
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              {currentLangObj.ui.app_listenBtn}
            </>
          )}
        </button>
      </div>

      <SuggestionPanel 
        suggestions={suggestions} 
        isLoading={isGenerating} 
        onClear={() => setSuggestions([])}
        ui={currentLangObj.ui}
      />
      <TranscriptionView 
        transcript={transcript || transcriptBufferRef.current} 
        onClear={() => {
          setTranscript('');
          transcriptBufferRef.current = '';
          fullContextRef.current = '';
          setSuggestions([]);
        }}
        ui={currentLangObj.ui}
      />
      
      {/* Footer Debug Info */}
      <div className="bg-slate-900 p-1.5 px-3 text-[10px] text-slate-500 text-left font-mono flex justify-between border-t border-slate-800 mt-auto">
        <span className="flex items-center gap-2">
          {currentLangObj.ui.app_statusApi} 
          {groqApiKey.length > 10 ? (
            <span className="text-emerald-400 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>{currentLangObj.ui.app_statusActive}</span>
          ) : (
            <span className="text-red-400 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>{currentLangObj.ui.app_statusOffline}</span>
          )}
        </span>
        <span className="text-blue-400 truncate max-w-[50%] text-right">{currentLangObj.ui.app_log} {debugLog}</span>
      </div>
      
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;
