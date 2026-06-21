import React, { useState } from 'react';
import { Brain, ExternalLink, ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, getDefaultLanguage, getTranslations } from '../data/i18n';

interface Props {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<Props> = ({ onComplete }) => {
  const [apiKey, setApiKey] = useState('');
  const [cvText, setCvText] = useState('');
  const [jobText, setJobText] = useState('');
  const [language, setLanguage] = useState(() => getDefaultLanguage());

  const ui = getTranslations(language);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('secondBrain_groq', apiKey.trim());
    }
    if (cvText.trim()) {
      localStorage.setItem('secondBrain_cv', cvText.trim());
    }
    if (jobText.trim()) {
      localStorage.setItem('secondBrain_job', jobText.trim());
    }
    localStorage.setItem('secondBrain_language', language);
    onComplete();
  };

  const isReady = apiKey.trim().length > 10;

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 overflow-y-auto select-none">
      <div className="drag-area p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-blue-500" />
          <h1 className="text-sm font-bold text-slate-100">{ui.ob_title}</h1>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full p-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-white">{ui.ob_welcome}</h2>
          <p className="text-slate-400 text-sm">
            {ui.ob_desc}
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">1</div>
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-slate-200">{ui.ob_apiKeyTitle}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {ui.ob_apiKeyDesc1}
                <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 ml-1">
                  {ui.ob_apiKeyDesc2} <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={ui.ob_apiKeyPlaceholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">2</div>
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-slate-200">{ui.ob_langTitle}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {ui.ob_langDesc}
              </p>
              <div className="relative mt-2">
                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none"
                >
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shrink-0">3</div>
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-slate-200">{ui.ob_cvTitle}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {ui.ob_cvDesc}
              </p>
              
              <div className="space-y-3 mt-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">{ui.ob_cvLabel}</label>
                  <textarea
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                    placeholder={ui.ob_cvPlaceholder}
                    className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">{ui.ob_jobLabel}</label>
                  <textarea
                    value={jobText}
                    onChange={(e) => setJobText(e.target.value)}
                    placeholder={ui.ob_jobPlaceholder}
                    className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4 pb-8">
          <button
            onClick={handleSave}
            disabled={!isReady}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-sm transition-all ${
              isReady 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 translate-y-0 hover:-translate-y-0.5' 
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isReady ? <CheckCircle2 className="w-5 h-5" /> : null}
            {ui.ob_startButton}
            {isReady ? <ArrowRight className="w-5 h-5" /> : null}
          </button>
        </div>

      </div>
    </div>
  );
};
