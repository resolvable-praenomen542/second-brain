import React from 'react';
import { Lightbulb, Trash2 } from 'lucide-react';

import type { UI_Translations } from '../data/i18n';

interface Props {
  suggestions: string[];
  isLoading: boolean;
  onClear: () => void;
  ui: UI_Translations;
}

export const SuggestionPanel: React.FC<Props> = ({ suggestions, isLoading, onClear, ui }) => {
  return (
    <div className="flex flex-col flex-1 p-4 bg-slate-900/50 min-h-0">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {ui.sug_title}
          </h3>
        </div>
        {suggestions.length > 0 && (
          <button onClick={onClear} className="text-slate-500 hover:text-red-400 p-1 rounded-md transition-colors" title={ui.sug_clearBtn}>
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="scrollable flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse flex space-x-2">
              <div className="h-2 w-2 bg-slate-500 rounded-full"></div>
              <div className="h-2 w-2 bg-slate-500 rounded-full"></div>
              <div className="h-2 w-2 bg-slate-500 rounded-full"></div>
            </div>
          </div>
        ) : suggestions.length > 0 ? (
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-sm text-slate-100 shadow-sm"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 text-sm italic text-center px-4">
            {ui.sug_listening}
          </div>
        )}
      </div>
    </div>
  );
};
