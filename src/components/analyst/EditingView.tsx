
import React, { useState, useEffect, useRef } from 'react';
import { AI_NARRATIVE_G1 } from '../../constants';
import ProgressStepper from './common/ProgressStepper';
import BarclaysSARForm from './BarclaysSARForm';

interface EditingViewProps {
  onProceed: () => void;
}

const EditingView: React.FC<EditingViewProps> = ({ onProceed }) => {
  const originalAmount = 5000000;
  
  const [narrative, setNarrative] = useState(AI_NARRATIVE_G1);
  const [warning, setWarning] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
    }

    const numbers = narrative.match(/(\d{1,3}(,\d{3})*(\.\d+)?)/g)?.map(s => parseInt(s.replace(/,/g, ''), 10)) || [];
    const largestNumber = Math.max(...numbers, 0);

    if (largestNumber > 0 && Math.abs(largestNumber - originalAmount) / originalAmount > 0.5) {
      setWarning(`SENSITIVE VALUE MISMATCH: The financial figure has been altered significantly from the automated extraction (Original: INR ${originalAmount.toLocaleString('en-IN')}).`);
    } else {
      setWarning(null);
    }
  }, [narrative, originalAmount]);

  return (
    <div className="space-y-6">
      <ProgressStepper currentStep={2} />
      
      <div className="flex justify-between items-end mb-4">
        <div>
            <h2 className="text-2xl font-black text-text-primary uppercase tracking-tight">Draft & Review</h2>
            <p className="text-text-secondary text-sm">Validate the automated narrative draft and finalize the regulatory filing.</p>
        </div>
        {warning && (
          <div className="px-4 py-2 text-[11px] font-bold text-status-high bg-status-high-bg border border-status-high/30 rounded flex items-center space-x-2 shadow-sm animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{warning}</span>
          </div>
        )}
      </div>

      <BarclaysSARForm 
        narrative={narrative} 
        onNarrativeChange={setNarrative} 
        onFinalize={onProceed} 
      />
    </div>
  );
};

export default EditingView;