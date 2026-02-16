
import React from 'react';

const NetworkGraph: React.FC = () => {
    const numNodes = 47;
    const center = { x: 200, y: 200 };
    const radius = 150;
    const nodes = [];

    for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * 2 * Math.PI;
        nodes.push({
            x: center.x + radius * Math.cos(angle),
            y: center.y + radius * Math.sin(angle),
        });
    }

    return (
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-lg mx-auto">
            <g>
                {/* Lines */}
                {nodes.map((node, i) => (
                    <line
                        key={`line-${i}`}
                        x1={center.x}
                        y1={center.y}
                        x2={node.x}
                        y2={node.y}
                        className="stroke-border"
                        strokeWidth="1"
                    />
                ))}
                {/* Central Node */}
                <circle cx={center.x} cy={center.y} r="20" className="fill-status-high" />
                <text x={center.x} y={center.y} textAnchor="middle" dy=".3em" className="fill-white" fontSize="10px" fontWeight="bold">
                    RG
                </text>
                {/* Surrounding Nodes */}
                {nodes.map((node, i) => (
                    <circle key={`node-${i}`} cx={node.x} cy={node.y} r="5" className="fill-brand-primary" />
                ))}
            </g>
        </svg>
    );
};

export default NetworkGraph;