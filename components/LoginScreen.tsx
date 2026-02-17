import React, { useState } from 'react';

const SarifyLogo: React.FC = () => (
    <svg width="48" height="48" viewBox="0 0 68 78" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
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

interface LoginScreenProps {
  onLogin: (username: string, password: string) => void;
  error: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl">
        <div className="text-center">
          <SarifyLogo />
          <h2 className="mt-4 text-3xl font-extrabold text-brand-primary">
            SARify
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Secure Sign-in
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-background border border-border placeholder-text-secondary text-text-primary rounded-t-md focus:outline-none focus:ring-brand-interactive focus:border-brand-interactive focus:z-10 sm:text-sm"
                placeholder="Username (admin or analyst)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-background border border-border placeholder-text-secondary text-text-primary rounded-b-md focus:outline-none focus:ring-brand-interactive focus:border-brand-interactive focus:z-10 sm:text-sm"
                placeholder="Password (admin123 or analyst123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-status-high bg-status-high-bg border border-status-high/50 rounded-md">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-brand-interactive-text bg-brand-interactive hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-brand-interactive"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;