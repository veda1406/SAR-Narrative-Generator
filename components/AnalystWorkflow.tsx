
import React, { useState } from 'react';
import type { User, Theme, AnalystView, WorkflowState } from '../types';
import Sidebar from './common/Sidebar';
import Header from './common/Header';

// Import all analyst views
import AnalystDashboard from './analyst/MainAnalystDashboard';
import MyCasesView from './analyst/MyCasesView';
import InvestigationView from './analyst/InvestigationView';
import EditingView from './analyst/EditingView';
import FinalView from './analyst/FinalView';
import ProfileView from './analyst/views/ProfileView';

interface AnalystPortalProps {
    user: User;
    onLogout: () => void;
    theme: Theme;
    toggleTheme: () => void;
}

const AnalystPortal: React.FC<AnalystPortalProps> = ({ user, onLogout, theme, toggleTheme }) => {
    const [currentView, setCurrentView] = useState<AnalystView>('DASHBOARD');
    const [pipelineState, setPipelineState] = useState<WorkflowState>('IDLE');

    const handleStartInvestigation = () => {
        setCurrentView('CASES');
        setPipelineState('INVESTIGATION');
    };
    
    const resetToDashboard = () => {
        setCurrentView('DASHBOARD');
        setPipelineState('IDLE');
    };

    const renderPipelineStep = () => {
        switch (pipelineState) {
            case 'INVESTIGATION':
                return <InvestigationView onProceed={() => setPipelineState('DRAFTING_EDITING')} />;
            case 'DRAFTING_EDITING':
                return <EditingView onProceed={() => setPipelineState('FINAL')} />;
            case 'FINAL':
                return <FinalView onReset={resetToDashboard} />;
            case 'IDLE':
            default:
                return <MyCasesView onStartInvestigation={handleStartInvestigation} />;
        }
    };

    const renderMainContent = () => {
        if (currentView === 'CASES') {
            return renderPipelineStep();
        }
        switch (currentView) {
            case 'DASHBOARD':
                return <AnalystDashboard onStartInvestigation={handleStartInvestigation} />;
            case 'PROFILE':
                return <ProfileView />;
            default:
                return <div>Select a view</div>;
        }
    };
    
    const isSubView = currentView === 'PROFILE';

    return (
        <>
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
            <div className="flex flex-col flex-1 h-full">
                <Header user={user} onLogout={onLogout} theme={theme} toggleTheme={toggleTheme} setCurrentView={setCurrentView} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {isSubView && (
                        <div className="mb-6">
                            <button 
                                onClick={() => setCurrentView('DASHBOARD')}
                                className="flex items-center text-sm font-medium text-text-secondary hover:text-brand-interactive transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Dashboard
                            </button>
                        </div>
                    )}
                    {renderMainContent()}
                </main>
            </div>
        </>
    );
};

export default AnalystPortal;
