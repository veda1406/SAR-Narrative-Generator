
import React, { useState, useEffect, useRef } from 'react';
import type { User, Theme, AnalystView } from '../../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  theme: Theme;
  toggleTheme: () => void;
  setCurrentView?: (view: AnalystView) => void;
}

const SunIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ user, onLogout, theme, toggleTheme, setCurrentView }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigate = (view: AnalystView) => {
    if (setCurrentView) {
        setCurrentView(view);
    }
    setDropdownOpen(false);
  }

  return (
    <header className="bg-surface/70 backdrop-blur-lg shadow-md sticky top-0 z-50 flex-shrink-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold tracking-wider text-text-primary">
              {user.role === 'Admin' ? 'Admin Portal' : 'Analyst Workspace'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 mr-2 bg-status-low-bg px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-low opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-status-low"></span>
                </span>
                <span className="text-xs font-medium text-status-low">AI Agents Active</span>
            </div>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-text-secondary hover:bg-border transition-colors"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <div className="relative" ref={dropdownRef}>
                <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 bg-background p-2 rounded-lg hover:bg-border transition-colors"
                >
                <img
                    src={user.profileImageUrl || `https://i.pravatar.cc/150?u=${user.username}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-border"
                />
                <div className="text-right hidden sm:block">
                    <p className="font-semibold text-sm text-text-primary">{user.name}</p>
                    <p className="text-xs text-text-secondary">{user.role}</p>
                </div>
                </button>
                {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-md shadow-lg py-1 z-20">
                    {setCurrentView && (
                        <>
                            <button onClick={() => handleNavigate('PROFILE')} className="w-full text-left block px-4 py-2 text-sm text-text-primary hover:bg-background">View Profile</button>
                            <div className="border-t border-border my-1"></div>
                        </>
                    )}
                    <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-status-high hover:bg-status-high-bg"
                    >
                    Logout
                    </button>
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;