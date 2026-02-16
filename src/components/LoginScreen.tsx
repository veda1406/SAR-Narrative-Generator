
import React, { useState } from 'react';

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
          <h2 className="text-3xl font-extrabold text-brand-primary">
            SAR Management System
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