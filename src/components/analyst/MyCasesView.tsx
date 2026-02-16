
import React from 'react';

interface MyCasesViewProps {
  onStartInvestigation: () => void;
}

const MyCasesView: React.FC<MyCasesViewProps> = ({ onStartInvestigation }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-4">My Cases</h2>
      <div className="bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Assigned to You</h3>
        <div className="border border-border rounded-lg p-4 flex justify-between items-center bg-background">
          <div>
            <p className="font-bold text-brand-primary">Case #88291</p>
            <p className="text-sm text-text-primary">Subject: Rahul Gupta</p>
            <p className="text-sm text-text-secondary">Alert Type: Structuring</p>
          </div>
          <button
            onClick={onStartInvestigation}
            className="px-4 py-2 text-sm font-medium text-brand-interactive-text bg-brand-interactive rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-brand-interactive"
          >
            Start Investigation
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCasesView;