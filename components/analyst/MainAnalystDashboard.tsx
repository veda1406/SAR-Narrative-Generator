import React from 'react';
import { RECENT_ACTIVITY } from '../../constants';
import KPI_Card from './common/KPI_Card'; // Renamed for clarity and premium feel

// Icons for KPI Cards
const CasesIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

interface AnalystDashboardProps {
  onStartInvestigation: () => void;
}

const cardStyle = "bg-surface/50 backdrop-blur-lg border border-border/50 rounded-xl shadow-xl shadow-black/10 p-6 transition-all duration-300";

const statusStyles: { [key: string]: string } = {
    Approved: 'bg-status-low-bg text-status-low',
    Flagged: 'bg-status-high-bg text-status-high',
    'In Progress': 'bg-status-medium-bg text-status-medium',
};

const AnalystDashboard: React.FC<AnalystDashboardProps> = ({ onStartInvestigation }) => {
  return (
    <div className="grid grid-cols-12 gap-6">
      
      {/* Main Content Area */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className={cardStyle}>
          <h3 className="text-lg font-bold text-text-primary mb-4">My Cases</h3>
           <div className="border border-border/50 rounded-lg p-4 flex justify-between items-center bg-elevated-surface hover:bg-elevated-surface/80 transition-colors">
            <div>
              <p className="font-bold text-brand-primary">Case #88291</p>
              <p className="text-sm text-text-primary">Subject: Rahul Gupta</p>
              <p className="text-sm text-text-secondary">Alert Type: Structuring</p>
            </div>
            <button
              onClick={onStartInvestigation}
              className="px-4 py-2 text-sm font-medium text-brand-interactive-text bg-brand-interactive rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-brand-interactive"
            >
              Start Investigation
            </button>
          </div>
        </div>
        
        <div className={cardStyle}>
            <h3 className="text-lg font-bold text-text-primary mb-4">Recent Activity</h3>
            <ul className="space-y-4">
                {RECENT_ACTIVITY.map(item => (
                    <li key={item.id} className="group flex items-center space-x-4 p-2 -m-2 rounded-lg hover:bg-elevated-surface/80 transition-colors">
                        <div className={`text-xs font-bold px-2 py-1 rounded-full ${statusStyles[item.status]}`}>{item.status.toUpperCase()}</div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary">{item.action} <span className="text-text-secondary font-light">by {item.user}</span></p>
                            <p className="text-xs text-text-secondary">{item.details}</p>
                        </div>
                        <div className="text-xs text-text-secondary mr-4">{item.timestamp}</div>
                        <button className="text-brand-interactive opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold" title="View Case">
                            View &rarr;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
      </div>
      
      {/* Right "At a Glance" Sidebar */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="space-y-6">
            <KPI_Card title="Pending Reviews" value="12" icon={<CasesIcon />} footer="Cases awaiting your action" />
        </div>
      </div>
    </div>
  );
};

export default AnalystDashboard;