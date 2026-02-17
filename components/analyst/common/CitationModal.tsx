
import React from 'react';

interface CitationModalProps {
  citationKey: string;
  citationData: {
    description: string;
    details: string;
  };
  onClose: () => void;
}

const CitationModal: React.FC<CitationModalProps> = ({ citationKey, citationData, onClose }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={onClose}>
      <div 
        className="bg-surface border-2 border-brand-interactive/50 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] w-full max-w-lg p-8 relative animate-in zoom-in duration-200" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-text-primary transition-colors rounded-full hover:bg-slate-100"
            aria-label="Close modal"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        
        <div className="flex items-center space-x-3 mb-6">
            <div className="bg-brand-interactive/10 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-interactive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-brand-interactive uppercase tracking-tight">Evidence Registry: {citationKey}</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Finding Description</p>
            <p className="text-base font-semibold text-text-primary leading-tight">{citationData.description}</p>
          </div>
          
          <div className="bg-elevated-surface p-4 rounded border border-border">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Audit Detail / Ledger Entry</p>
            <p className="text-text-secondary font-mono text-xs leading-relaxed whitespace-pre-wrap">
              {citationData.details}
            </p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-widest rounded hover:bg-slate-200 transition-all"
            >
                Return to Review
            </button>
        </div>
      </div>
    </div>
  );
};

export default CitationModal;
