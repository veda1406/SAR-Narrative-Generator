
import React from 'react';
import type { DonutChartData } from '../../../types';

interface DonutChartProps {
  data: DonutChartData[];
}

// Helper to lighten a hex color for the gradient effect
const lightenColor = (hex: string, percent: number): string => {
    try {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);

        r = Math.min(255, Math.floor(r * (1 + percent / 100)));
        g = Math.min(255, Math.floor(g * (1 + percent / 100)));
        b = Math.min(255, Math.floor(b * (1 + percent / 100)));

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    } catch (e) {
        return hex; // Fallback for invalid color format
    }
};

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let accumulated = 0;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 36 36" className="w-40 h-40">
        <defs>
          {data.map((item, index) => (
            <linearGradient key={index} id={`grad${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: item.color, stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: lightenColor(item.color, 30), stopOpacity: 1 }} />
            </linearGradient>
          ))}
        </defs>
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const strokeDasharray = `${percentage} ${100 - percentage}`;
          const strokeDashoffset = -accumulated;
          accumulated += percentage;
          
          return (
            <circle
              key={index}
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke={`url(#grad${index})`}
              strokeWidth="4"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 18 18)"
            />
          );
        })}
        <text
          x="18"
          y="17"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-bold fill-current text-text-primary"
          style={{ fontSize: '8px' }}
        >
          {total}
        </text>
         <text
          x="18"
          y="21.5"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-current text-text-secondary"
          style={{ fontSize: '2.5px' }}
        >
          Total Cases
        </text>
      </svg>
      <div className="mt-6 w-full space-y-2">
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(0);
          return (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                <span className="text-text-secondary">{item.name}</span>
              </div>
              <span className="font-semibold text-text-primary">{item.value} ({percentage}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonutChart;