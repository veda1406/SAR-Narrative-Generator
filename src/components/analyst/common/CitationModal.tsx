
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
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface border border-brand-interactive/50 rounded-lg shadow-2xl w-full max-w-lg p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-light text-text-secondary hover:text-text-primary">&times;</button>
        <h2 className="text-lg font-bold text-brand-interactive">Citation Details: {citationKey}</h2>
        <div className="mt-4 border-t border-border pt-4 text-sm space-y-2">
          <p className="font-semibold text-text-primary">{citationData.description}</p>
          <p className="text-text-secondary bg-background p-3 rounded-md font-mono text-xs">{citationData.details}</p>
        </div>
      </div>
    </div>
  );
};

export default CitationModal;
