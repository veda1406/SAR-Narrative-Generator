import React from 'react';

const SarifyLogo: React.FC = () => (
    <svg width="28" height="28" viewBox="0 0 68 78" fill="none" xmlns="http://www.w3.org/2000/svg">
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


const GlobalNavbar: React.FC = () => {
    return (
        <header className="h-16 flex-shrink-0 bg-surface border-b border-border z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full">
                <div className="flex items-center space-x-3">
                    <SarifyLogo />
                    <h1 className="text-lg font-semibold tracking-wide text-text-primary">
                        SARify
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default GlobalNavbar;