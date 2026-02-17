
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

const renderNarrativeWithCitations = (text: string, onCitationClick: (key: string) => void) => {
    // Regex to split by [Ref: ...] patterns
    const parts = text.split(/(\[Ref: .*?\])/g);
    
    return parts.map((part, index) => {
      // Check if the current part matches the citation format
      const match = part.match(/^\[Ref: (.*?)\]$/);
      if (match) {
        const key = match[1]; // Extract the ID inside the reference
        return (
          <button
            key={index}
            type="button"
            onClick={() => onCitationClick(key)}
            className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md cursor-pointer hover:bg-blue-200 font-bold mx-1 inline-flex items-center text-xs align-middle transition-colors border border-blue-200"
            title="Click to view evidence details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            {part}
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
};

const BarclaysSARForm: React.FC<BarclaysSARFormProps> = ({ narrative, onNarrativeChange, onFinalize, onCitationClick }) => {
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg border border-slate-200 font-sans text-slate-900 mb-20">
            
            <div className="p-6 border-b-2 border-slate-300">
                <p className="text-xs font-bold tracking-wider text-center text-slate-600">[BARCLAYS INTERNAL USE ONLY] RESTRICTED – AML CONFIDENTIAL</p>
                
                <div className="mt-6 bg-red-50 border-l-4 border-red-500 text-red-800 p-4 text-xs">
                    <p className="font-bold">WARNING: Proceeds of Crime Act 2002 (POCA) and Terrorism Act 2000 (TACT)</p>
                    <p className="mt-1">
                        Disclosure of this report to any person outside of the Financial Crime / Compliance department may constitute the criminal offense of "Tipping Off" under Section 333A of POCA. This report must not be disclosed to the subject.
                    </p>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* SECTION 1 */}
                <div className="border border-slate-200">
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
                <div className="border border-slate-200">
                    <SectionHeader title="Section 2 – Individuals / Relevant Parties" />
                    {SAR_DATA.section2.parties.length > 0 ? (
                        SAR_DATA.section2.parties.map((party, index) => (
                            <div key={index} className={index > 0 ? 'border-t-2 border-slate-300' : ''}>
                                <h3 className="text-xs font-bold text-slate-600 bg-slate-50 p-2 border-b border-slate-200">Individual / Relevant Party {index + 1}</h3>
                                <div className="grid grid-cols-1">
                                    <ReadOnlyField label="Name" value={party.name} fullWidth={true} />
                                    <ReadOnlyField label="Date of birth" value={party.dob} fullWidth={true}/>
                                    <ReadOnlyField label="Address" value={party.address} fullWidth={true}/>
                                    <ReadOnlyField label="Contact details" value={party.contactDetails} fullWidth={true}/>
                                    <ReadOnlyField label="Additional details" value={party.additionalDetails} fullWidth={true}/>
                                    <ReadOnlyField label="Suspected involvement" value={party.suspectedInvolvement} fullWidth={true}/>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-sm text-red-600 bg-red-50">
                            <strong>Mandatory Rule Violation:</strong> At least ONE individual / relevant party MUST be included. This section cannot be empty.
                        </div>
                    )}
                </div>
                
                {/* SECTION 3 - HYBRID EDIT/VIEW */}
                <div className="border border-slate-200">
                    <SectionHeader title="Section 3 – Reason for Suspicion" />
                    <div className="p-4 space-y-4">
                        <div className="text-xs text-slate-600 leading-normal p-3 bg-slate-50 border border-slate-200 rounded-md">
                            The narrative must list events chronologically, be clear, concise, and simple, explicitly address Who, What, Where, When, Why, and How, include key dates, describe the criminal property, explain how the situation came to attention, and what led to suspicion.
                        </div>
                        
                        {/* Toggle Switch */}
                        <div className="flex justify-end items-center space-x-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className={`text-xs font-bold uppercase tracking-wide transition-colors ${!isPreviewMode ? 'text-blue-700' : 'text-slate-400'}`}>
                                Edit Mode
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsPreviewMode(!isPreviewMode)}
                                className={`relative inline-flex items-center h-5 rounded-full w-10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isPreviewMode ? 'bg-blue-600' : 'bg-slate-300'}`}
                                aria-pressed={isPreviewMode}
                            >
                                <span className={`inline-block w-3 h-3 transform bg-white rounded-full transition-transform shadow-sm ${isPreviewMode ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className={`text-xs font-bold uppercase tracking-wide transition-colors ${isPreviewMode ? 'text-blue-700' : 'text-slate-400'}`}>
                                Review Citations
                            </span>
                        </div>
                        
                        {/* Input Area */}
                        {isPreviewMode ? (
                            <div className="w-full h-96 p-4 text-sm text-slate-900 border border-blue-200 bg-blue-50/10 rounded-md overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                                {renderNarrativeWithCitations(narrative, onCitationClick)}
                            </div>
                        ) : (
                             <textarea 
                                value={narrative}
                                onChange={(e) => onNarrativeChange(e.target.value)}
                                className="w-full h-96 p-4 text-sm text-slate-900 border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none rounded-md leading-relaxed shadow-sm transition-shadow"
                                placeholder="Enter narrative details here. Use format [Ref: ID] to cite evidence..."
                                disabled={false}
                            />
                        )}
                    </div>
                </div>
            
                {/* SECTION 4 */}
                <div className="border border-slate-200">
                    <SectionHeader title="Section 4 – Supporting Documentation" />
                    <div className="p-4">
                        <div className="text-xs text-slate-600 leading-normal mb-3 p-3 bg-slate-50 border border-slate-200 rounded-md">
                            Describe what the supporting documentation is, how it relates to the report, and why it is relevant. Examples include copies of correspondence, customer files, internal records, or information obtained during the investigation.
                        </div>
                        <textarea 
                            className="w-full h-24 p-3 text-sm border border-slate-200 bg-slate-50/50 text-slate-500 italic outline-none rounded-md"
                            placeholder="No supporting documents attached or described."
                            readOnly
                        />
                    </div>
                </div>

                {/* SECTION 5 */}
                <div className="border border-slate-200">
                    <SectionHeader title="Section 5 – Reporter Details" />
                    <div className="grid grid-cols-1">
                        <ReadOnlyField label="Name" value={SAR_DATA.section5.reporterName} fullWidth={true} />
                        <ReadOnlyField label="Contact number" value={SAR_DATA.section5.contactNumber} fullWidth={true}/>
                        <ReadOnlyField label="Date of report" value={SAR_DATA.section5.dateOfReport} fullWidth={true}/>
                    </div>
                </div>
                
                {/* SECTION 6 */}
                <div className="border border-slate-200">
                    <SectionHeader title="Section 6 – To be completed by Admin" />
                    <div className="grid grid-cols-1">
                         <div className="border-b border-slate-200">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 pt-2">Reported to NCA?</label>
                            <div className="p-3">
                                <select className="w-full bg-slate-50/50 p-2 border border-slate-200 rounded-md text-sm text-slate-500" disabled>
                                    <option>Choose an item.</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>
                        <ReadOnlyField label="Record rationale in support of making SAR, or for deciding not to" value={SAR_DATA.section6.rationale} fullWidth={true}/>
                        <ReadOnlyField label="Date of report made to NCA" value="[Admin Input]" fullWidth={true}/>
                        <ReadOnlyField label="Signed" value="[Admin Input]" fullWidth={true}/>
                        <ReadOnlyField label="Date" value="[Admin Input]" fullWidth={true}/>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-center pt-6 border-t border-slate-200">
                    <button 
                        onClick={() => onFinalize()}
                        className="bg-blue-900 text-white px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-blue-800 active:scale-95 transition-all shadow-md rounded-sm"
                    >
                        Submit for G2 Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BarclaysSARForm;
