import React from 'react';
import ProgressStepper from './common/ProgressStepper';

interface PreDraftingViewProps {
  onProceed: () => void;
}

const PreDraftingView: React.FC<PreDraftingViewProps> = ({ onProceed }) => {
  return (
    <div>
      <ProgressStepper currentStep={1} />
      <div className="mt-6 text-center bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl p-12">
        <h2 className="text-2xl font-bold text-text-primary">Investigation Complete</h2>
        <p className="mt-2 text-text-secondary">
          Agent 'Sherlock' has processed the data, removed false positives, and prepared the case file.
        </p>
        <p className="mt-1 text-text-secondary">
          The next step is to generate the initial SAR narrative draft using AI.
        </p>
        <button
          onClick={onProceed}
          className="mt-8 px-6 py-3 text-base font-medium text-brand-interactive-text bg-brand-interactive rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-brand-interactive"
        >
          Start AI Drafting
        </button>
      </div>
    </div>
  );
};

export default PreDraftingView;