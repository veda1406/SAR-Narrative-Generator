
import React from 'react';
import type { AnalystView } from '../../types';

interface SidebarProps {
  currentView: AnalystView;
  setCurrentView: (view: AnalystView) => void;
}

const DashboardIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const CasesIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-5a1 1 0 011-1h6a1 1 0 011 1v5m-6 0h6m-6 0l-3 5H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3l-3-5z" />
  </svg>
);

const ProfileIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems: { name: string; view: AnalystView; icon: React.ReactNode }[] = [
    { name: 'Dashboard', view: 'DASHBOARD', icon: <DashboardIcon /> },
    { name: 'My Cases', view: 'CASES', icon: <CasesIcon /> },
    { name: 'Profile', view: 'PROFILE', icon: <ProfileIcon /> },
  ];

  return (
    <aside className="w-64 flex-shrink-0 p-4 h-screen sticky top-0">
      <div className="bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl h-full p-4 flex flex-col">
        <h1 className="text-xl font-bold tracking-wider text-brand-primary mb-10 text-center">
          SAR Management
        </h1>
        <nav className="flex-grow">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView(item.view);
                  }}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                    currentView === item.view
                      ? 'bg-brand-interactive/10 text-brand-interactive'
                      : 'text-text-secondary hover:bg-background hover:text-text-primary'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center justify-center space-x-2 p-2 bg-brand-interactive/10 rounded-lg">
                 <svg className="animate-spin h-4 w-4 text-brand-interactive" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xs font-medium text-brand-interactive">Analysis Running...</span>
            </div>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;