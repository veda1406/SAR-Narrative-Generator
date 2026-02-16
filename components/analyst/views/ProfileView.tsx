import React from 'react';
import { MOCK_USERS, SKILL_MATRIX } from '../../../constants';

const cardStyle = "bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl p-6";

const RadarChart = ({ labels, values }: { labels: string[], values: number[] }) => {
    const size = 200;
    const center = size / 2;
    const numLevels = 5;
    const angleSlice = (Math.PI * 2) / labels.length;

    const points = values.map((value, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const radius = (value / 100) * (center * 0.8);
        return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;
    }).join(' ');

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-w-xs mx-auto">
            {/* Concentric Polygons */}
            {[...Array(numLevels)].map((_, level) => {
                const radius = (center * 0.8) * ((level + 1) / numLevels);
                const levelPoints = labels.map((_, i) => {
                    const angle = angleSlice * i - Math.PI / 2;
                    return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;
                }).join(' ');
                return <polygon key={level} points={levelPoints} className="fill-none stroke-border" strokeWidth="0.5" />;
            })}
            {/* Data Polygon */}
            <polygon points={points} className="fill-brand-interactive/30 stroke-brand-interactive" strokeWidth="1" />
            {/* Labels */}
            {labels.map((label, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                const radius = center * 0.95;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                return (
                    <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[8px] fill-current text-text-secondary">
                        {label}
                    </text>
                );
            })}
        </svg>
    );
};

const ProfileView: React.FC = () => {
    const user = MOCK_USERS.find(u => u.role === 'Analyst')!;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">User Profile</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Sidebar */}
                <div className={`${cardStyle} lg:col-span-1 text-center`}>
                    <img src={user.profileImageUrl} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto border-4 border-brand-interactive" />
                    <h3 className="mt-4 text-xl font-bold text-text-primary">{user.name}</h3>
                    <p className="text-text-secondary">Senior Investigator</p>
                    <p className="text-sm text-text-secondary mt-2">Mumbai Branch</p>
                </div>
                {/* Right Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <div className={cardStyle}>
                        <h4 className="text-lg font-semibold text-text-primary">Skill Matrix</h4>
                        <RadarChart labels={SKILL_MATRIX.labels} values={SKILL_MATRIX.values} />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className={cardStyle}>
                            <h4 className="text-lg font-semibold text-text-primary">Efficiency Stats</h4>
                            <p className="mt-2 text-2xl font-bold text-brand-primary">1,240 <span className="text-base font-normal text-text-secondary">Cases Closed</span></p>
                            <p className="mt-2 text-2xl font-bold text-status-low">99.8% <span className="text-base font-normal text-text-secondary">Accuracy Rate</span></p>
                        </div>
                        <div className={cardStyle}>
                            <h4 className="text-lg font-semibold text-text-primary">Recent Audit Logs</h4>
                            <ul className="text-xs space-y-2 mt-2 text-text-secondary">
                                <li>Edit Case #88291: Reason "Typo Correction"</li>
                                <li>Flagged Txn-45 in Case #88290: Reason "Suspicious Pattern"</li>
                                <li>Approved SAR #88285: Reason "Sufficient Evidence"</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;