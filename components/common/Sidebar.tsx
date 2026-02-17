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

const SarifyLogo: React.FC = () => (
    <svg width="36" height="36" viewBox="0 0 68 78" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
        <defs>
            <linearGradient id="sarifyGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2A3F5B" />
                <stop offset="100%" stopColor="#3FA7C8" />
            </linearGradient>
        </defs>
        <path d="M34 0L68 14.5V49.5C68 66 52.5 78 34 78C15.5 78 0 66 0 49.5V14.5L34 0Z" fill="url(#sarifyGradient)"/>
        <path d="M49.66,22.11c-2.39-0.11-4.6,0.83-6.28,2.51c-2.71,2.71-3.56,6.86-2.25,10.53c-3.35-1.78-7.1-2.22-10.77-1.3c-5.26,1.3-9.35,5.26-11.02,10.33c-0.93,2.77-1.01,5.69-0.24,8.47l-2.8,2.17c-1.58,1.22-2.06,3.37-1.12,5.03l2.42,4.18c0.94,1.63,2.94,2.23,4.61,1.29l2.83-1.68c1.47,2.75,3.71,4.98,6.54,6.28c4.86,2.39,10.45,2.1,15.17-0.51l9.5-10.98c2.39-2.75,2.94-6.68,1.38-9.97c-1.55-3.3-4.78-5.38-8.32-5.7l-2.25-0.24c1.18-3.66,0.36-7.75-2.25-10.44C54.71,23.54,52.4,22.22,49.66,22.11Z" fill="white"/>
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
        <div className="text-center mb-10">
          <SarifyLogo />
          <h1 className="text-2xl font-bold tracking-wider text-brand-primary mt-2">
            SARify
          </h1>
        </div>
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