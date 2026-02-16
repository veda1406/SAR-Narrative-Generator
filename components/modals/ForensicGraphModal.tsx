import React from 'react';

interface ForensicGraphModalProps {
  onClose: () => void;
}

const ForensicGraphModal: React.FC<ForensicGraphModalProps> = ({ onClose }) => {
    const numNodes = 40;
    const center = { x: 250, y: 200 };
    const radius = 150;
    const nodes = Array.from({ length: numNodes }, (_, i) => {
        const angle = (i / numNodes) * 2 * Math.PI + (Math.random() - 0.5) * 0.1;
        const r = radius * (0.8 + Math.random() * 0.4);
        return {
            x: center.x + r * Math.cos(angle),
            y: center.y + r * Math.sin(angle),
        };
    });

    return (
        <div className="fixed inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-elevated-surface border border-brand-interactive/50 rounded-lg shadow-2xl w-full max-w-3xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-light text-text-secondary hover:text-text-primary">&times;</button>
                <h2 className="text-xl font-bold text-brand-interactive text-center">Forensic Graph View</h2>
                <p className="text-center text-sm text-text-secondary mb-4">Detected Pattern: Fan-Out / Smurfing</p>
                <svg viewBox="0 0 500 400" className="w-full h-auto">
                    {nodes.map((node, i) => (
                        <line key={`line-${i}`} x1={center.x} y1={center.y} x2={node.x} y2={node.y} className="stroke-border" strokeWidth="0.5" />
                    ))}
                    <circle cx={center.x} cy={center.y} r="25" className="fill-brand-interactive stroke-brand-primary" strokeWidth="2" />
                    <text x={center.x} y={center.y} textAnchor="middle" dy=".3em" className="fill-brand-interactive-text" fontSize="10px" fontWeight="bold">Suspect</text>
                    {nodes.map((node, i) => (
                        <circle key={`node-${i}`} cx={node.x} cy={node.y} r="6" className="fill-status-high" />
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default ForensicGraphModal;