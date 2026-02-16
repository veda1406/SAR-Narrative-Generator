
import React from 'react';
import ProgressStepper from './common/ProgressStepper';
import { AUDIT_LOG } from '../../constants';

interface FinalViewProps {
  onReset: () => void;
}

const cardStyle = "bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl p-6";

const FinalView: React.FC<FinalViewProps> = ({ onReset }) => {
  return (
    <div>
      <ProgressStepper currentStep={3} />
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold text-status-low">SAR Finalized and Submitted</h2>
        <p className="text-text-secondary mt-2">The case has been successfully processed and logged for regulatory review.</p>
      </div>
      
      <div className={`${cardStyle} mt-8`}>
        <h3 className="text-lg font-semibold text-text-primary mb-4 border-b border-border pb-2">Audit Log</h3>
        <ul className="space-y-3">
          {AUDIT_LOG.map((entry, index) => (
            <li key={index} className="flex items-center text-sm">
              <span className="font-mono text-xs text-text-secondary mr-4">{entry.timestamp}</span>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full mr-3 ${entry.user === 'AI' ? 'bg-status-info-bg text-status-info' : entry.user === 'System' ? 'bg-background text-text-secondary' : 'bg-status-low-bg text-status-low'}`}>
                {entry.user}
              </span>
              <span className="text-text-primary">{entry.event}</span>
            </li>
          ))}
           <li className="flex items-center text-sm">
              <span className="font-mono text-xs text-text-secondary mr-4">2023-10-26 11:45:10 UTC</span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full mr-3 bg-status-low-bg text-status-low">
                Priya S.
              </span>
              <span className="text-text-primary">Narrative Review and Finalization</span>
            </li>
            <li className="flex items-center text-sm">
              <span className="font-mono text-xs text-text-secondary mr-4">2023-10-26 11:45:55 UTC</span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full mr-3 bg-status-info-bg text-status-info">
                AI
              </span>
              <span className="text-text-primary">Validation Successful</span>
            </li>
        </ul>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onReset}
          className="px-6 py-2 text-base font-medium text-brand-interactive-text bg-brand-interactive rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-brand-interactive"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default FinalView;
