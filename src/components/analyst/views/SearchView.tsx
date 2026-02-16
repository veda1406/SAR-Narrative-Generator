
import React, { useState, useMemo } from 'react';
import { SEARCH_RESULTS } from '../../../constants';

const cardStyle = "bg-surface/50 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl p-6";

const typologyColors: { [key: string]: string } = {
    'Structuring': 'bg-purple-100 dark:bg-purple-500/30 text-purple-800 dark:text-purple-200', // Example, can be themed
    'Mule Account': 'bg-orange-100 dark:bg-orange-500/30 text-orange-800 dark:text-orange-200', // Example
    'Cross-Border': 'bg-blue-100 dark:bg-blue-500/30 text-blue-800 dark:text-blue-200', // Example
    'Smurfing': 'bg-teal-100 dark:bg-teal-500/30 text-teal-800 dark:text-teal-200', // Example
    'Politically Exposed Person': 'bg-pink-100 dark:bg-pink-500/30 text-pink-800 dark:text-pink-200', // Example
};
const riskColors: { [key: string]: string } = {
    'High': 'bg-status-high-bg text-status-high',
    'Medium': 'bg-status-medium-bg text-status-medium',
    'Low': 'bg-status-low-bg text-status-low',
    'Critical': 'bg-status-high-bg text-status-high font-extrabold',
};

const QUICK_FILTERS = ['High Risk', 'Cross-Border', 'Politically Exposed Persons'];

const SearchView: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const handleFilterToggle = (filter: string) => {
        setActiveFilters(prev => 
            prev.includes(filter) 
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    const filteredResults = useMemo(() => {
        let results = [...SEARCH_RESULTS];

        // Apply search query
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            results = results.filter(item => 
                item.caseId.toLowerCase().includes(lowerCaseQuery) ||
                item.customer.toLowerCase().includes(lowerCaseQuery) ||
                item.typology.toLowerCase().includes(lowerCaseQuery)
            );
        }

        // Apply quick filters
        if (activeFilters.length > 0) {
            results = results.filter(item => {
                return activeFilters.every(filter => {
                    if (filter === 'High Risk') return item.risk === 'High' || item.risk === 'Critical';
                    if (filter === 'Cross-Border') return item.typology === 'Cross-Border';
                    if (filter === 'Politically Exposed Persons') return item.typology === 'Politically Exposed Person';
                    return true;
                });
            });
        }

        return results;
    }, [searchQuery, activeFilters]);


    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">Search & Discovery</h2>
            
            <div className={cardStyle}>
                <div className="relative">
                    <input 
                        type="text"
                        placeholder='Search by Entity, Txn ID, or Natural Language (e.g., "Transfers > 5 Lakhs to Dubai")'
                        className="w-full p-4 pl-12 text-lg bg-background border border-border rounded-lg focus:ring-brand-interactive focus:border-brand-interactive"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>
                <div className="mt-4 flex items-center space-x-3">
                    <span className="text-sm font-semibold text-text-secondary">Quick Filters:</span>
                    {QUICK_FILTERS.map(filter => {
                        const isActive = activeFilters.includes(filter);
                        return (
                            <button 
                                key={filter} 
                                onClick={() => handleFilterToggle(filter)}
                                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                                    isActive 
                                    ? 'bg-brand-interactive text-brand-interactive-text' 
                                    : 'bg-status-info-bg text-brand-primary hover:bg-border'
                                }`}
                            >
                                {filter}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className={`overflow-x-auto ${cardStyle}`}>
                <table className="min-w-full">
                    <thead className="bg-background">
                        <tr>
                            {['Case ID', 'Customer Name', 'Risk Level', 'Typology', 'Last Updated'].map(header => (
                                <th key={header} className="text-left py-3 px-4 uppercase font-semibold text-sm text-text-secondary">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-text-primary">
                        {filteredResults.length > 0 ? (
                            filteredResults.map(item => (
                                <tr key={item.id} className="border-b border-border hover:bg-background">
                                    <td className="py-3 px-4 font-mono text-brand-interactive">{item.caseId}</td>
                                    <td className="py-3 px-4">{item.customer}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${riskColors[item.risk]}`}>{item.risk}</span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-status-info-bg text-status-info`}>{item.typology}</span>
                                    </td>
                                    <td className="py-3 px-4">{item.updated}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-text-secondary">
                                    No results found. Try adjusting your search or filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchView;