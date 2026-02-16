
import React from 'react';

interface KycCardProps {
  name: string;
  kyc: Record<string, string>;
}

const KycCard: React.FC<KycCardProps> = ({ name, kyc }) => {
  const riskProfile = kyc['Risk Profile'] || 'N/A';
  const riskColor = riskProfile.toLowerCase() === 'high' ? 'text-status-high' : 'text-status-medium';

  return (
    <div className="bg-surface/50 backdrop-blur-lg border border-border/50 p-6 rounded-lg shadow-2xl">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-brand-primary">{name}</h3>
          <p className="text-sm text-text-secondary">Customer KYC Details</p>
        </div>
        <div className={`text-sm font-bold px-3 py-1 rounded-full ${riskProfile.toLowerCase() === 'high' ? 'bg-status-high-bg text-status-high' : 'bg-status-medium-bg text-status-medium'}`}>
          Risk: {riskProfile}
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          {Object.entries(kyc).map(([key, value]) => (
            <React.Fragment key={key}>
              <dt className="text-sm font-medium text-text-secondary">{key}</dt>
              <dd className={`text-sm text-text-primary ${key === 'Risk Profile' ? `font-semibold ${riskColor}` : ''}`}>{value}</dd>
            </React.Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default KycCard;