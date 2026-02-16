
import React, { useState } from 'react';
import type { Alert } from '../types';
import { PENDING_ALERTS, CASE_DETAILS } from '../constants';

const cardStyle = "bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl p-6";

const AdminDashboard: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>(PENDING_ALERTS);
    const [assignmentStatus, setAssignmentStatus] = useState<string | null>(null);
    const [assignedCase, setAssignedCase] = useState<string | null>(null);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

    const handleAutoAssign = () => {
        setAssignmentStatus('Analyzing Analyst Workloads...');
        setAssignedCase(null);
        setSelectedAlert(null);

        setTimeout(() => {
            setAssignmentStatus("Matching Specialty: Structuring...");
        }, 1500);

        setTimeout(() => {
            setAssignmentStatus("Assignment Complete.");
            setAssignedCase("Case #88291 assigned to Priya S. (Score: 98% Match)");
            setAlerts(prevAlerts => prevAlerts.filter(a => a.caseId !== '88291'));
        }, 3000);
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Admin Dashboard: Pending Alerts</h2>
            
            <div className={cardStyle}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">Alert Queue</h3>
                    <button
                        onClick={handleAutoAssign}
                        disabled={!!assignmentStatus && assignmentStatus !== 'Assignment Complete.'}
                        className="px-4 py-2 text-sm font-medium text-brand-interactive-text bg-brand-interactive rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-brand-interactive disabled:bg-text-secondary disabled:cursor-not-allowed"
                    >
                        AI Smart Assign
                    </button>
                </div>

                {assignmentStatus && (
                    <div className="mb-4 p-4 bg-status-info-bg border-l-4 border-status-info text-text-primary rounded-md">
                        <p className="font-bold">Assignment Progress:</p>
                        <p>{assignmentStatus}</p>
                        {assignedCase && <p className="mt-2 font-semibold text-status-low">{assignedCase}</p>}
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-background">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-text-secondary">Case ID</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-text-secondary">Alert Type</th>
                                <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-text-secondary">Risk Score</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-text-secondary">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-text-primary">
                            {alerts.map((alert) => (
                                <tr key={alert.id} onClick={() => setSelectedAlert(alert)} className="border-b border-border hover:bg-background cursor-pointer">
                                    <td className="text-left py-3 px-4">{alert.caseId}</td>
                                    <td className="text-left py-3 px-4">{alert.type}</td>
                                    <td className="text-center py-3 px-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${alert.riskScore > 90 ? 'bg-status-high-bg text-status-high' : 'bg-status-medium-bg text-status-medium'}`}>
                                            {alert.riskScore}
                                        </span>
                                    </td>
                                    <td className="text-left py-3 px-4">{alert.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedAlert && (
                    <div className={`mt-6 ${cardStyle} border-brand-interactive/50`}>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-brand-interactive">Case Details: {selectedAlert.caseId}</h3>
                            <button onClick={() => setSelectedAlert(null)} className="text-2xl font-light text-text-secondary hover:text-text-primary">&times;</button>
                        </div>
                        <div className="mt-4 border-t border-border pt-4 text-sm space-y-2">
                            <p><span className="font-semibold text-text-secondary w-24 inline-block">Subject:</span> {CASE_DETAILS.subjectName}</p>
                            <p><span className="font-semibold text-text-secondary w-24 inline-block">Risk Profile:</span> <span className="text-status-high font-bold">{CASE_DETAILS.kyc['Risk Profile']}</span></p>
                            <p className="pt-2"><span className="font-semibold text-text-secondary w-24 inline-block align-top">Summary:</span> <span className="inline-block w-[calc(100%-7rem)]">A high-risk alert for <span className="font-semibold">{selectedAlert.type}</span> was triggered on {selectedAlert.date}. Review is required.</span></p>
                        </div>
                         <h4 className="mt-4 font-semibold text-text-primary text-base border-t border-border pt-4">Recent Transactions:</h4>
                         <div className="mt-2 max-h-48 overflow-y-auto border border-border rounded-lg">
                             <table className="min-w-full text-sm">
                                <thead className="bg-background sticky top-0">
                                     <tr>
                                         <th className="text-left py-2 px-3 font-semibold text-text-secondary">ID</th>
                                         <th className="text-left py-2 px-3 font-semibold text-text-secondary">Date</th>
                                         <th className="text-left py-2 px-3 font-semibold text-text-secondary">Counterparty</th>
                                         <th className="text-right py-2 px-3 font-semibold text-text-secondary">Amount (₹)</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-border">
                                    {CASE_DETAILS.transactions.slice(0, 10).map(tx => (
                                        <tr key={tx.id} className="hover:bg-background">
                                            <td className="py-2 px-3 font-mono text-xs">{tx.id}</td>
                                            <td className="py-2 px-3 whitespace-nowrap">{tx.date}</td>
                                            <td className="py-2 px-3">{tx.counterparty}</td>
                                            <td className={`py-2 px-3 text-right font-semibold ${tx.type === 'Credit' ? 'text-status-low' : 'text-status-high'}`}>
                                                {tx.amount.toLocaleString('en-IN')}
                                            </td>
                                        </tr>
                                    ))}
                                 </tbody>
                             </table>
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;