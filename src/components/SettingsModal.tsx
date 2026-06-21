import React, { useState, useEffect } from 'react';
import { X, Save, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, getDefaultLanguage, getTranslations } from '../data/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [cvText, setCvText] = useState('');
  const [jobText, setJobText] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [language, setLanguage] = useState('');

  const ui = getTranslations(language || getDefaultLanguage());

  useEffect(() => {
    if (isOpen) {
      // Load saved settings when modal opens
      const savedCv = localStorage.getItem('secondBrain_cv') || '';
      const savedJob = localStorage.getItem('secondBrain_job') || '';
      const savedGroq = localStorage.getItem('secondBrain_groq') || import.meta.env.VITE_GROQ_API_KEY || '';
      const savedLang = localStorage.getItem('secondBrain_language') || getDefaultLanguage();
      setCvText(savedCv);
      setJobText(savedJob);
      setGroqKey(savedGroq);
      setLanguage(savedLang);
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('secondBrain_cv', cvText);
    localStorage.setItem('secondBrain_job', jobText);
    localStorage.setItem('secondBrain_groq', groqKey);
    localStorage.setItem('secondBrain_language', language);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-700 w-full h-full max-w-lg rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-sm font-bold text-slate-100">{ui.set_title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-md text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollable">
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Globe className="w-4 h-4" /> {ui.set_langTitle}
            </label>
            <p className="text-xs text-slate-500 mb-2">
              {ui.set_langDesc}
            </p>
            <select 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-blue-500 appearance-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {ui.set_cvTitle}
            </label>
            <p className="text-xs text-slate-500 mb-2">
              {ui.set_cvDesc}
            </p>
            <textarea 
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-blue-500 resize-none"
              placeholder={ui.set_cvPlaceholder}
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {ui.set_jobTitle}
            </label>
            <p className="text-xs text-slate-500 mb-2">{ui.set_jobDesc}</p>
            <textarea 
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-blue-500 resize-none"
              placeholder={ui.set_jobPlaceholder}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
            />
          </div>


          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {ui.set_apiTitle}
            </label>
            <p className="text-xs text-slate-500 mb-2">{ui.set_apiDesc}</p>
            <input 
              type="password"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
              placeholder={ui.set_apiPlaceholder}
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex justify-end">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            {ui.set_saveButton}
          </button>
        </div>

      </div>
    </div>
  );
};
