
import React from 'react';
import { SAR_FILING_VELOCITY, TOP_TYPOLOGIES, GEO_HOTSPOTS } from '../../../constants';

const cardStyle = "bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-300/50 dark:border-slate-100/20 rounded-lg shadow-2xl p-6";

const LineChart = ({ data, title }: { data: number[], title: string }) => {
    const maxVal = Math.max(...data);
    const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / maxVal) * 90}`).join(' ');
    return (
        <div className={cardStyle}>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">{title}</h3>
            <svg viewBox="0 0 100 100" className="w-full h-48" preserveAspectRatio="none">
                <polyline points={points} fill="none" stroke="#38bdf8" strokeWidth="1" />
            </svg>
        </div>
    );
};

const BarChart = ({ data, title }: { data: {name: string, value: number}[], title: string }) => {
    const maxVal = Math.max(...data.map(d => d.value));
    return (
        <div className={cardStyle}>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">{title}</h3>
            <div className="space-y-2">
                {data.map(item => (
                    <div key={item.name} className="flex items-center">
                        <span className="text-xs w-1/3 text-slate-600 dark:text-slate-400">{item.name}</span>
                        <div className="w-2/3 bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                            <div className="bg-sky-500 h-4 rounded-full" style={{ width: `${(item.value / maxVal) * 100}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Heatmap = ({ data, title }: { data: {[key: string]: number}, title: string }) => {
    const maxVal = Math.max(...Object.values(data));
    return (
        <div className={cardStyle}>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="p-2 rounded" style={{ backgroundColor: `rgba(239, 68, 68, ${value / maxVal})` }}>
                        <span className="text-sm font-medium text-white mix-blend-difference">{key}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const G1vsG2Chart = () => (
    <div className={cardStyle}>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">AI Performance: G1 vs G2 Scores</h3>
        <div className="flex justify-around items-end h-32">
            <div className="text-center">
                <div className="w-12 bg-orange-400 rounded-t-lg" style={{ height: '85%' }} />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">G1 (Initial)</p>
            </div>
            <div className="text-center">
                <div className="w-12 bg-green-500 rounded-t-lg" style={{ height: '92%' }} />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">G2 (Final)</p>
            </div>
        </div>
    </div>
);

const ReportsView: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Compliance Analytics</h2>

            {/* Top Row */}
            <LineChart data={SAR_FILING_VELOCITY} title="SAR Filing Velocity (This Month)" />

            {/* Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChart data={TOP_TYPOLOGIES} title="Top Detected Typologies" />
                <Heatmap data={GEO_HOTSPOTS} title="Geographic Risk Hotspots" />
            </div>

            {/* Bottom Row */}
            <G1vsG2Chart />
        </div>
    );
};

export default ReportsView;