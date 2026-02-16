import React from 'react';

interface KPI_CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  suffix?: string;
  footer: string;
  delta?: string;
  deltaType?: 'increase' | 'decrease';
  valueClassName?: string;
  progress?: number;
}

const KPI_Card: React.FC<KPI_CardProps> = ({ title, value, icon, suffix, footer, delta, deltaType, valueClassName, progress }) => {
  const deltaColor = deltaType === 'increase' ? 'text-status-low' : 'text-status-high';
  const deltaIcon = deltaType === 'increase' ? '▲' : '▼';

  return (
    <div className="bg-gradient-card border border-white/5 p-5 rounded-xl shadow-xl shadow-black/20 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 hover:scale-[1.02]">
      <div className="flex items-center text-text-secondary space-x-2">
        {icon}
        <h4 className="text-sm font-medium uppercase tracking-wider">{title}</h4>
      </div>
      <div className="mt-4 flex items-baseline justify-start">
        <p className={`text-4xl font-bold ${valueClassName || 'text-text-primary'}`}>{value}</p>
        {suffix && <span className="text-xl text-text-secondary font-light ml-2">{suffix}</span>}
      </div>
       {progress !== undefined && (
        <div className="mt-4">
            <div className="h-1 w-full bg-white/10 rounded-full">
                <div className="h-1 bg-brand-primary rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
      )}
      <div className="mt-4 flex items-center justify-between text-xs text-text-secondary">
          <span>{footer}</span>
          {delta && (
              <div className={`flex items-center font-semibold text-sm ${deltaColor}`}>
                  <span>{deltaIcon} {delta}</span>
              </div>
          )}
      </div>
    </div>
  );
};

export default KPI_Card;