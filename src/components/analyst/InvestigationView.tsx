
import React, { useState, useEffect } from 'react';
import { CASE_DETAILS, RAW_JSON_DATA } from '../../constants';
import KycCard from './common/KycCard';
import NetworkGraph from './common/NetworkGraph';
import ProgressStepper from './common/ProgressStepper';

interface InvestigationViewProps {
  onProceed: () => void;
}

const cardStyle = "bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl p-4";

const InvestigationView: React.FC<InvestigationViewProps> = ({ onProceed }) => {
  const [investigationStatus, setInvestigationStatus] = useState<'RUNNING' | 'COMPLETED'>('RUNNING');

  useEffect(() => {
    const timer = setTimeout(() => {
        setInvestigationStatus('COMPLETED');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <ProgressStepper currentStep={1} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <KycCard name={CASE_DETAILS.subjectName} kyc={CASE_DETAILS.kyc} />
          <div className={cardStyle}>
            <h3 className="text-sm font-bold text-text-primary mb-3 border-b border-border pb-2 uppercase tracking-tight">Financial Data Stream</h3>
            <pre className="text-xs bg-elevated-surface text-status-low p-4 rounded-md overflow-auto h-[400px] font-mono">
              <code>{RAW_JSON_DATA}</code>
            </pre>
          </div>
        </div>

        <div className={`${cardStyle} flex flex-col`}>
          <h3 className="text-sm font-bold text-text-primary mb-2 border-b border-border pb-2 uppercase tracking-tight">Entity Relationship Graph</h3>
          <p className="text-xs text-text-secondary mb-4 italic">Automated mapping of fund flows and known associations.</p>
          <div className="flex-grow flex justify-center items-center min-h-[300px]">
            <NetworkGraph />
          </div>
        </div>
      </div>

      <div className="bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-xl p-5 flex items-center justify-between">
          {investigationStatus === 'RUNNING' ? (
              <div className="flex items-center text-brand-interactive">
                  <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-sm font-semibold uppercase tracking-wide">AI Pattern Analysis in Progress...</span>
              </div>
          ) : (
              <div className="flex items-center text-status-low">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-bold uppercase tracking-wide">Analysis Complete. Case Ledger Validated.</span>
              </div>
          )}
          <button
              onClick={onProceed}
              disabled={investigationStatus !== 'COMPLETED'}
              className="px-6 py-2 text-sm font-bold uppercase tracking-widest text-brand-interactive-text bg-brand-interactive rounded-md hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
              Proceed to Draft & Review
          </button>
      </div>
    </div>
  );
};

export default InvestigationView;