import React, { useState, useCallback, useEffect } from 'react';
import type { User, Theme, AnalystView } from './types';
import { MOCK_USERS } from './constants';
import LoginScreen from './components/LoginScreen';
import AdminDashboard from './components/AdminDashboard';
import AnalystPortal from './components/AnalystWorkflow';
import Header from './components/common/Header';
import ProfileView from './components/analyst/views/ProfileView';
import GlobalNavbar from './components/common/GlobalNavbar';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [theme, setTheme] = useState<Theme>('dark');
  const [adminView, setAdminView] = useState<AnalystView>('DASHBOARD');

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    document.body.className = theme;
  }, [theme]);

  const handleLogin = useCallback((username: string, password: string):void => {
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      setAdminView('DASHBOARD');
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  }, []);

  const handleLogout = useCallback(():void => {
    setUser(null);
  }, []);

  const backgroundClass = "bg-background text-text-primary";

  if (!user) {
    return (
      <div className={`min-h-screen font-sans transition-colors duration-300 ${backgroundClass}`}>
        <LoginScreen onLogin={handleLogin} error={error} />
      </div>
    );
  }

  return (
    <div className={`h-screen font-sans flex flex-col transition-colors duration-300 ${backgroundClass}`}>
        <GlobalNavbar />
        <div className="flex flex-1 overflow-hidden">
          {user.role === 'Analyst' ? (
            <AnalystPortal user={user} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
          ) : (
            <div className="flex flex-col flex-1 h-full">
              <Header user={user} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} setCurrentView={setAdminView} />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {adminView !== 'DASHBOARD' && (
                  <div className="mb-6">
                      <button 
                          onClick={() => setAdminView('DASHBOARD')}
                          className="flex items-center text-sm font-medium text-text-secondary hover:text-brand-interactive"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Back to Dashboard
                      </button>
                  </div>
                )}
                {(() => {
                    switch (adminView) {
                        case 'PROFILE':
                            return <ProfileView />;
                        case 'DASHBOARD':
                        default:
                            return <AdminDashboard />;
                    }
                })()}
              </main>
            </div>
          )}
        </div>
    </div>
  );
};

export default App;