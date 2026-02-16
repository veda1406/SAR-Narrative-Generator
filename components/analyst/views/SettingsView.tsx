import React, { useState } from 'react';

const cardStyle = "bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl p-6";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={cardStyle}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left flex justify-between items-center">
                <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                <span className={`transform transition-transform duration-200 text-text-secondary ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <div className="mt-4 border-t border-border pt-4 space-y-4">{children}</div>}
        </div>
    );
};

const Slider: React.FC<{label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-text-secondary">{label}</label>
        <div className="flex items-center space-x-4">
            <input type="range" min="1" max="100" value={value} onChange={onChange} className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer" />
            <span className="font-semibold text-brand-primary w-10 text-center">{value}%</span>
        </div>
    </div>
);

const Toggle: React.FC<{label: string, enabled: boolean, setEnabled: (e: boolean) => void}> = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary">{label}</span>
        <button onClick={() => setEnabled(!enabled)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-brand-interactive' : 'bg-border'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

const SettingsView: React.FC = () => {
    const [tolerance, setTolerance] = useState(75);
    const [strictness, setStrictness] = useState(90);
    const [translate, setTranslate] = useState(true);
    const [requireApproval, setRequireApproval] = useState(true);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">System Configuration</h2>
            
            <CollapsibleSection title="AI Model Sensitivity">
                <Slider label="False Positive Tolerance" value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} />
                <Slider label="Hallucination Strictness" value={strictness} onChange={(e) => setStrictness(Number(e.target.value))} />
            </CollapsibleSection>

            <CollapsibleSection title="Regional Context">
                <Toggle label="Hinglish-to-English Auto-Translate" enabled={translate} setEnabled={setTranslate} />
            </CollapsibleSection>

            <CollapsibleSection title="Audit Protocols">
                 <div className="flex items-start">
                    <input id="approval-checkbox" type="checkbox" checked={requireApproval} onChange={(e) => setRequireApproval(e.target.checked)} className="h-4 w-4 text-brand-interactive bg-background border-border rounded focus:ring-brand-interactive mt-1" />
                    <label htmlFor="approval-checkbox" className="ml-2 block text-sm text-text-secondary">
                        Require Supervisor Approval for Value Changes &gt; ₹10 Lakhs
                    </label>
                </div>
            </CollapsibleSection>
        </div>
    );
};

export default SettingsView;