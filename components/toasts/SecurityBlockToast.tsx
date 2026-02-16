import React from 'react';

const ShieldLockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const SecurityBlockToast: React.FC = () => {
    return (
        <div className="fixed top-5 right-5 bg-status-high-bg/90 backdrop-blur-md text-status-high py-3 px-5 rounded-lg shadow-2xl flex items-center border border-status-high z-50">
            <ShieldLockIcon />
            <div>
                <p className="font-bold">Action Blocked</p>
                <p className="text-sm">
                    You attempted to change a Transaction Amount from 50L to 5k. Reason "Typo" rejected. Please escalate.
                </p>
            </div>
        </div>
    );
};

export default SecurityBlockToast;