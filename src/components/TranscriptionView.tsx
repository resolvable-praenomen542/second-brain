import React, { useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';

import type { UI_Translations } from '../data/i18n';

interface Props {
  transcript: string;
  onClear: () => void;
  ui: UI_Translations;
}

export const TranscriptionView: React.FC<Props> = ({ transcript, onClear, ui }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [transcript]);

  return (
    <div className="flex flex-col border-t border-slate-700 bg-slate-900 px-4 py-2 shrink-0 h-32">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{ui.trn_title}</h3>
        {transcript && (
          <button onClick={onClear} className="text-slate-500 hover:text-red-400 p-1 rounded-md transition-colors" title={ui.trn_clearBtn}>
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <div 
        ref={scrollRef}
        className="scrollable flex-1 overflow-y-auto text-[11px] text-slate-400 pr-2 leading-relaxed"
      >
        {transcript ? (
          <p className="whitespace-pre-wrap">{transcript}</p>
        ) : (
          <p className="text-slate-600 italic">{ui.trn_waiting}</p>
        )}
      </div>
    </div>
  );
};
