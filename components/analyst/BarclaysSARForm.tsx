import React, { useState } from 'react';
import { CASE_DETAILS, AI_NARRATIVE_G1 } from '../../constants';

interface BarclaysSARFormProps {
    narrative: string;
    onNarrativeChange: (text: string) => void;
    onFinalize: () => void;
}

const SECTION_STYLE = "border border-border/40 rounded-lg overflow-hidden mb-3 bg-surface/20";
// Kept ultra-tight vertical padding for a dense, professional look
const SECTION_HEADER = "px-4 py-0.5 bg-elevated-surface/20 border-b border-border/20 flex justify-between items-center cursor-pointer hover:bg-border/10 transition-colors";
const READ_ONLY_GRID = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 p-4 text-xs";
const LABEL_STYLE = "text-text-secondary font-bold mb-1 block uppercase text-[9px] tracking-[0.1em]";
const VALUE_STYLE = "text-text-primary font-mono bg-background/30 px-3 py-1.5 rounded border border-border/30 w-full disabled:opacity-70 text-[13px]";

const BarclaysSARForm: React.FC<BarclaysSARFormProps> = ({ narrative, onNarrativeChange, onFinalize }) => {
    const [openSections, setOpenSections] = useState<Record<number, boolean>>({
        1: false,
        2: false,
        3: true,
        5: false,
        6: false
    });

    const toggleSection = (id: number) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 shadow-xl rounded-xl border-t-[6px] border-brand-primary overflow-hidden mb-12 ring-1 ring-black/5">
            {/* Header Branding & Warnings */}
            <div className="p-6 border-b border-border/60 bg-slate-50 dark:bg-slate-800/40">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-[22px] font-black text-brand-primary tracking-tighter uppercase leading-none">Barclays</h1>
                        <p className="text-[11px] font-bold text-text-secondary mt-1 tracking-[0.2em] uppercase opacity-70">Global Compliance Ops</p>
                    </div>
                    <div className="text-right">
                        <p className="text-status-high font-bold text-[10px] bg-status-high-bg px-2.5 py-1 rounded border border-status-high/20 inline-block uppercase tracking-wider">
                            RESTRICTED – AML CONFIDENTIAL
                        </p>
                    </div>
                </div>

                <div className="bg-status-high-bg/30 border-l-2 border-status-high p-3 rounded-sm">
                    <p className="text-status-high text-[9px] font-black uppercase mb-0.5 tracking-wider">Legal Notice: POCA 2002</p>
                    <p className="text-status-high text-[11px] leading-tight opacity-80">
                        Unauthorized disclosure constitutes a "tip-off" offense. This document is restricted to Compliance personnel.
                    </p>
                </div>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-3">
                
                {/* Section 1 - CASE CONTROL */}
                <div className={SECTION_STYLE}>
                    <div className={SECTION_HEADER} onClick={() => toggleSection(1)}>
                        {/* Reduced size to 10px and lowered opacity to 50% for minimal prominence */}
                        <h3 className="text-[10px] font-medium uppercase tracking-tight text-text-secondary/50">SECTION 1 – CASE CONTROL</h3>
                        <span className="text-text-secondary/30 text-[10px]">{openSections[1] ? '▲' : '▼'}</span>
                    </div>
                    {openSections[1] && (
                        <div className={READ_ONLY_GRID}>
                            <div>
                                <label className={LABEL_STYLE}>Internal Case ID</label>
                                <input className={VALUE_STYLE} value="BAR-SAR-2023-88291" disabled />
                            </div>
                            <div>
                                <label className={LABEL_STYLE}>CIF / Party ID</label>
                                <input className={VALUE_STYLE} value="CUST-RG-47583" disabled />
                            </div>
                            <div>
                                <label className={LABEL_STYLE}>Risk Rating</label>
                                <input className={`${VALUE_STYLE} text-status-high font-black`} value="HIGH" disabled />
                            </div>
                        </div>
                    )}
                </div>

                {/* Section 2 - SUBJECT DETAILS */}
                <div className={SECTION_STYLE}>
                    <div className={SECTION_HEADER} onClick={() => toggleSection(2)}>
                        <h3 className="text-[10px] font-medium uppercase tracking-tight text-text-secondary/50">SECTION 2 – SUBJECT DETAILS</h3>
                        <span className="text-text-secondary/30 text-[10px]">{openSections[2] ? '▲' : '▼'}</span>
                    </div>
                    {openSections[2] && (
                        <div className="p-4 bg-background/20">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className={LABEL_STYLE}>Full Legal Name</p>
                                    <p className="text-[13px] font-bold text-text-primary">{CASE_DETAILS.subjectName}</p>
                                </div>
                                <div>
                                    <p className={LABEL_STYLE}>Verification Status</p>
                                    <p className="text-[11px] text-status-low font-bold italic uppercase">KYC Level 3 Verified</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Section 3 - REASON FOR SUSPICION */}
                <div className={SECTION_STYLE}>
                    <div className={SECTION_HEADER} onClick={() => toggleSection(3)}>
                        <h3 className="text-[10px] font-medium uppercase tracking-tight text-text-secondary/50">SECTION 3 – REASON FOR SUSPICION</h3>
                        <span className="text-text-secondary/30 text-[10px]">{openSections[3] ? '▲' : '▼'}</span>
                    </div>
                    {openSections[3] && (
                        <div className="p-5 bg-white dark:bg-slate-800">
                            <p className="text-[10px] text-text-secondary mb-4 italic opacity-70">
                                Draft generated from AI investigation. Ensure 'Who, What, Where, When, Why, How' is clearly articulated.
                            </p>
                            <textarea 
                                value={narrative}
                                onChange={(e) => onNarrativeChange(e.target.value)}
                                className="w-full h-[450px] p-5 text-[14px] leading-relaxed text-text-primary bg-slate-50/50 dark:bg-slate-900/40 border border-border/60 focus:ring-1 focus:ring-brand-interactive focus:border-brand-interactive rounded-md font-sans transition-all resize-none shadow-inner"
                                placeholder="Input suspicion details..."
                            />
                        </div>
                    )}
                </div>

                {/* Section 5 & 6 compacted */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={SECTION_STYLE}>
                        <div className={SECTION_HEADER} onClick={() => toggleSection(5)}>
                            <h3 className="text-[10px] font-medium uppercase tracking-tight text-text-secondary/50">REPORTER</h3>
                            <span className="text-text-secondary/30 text-[10px]">{openSections[5] ? '▲' : '▼'}</span>
                        </div>
                        {openSections[5] && <div className="p-3 text-[11px] text-text-secondary font-mono uppercase">P. Sharma (EMP-1092)</div>}
                    </div>
                    <div className={SECTION_STYLE}>
                        <div className={SECTION_HEADER} onClick={() => toggleSection(6)}>
                            <h3 className="text-[10px] font-medium uppercase tracking-tight text-text-secondary/50">AI ASSURANCE</h3>
                            <span className="text-text-secondary/30 text-[10px]">{openSections[6] ? '▲' : '▼'}</span>
                        </div>
                        {openSections[6] && <div className="p-3 text-[10px] text-status-info italic leading-tight">Citations verified against internal ledger. Structuring confidence: 94%.</div>}
                    </div>
                </div>

                {/* Submit Action */}
                <div className="pt-8 pb-4 flex justify-center border-t border-border/40">
                    <button 
                        onClick={onFinalize}
                        className="px-12 py-3 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-black uppercase tracking-[0.2em] rounded shadow-lg shadow-brand-primary/10 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center space-x-3"
                    >
                        <span>Finalize & Submit SAR</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Compact Footer */}
            <div className="bg-slate-100 dark:bg-slate-800/80 p-3 text-center text-[8px] text-text-secondary font-mono tracking-widest opacity-60 uppercase">
                Systems Secure • BARCLAYS Document Cloud • {new Date().toLocaleDateString()}
            </div>
        </div>
    );
};

export default BarclaysSARForm;