import React, { useState } from 'react';
import { AI_NARRATIVE_G1, CITATIONS } from '../../constants';
import ProgressStepper from './common/ProgressStepper';

interface DraftingViewProps {
  onProceed: () => void;
}

const cardStyle = "bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl p-6";


const DraftingView: React.FC<DraftingViewProps> = ({ onProceed }) => {
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  return (
    <div>
      <ProgressStepper currentStep={2} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main Content */}
        <div className={`lg:col-span-2 ${cardStyle}`}>
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-border pb-2">AI-Generated SAR Narrative Draft</h2>
          <div 
            className="prose dark:prose-invert max-w-none text-text-primary"
            dangerouslySetInnerHTML={{ __html: AI_NARRATIVE_G1.replace(/(\[Ref: TXN-01\])/g, '<strong class="text-brand-interactive cursor-pointer hover:opacity-80">$1</strong>') }}
            onClick={(e) => {
                if ((e.target as HTMLElement).tagName === 'STRONG') {
                    setIsInspectorOpen(true);
                }
            }}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
            <div className={cardStyle}>
                <h3 className="text-lg font-semibold text-text-primary">Citation Inspector</h3>
                <button 
                    onClick={() => setIsInspectorOpen(!isInspectorOpen)}
                    className="text-sm text-brand-interactive hover:opacity-80 mt-1"
                >
                    {isInspectorOpen ? 'Hide' : 'Show'} Details
                </button>
                {isInspectorOpen && (
                    <div className="mt-4 border-t border-border pt-4">
                        <p className="font-bold text-text-primary">Ref: TXN-01</p>
                        <p className="text-sm text-text-secondary mt-1">{CITATIONS['TXN-01'].description}</p>
                        <p className="text-xs bg-background p-2 rounded mt-2">{CITATIONS['TXN-01'].details}</p>
                    </div>
                )}
            </div>
            <button
                onClick={onProceed}
                className="w-full mt-4 px-6 py-3 text-base font-medium text-brand-interactive-text bg-brand-interactive rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-brand-interactive"
            >
                Proceed to Human Review
            </button>
        </div>
      </div>
    </div>
  );
};

export default DraftingView;