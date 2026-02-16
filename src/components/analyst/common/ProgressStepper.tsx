
import React from 'react';

interface ProgressStepperProps {
  currentStep: number;
}

const steps = ['Investigation', 'Draft & Review', 'Finalize'];

const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  return (
    <div className="w-full py-4 px-8 bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-xl ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepIndex = index + 1;
          const isCompleted = currentStep > stepIndex;
          const isCurrent = currentStep === stepIndex;
          
          return (
            <React.Fragment key={step}>
              <div className="flex items-center group">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                    isCompleted ? 'bg-status-low text-white' : isCurrent ? 'bg-brand-interactive text-white ring-4 ring-brand-interactive/20' : 'bg-border/40 text-text-secondary'
                  }`}
                >
                  {isCompleted ? '✓' : stepIndex}
                </div>
                <div
                  className={`ml-3 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    isCurrent ? 'text-brand-interactive' : 'text-text-secondary/60 group-hover:text-text-secondary'
                  }`}
                >
                  {step}
                </div>
              </div>
              {stepIndex < steps.length && (
                <div className={`flex-auto border-t-[1px] transition-all duration-500 mx-4 ${isCompleted ? 'border-status-low' : 'border-border/30'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressStepper;