
import React, { useState } from 'react';
import { SAR_DATA } from '../../constants';

interface BarclaysSARFormProps {
    narrative: string;
    onNarrativeChange: (text: string) => void;
    onFinalize: () => void;
    onCitationClick: (citationKey: string) => void;
}

const ReadOnlyField: React.FC<{ label: string; value: string | React.ReactNode; fullWidth?: boolean }> = ({ label, value, fullWidth = false }) => (
    <div className={`border-b border-slate-200 ${fullWidth ? 'col-span-2' : ''}`}>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 pt-2">{label}</label>
        <div className="p-3 text-sm text-slate-800 bg-slate-50/50 min-h-[44px] flex items-center">{value}</div>
    </div>
);

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <h2 className="text-sm font-bold text-slate-700 bg-slate-100 p-3 border-b border-slate-200 uppercase tracking-wide">{title}</h2>
);

const BarclaysSARForm: React.FC<BarclaysSARFormProps> = ({ narrative, onNarrativeChange, onFinalize, onCitationClick }) => {
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const renderNarrativeWithCitations = (text: string) => {
        const parts = text.split(/(\[Ref: [A-Z0-9-]+\])/g);
        
        return parts.map((part, index) => {
            const match = part.match(/^\[Ref: (.*?)\]$/);
            if (match) {
                const key = match[1];
                return (
                    <button
                        key={`${key}-${index}`}
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            onCitationClick(key);
                        }}
                        className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-xs border border-blue-300 hover:bg-blue-200 hover:border-blue-400 transition-all cursor-pointer mx-1 align-baseline shadow-sm"
                        title={`View evidence for ${key}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {part}
                    </button>
                );
            }
            return part ? <span key={index}>{part}</span> : null;
        });
    };
    
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-2xl border border-slate-300 font-sans text-slate-900 mb-20 overflow-hidden rounded-sm">
            {/* Header Branding */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center font-black text-lg">B</div>
                    <span className="font-bold tracking-tight text-lg">BARCLAYS | Financial Crime Investigation</span>
                </div>
                <div className="text-[10px] font-mono opacity-60">FORM-SAR-V4.2.0-INTERNAL</div>
            </div>

            <div className="p-6 border-b-2 border-slate-200 bg-slate-50/50">
                <p className="text-[10px] font-black tracking-widest text-center text-slate-500 uppercase">AML CONFIDENTIAL – RESTRICTED ACCESS ONLY</p>
                
                <div className="mt-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-4 text-[11px] rounded-r shadow-sm">
                    <p className="font-bold mb-1 underline">STATUTORY WARNING: POCA 2002 & TACT 2000</p>
                    <p>
                        Disclosure of the existence of this investigation or this report to unauthorized parties constitutes the criminal offense of "Tipping Off". This document must remain secured within GFC vaults.
                    </p>
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* SECTION 1 */}
                <div className="border border-slate-200 rounded overflow-hidden">
                    <SectionHeader title="Section 1 – Case Control & Regulatory Flags" />
                    <div className="grid grid-cols-2">
                        <ReadOnlyField label="Internal Case ID" value={SAR_DATA.section1.internalCaseId} />
                        <ReadOnlyField label="Customer CIF / Party ID" value={SAR_DATA.section1.customerCif} />
                        <ReadOnlyField label="Linked Account ID(s)" value={SAR_DATA.section1.linkedAccountIds} fullWidth={true} />
                        <ReadOnlyField label="Product Type" value={SAR_DATA.section1.productType} />
                        <ReadOnlyField label="Customer Risk Rating" value={SAR_DATA.section1.customerRiskRating} />
                        <ReadOnlyField label="NCA Glossary Code" value={SAR_DATA.section1.ncaGlossaryCode} fullWidth={true} />
                    </div>
                </div>

                {/* SECTION 2 */}
                <div className="border border-slate-200 rounded overflow-hidden">
                    <SectionHeader title="Section 2 – Individuals / Relevant Parties" />
                    {SAR_DATA.section2.parties.map((party, index) => (
                        <div key={index} className={index > 0 ? 'border-t-2 border-slate-200' : ''}>
                            <h3 className="text-[10px] font-black text-slate-500 bg-slate-50 p-2 border-b border-slate-200 uppercase tracking-tighter italic">Entity Node {index + 1}</h3>
                            <div className="grid grid-cols-1">
                                <ReadOnlyField label="Full Legal Name" value={party.name} fullWidth={true} />
                                <ReadOnlyField label="Primary Address of Record" value={party.address} fullWidth={true}/>
                                <ReadOnlyField label="Known Involvement Details" value={party.suspectedInvolvement} fullWidth={true}/>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* SECTION 3 - NARRATIVE WITH MODE TOGGLE */}
                <div className="border-2 border-blue-900 rounded overflow-hidden shadow-lg">
                    <div className="bg-blue-900 text-white p-3 flex justify-between items-center">
                        <h2 className="text-sm font-bold uppercase tracking-wider">Section 3 – Reason for Suspicion (G2 DRAFT)</h2>
                        <div className="flex bg-blue-800/50 rounded p-1 border border-blue-700">
                            <button
                                type="button"
                                onClick={() => setIsPreviewMode(false)}
                                className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!isPreviewMode ? 'bg-white text-blue-900 shadow' : 'text-blue-300 hover:text-white'}`}
                            >
                                EDITOR
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsPreviewMode(true)}
                                className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${isPreviewMode ? 'bg-white text-blue-900 shadow' : 'text-blue-300 hover:text-white'}`}
                            >
                                EVIDENCE REVIEW
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-slate-50">
                        {isPreviewMode ? (
                            <div className="w-full min-h-[400px] p-6 text-sm text-slate-800 border-2 border-blue-100 bg-white rounded shadow-inner overflow-y-auto whitespace-pre-wrap leading-relaxed animate-in fade-in duration-300">
                                {renderNarrativeWithCitations(narrative)}
                                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400">
                                    <span className="text-[10px] italic">Interactive Citation Overlay Active</span>
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-[10px] font-bold">VERIFIED BY AI G1 AGENT</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <textarea 
                                value={narrative}
                                onChange={(e) => onNarrativeChange(e.target.value)}
                                className="w-full h-96 p-4 text-sm text-slate-900 border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none rounded shadow-sm transition-all font-mono leading-relaxed"
                                placeholder="Finalize Section 3 narrative. Ensure all Ref IDs (e.g., [Ref: TXN-01]) are intact for traceabilty."
                            />
                        )}
                    </div>
                </div>
            
                {/* SECTION 5 & 6 COMPACT */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="border border-slate-200 rounded overflow-hidden">
                        <SectionHeader title="Section 5 – Reporter" />
                        <ReadOnlyField label="Investigator Name" value={SAR_DATA.section5.reporterName} />
                        <ReadOnlyField label="Reporting Date" value={SAR_DATA.section5.dateOfReport} />
                    </div>
                    <div className="border border-slate-200 rounded overflow-hidden">
                        <SectionHeader title="Section 6 – Admin" />
                        <ReadOnlyField label="G1 Agent Consensus" value="98.4% Match" />
                        <ReadOnlyField label="Statutory Deadline" value="Oct 29, 2023" />
                    </div>
                </div>

                {/* FINAL SUBMISSION */}
                <div className="flex flex-col items-center pt-8 border-t-2 border-slate-100 space-y-4">
                    <p className="text-[10px] text-slate-400 font-medium italic">By submitting, you certify that this report is based on the investigative findings and meets regulatory standards.</p>
                    <button 
                        onClick={() => onFinalize()}
                        className="group relative bg-blue-900 text-white w-full max-w-sm py-4 rounded font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-800 active:scale-[0.98] transition-all shadow-xl hover:shadow-blue-900/20"
                    >
                        COMPLETE G2 FINALIZATION
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    <p className="text-[9px] text-slate-300">Transaction Monitoring & Surveillance Unit | GFC-MUM-HUB</p>
                </div>
            </div>
        </div>
    );
};

export default BarclaysSARForm;
