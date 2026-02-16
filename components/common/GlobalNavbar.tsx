import React from 'react';

const Logo: React.FC = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0L24.2487 3.75131L28 14L24.2487 24.2487L14 28L3.75131 24.2487L0 14L3.75131 3.75131L14 0Z" fill="currentColor" className="text-brand-primary"/>
        <path d="M14 5.25L19.9365 7.6875L22.75 14L19.9365 20.3125L14 22.75L8.06351 20.3125L5.25 14L8.06351 7.6875L14 5.25Z" fill="currentColor" className="text-background"/>
    </svg>
);


const GlobalNavbar: React.FC = () => {
    return (
        <header className="h-16 flex-shrink-0 bg-surface border-b border-border z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full">
                <div className="flex items-center space-x-3">
                    <Logo />
                    <h1 className="text-lg font-semibold tracking-wide text-text-primary">
                        SAR Management
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default GlobalNavbar;