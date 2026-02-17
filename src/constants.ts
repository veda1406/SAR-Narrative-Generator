
import type { User, Alert, Transaction, ActivityLog, DonutChartData } from './types';

export const MOCK_USERS: User[] = [
  { username: 'admin', password: 'admin123', role: 'Admin', name: 'Admin User' },
  { username: 'analyst', password: 'analyst123', role: 'Analyst', name: 'Priya S.', profileImageUrl: 'https://i.pravatar.cc/150?u=priya' },
];

export const PENDING_ALERTS: Alert[] = [
    { id: 'A001', caseId: '88291', riskScore: 95, type: 'Structuring', date: '2023-10-26' },
    { id: 'A002', caseId: '88292', riskScore: 88, type: 'Smurfing', date: '2023-10-25' },
    { id: 'A003', caseId: '88293', riskScore: 92, type: 'Unusual International Transfers', date: '2023-10-25' },
    { id: 'A004', caseId: '88294', riskScore: 85, type: 'Rapid Movement of Funds', date: '2023-10-24' },
];

export const SAR_DATA = {
    section1: {
        internalCaseId: "BAR-SAR-2023-88291",
        customerCif: "CUST-RG-47583",
        linkedAccountIds: "109283745, 109283746, 109283747",
        productType: "Savings / Current / Wealth / Corporate",
        customerRiskRating: "High",
        ncaGlossaryCode: "XXMLXX"
    },
    section2: {
        parties: [
            {
                name: "Rahul Gupta",
                dob: "15/05/1985",
                address: "B-402, Lotus Business Park, Goregaon East, Mumbai, 400063, India",
                contactDetails: "+91 98200 12345 / r.gupta.export@example.com",
                additionalDetails: "Sole proprietor of 'Gupta Global Trades'. High-frequency trader in textiles.",
                suspectedInvolvement: "Primary account holder and beneficiary of all transactions flagged for potential structuring. Directed the execution of multiple sub-threshold cash movements."
            }
        ]
    },
    section5: {
        reporterName: "Priya S.",
        contactNumber: "+91 22 4000 1234 (GFC-MUM)",
        dateOfReport: new Date().toLocaleDateString('en-GB'),
    },
    section6: {
        rationale: "AI G1 VERIFICATION AGENT: Narrative aligns with transactional data. Structuring pattern confirmed across 47 transactions. Risk score (95) exceeds threshold. Filing is mandatory."
    }
};


export const CASE_DETAILS = {
    subjectName: 'Rahul Gupta',
    kyc: {
        'Customer ID': 'CUST-RG-47583',
        'Date of Birth': '15/05/1985',
        'Nationality': 'Indian',
        'Occupation': 'Import/Export Business Owner',
        'Address': 'B-402, Lotus Business Park, Goregaon East, Mumbai, 400063, India',
        'Contact Details': '+91 98200 12345 / r.gupta.export@example.com',
        'Risk Profile': 'High',
        'Onboarding Date': '20/01/2021'
    },
    additionalDetails: 'Sole proprietor of "Gupta Global Trades". No previous criminal record in jurisdictional checks. High-frequency trader in textiles.',
    suspectedInvolvement: 'Primary account holder and beneficiary of all transactions flagged for potential structuring. Directed the execution of multiple sub-threshold cash movements.',
    transactions: [...Array(47)].map((_, i) => ({
        id: `TXN-${String(i + 1).padStart(2, '0')}`,
        date: `2023-10-${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}`,
        counterparty: `Entity-${String.fromCharCode(65 + i % 26)}${i}`,
        amount: parseFloat((Math.random() * (50000 - 5000) + 5000).toFixed(2)),
        type: i % 3 === 0 ? 'Credit' : 'Debit'
    } as Transaction))
};

export const RAW_JSON_DATA = JSON.stringify({
    subject: {
        name: CASE_DETAILS.subjectName,
        ...CASE_DETAILS.kyc
    },
    activitySummary: {
        period: 'October 1-25, 2023',
        totalDebits: 15_750_000,
        totalCredits: 4_500_000,
        unusualActivityFlags: ['Rapid succession of transactions', 'Transactions below reporting threshold', 'Use of multiple accounts']
    },
    transactions: CASE_DETAILS.transactions.slice(0, 5)
}, null, 2);

export const AI_NARRATIVE_G1 = `Between October 1, 2023, and October 25, 2023, the account of Rahul Gupta, an Import/Export Business Owner [Ref: KYC-01], was flagged for suspicious transactional patterns. An internal review identified 47 discrete cash transactions, comprising both deposits and withdrawals, which totaled INR 49.5L [Ref: TXN-01]. These movements were conducted across multiple branch locations and exhibited a systematic pattern of structuring, with individual amounts consistently maintained just below the INR 10,00,000 regulatory reporting threshold [Ref: TXN-02]. Following the aggregation of these cash holdings, the funds were rapidly transferred in their entirety to an offshore beneficiary, 'Global Trade Dubai' [Ref: TXN-03]. This sequence of sub-threshold cash activity followed by immediate international layering lacks legitimate commercial justification and is inconsistent with the subject's stated business profile [Ref: KYC-01]. The behavior strongly indicates an intent to evade AML reporting requirements and conceal the true origin and destination of funds.`;

export const CITATIONS = {
    'TXN-01': {
        description: 'Transaction Volume Summary',
        details: 'Identified 47 discrete cash transactions (deposits and withdrawals) totaling INR 49.5L between 01/10/2023 and 25/10/2023.'
    },
    'TXN-02': {
        description: 'Structuring Pattern Analysis',
        details: 'Pattern of cash deposits/withdrawals consistently ranging from INR 9,50,000 to INR 9,90,000, designed to avoid the INR 10,00,000 reporting threshold.'
    },
    'TXN-03': {
        description: 'Offshore Fund Layering',
        details: 'Immediate transfer of aggregated cash funds to "Global Trade Dubai" (UAE). Transfers executed within 24 hours of cash accumulations without corresponding invoices.'
    },
    'KYC-01': {
        description: 'Subject Profile Verification',
        details: 'Rahul Gupta (CUST-RG-47583). Occupation: Import/Export Business Owner. Risk Rating: High. Stated income does not align with identified cash volumes.'
    }
};

export const AUDIT_LOG = [
    { event: 'Alert Triggered', user: 'System', timestamp: '2023-10-26 08:00:12 UTC' },
    { event: 'Case Assigned to Priya S.', user: 'Admin User', timestamp: '2023-10-26 09:15:03 UTC' },
    { event: 'Investigation Started by AI Investigator', user: 'AI', timestamp: '2023-10-26 09:30:45 UTC' },
    { event: 'Narrative Draft Generated by AI Narrative Generator', user: 'AI', timestamp: '2023-10-26 10:05:22 UTC' },
];

export const WORKLOAD_DISTRIBUTION: DonutChartData[] = [
    { name: 'Drafting', value: 5, color: '#52A9E0' }, // Muted Blue
    { name: 'Review', value: 3, color: '#F0B429' }, // Muted Amber
    { name: 'Filed', value: 4, color: '#68D391' },  // Muted Green
];

export const SAR_FILING_VELOCITY = [5, 6, 8, 7, 9, 11, 10, 12, 14, 15, 13, 16, 18, 20, 22, 21, 23, 25, 28, 26, 29, 30, 32, 35, 33, 36];
export const TOP_TYPOLOGIES = [
    { name: 'Structuring', value: 45 },
    { name: 'Round Tripping', value: 25 },
    { name: 'Terror Financing', value: 12 },
    { name: 'Mule Accounts', value: 32 },
    { name: 'Trade-Based Laundering', value: 18 },
];
export const GEO_HOTSPOTS = {
    'UAE': 95, 'Singapore': 88, 'Hong Kong': 85, 'Mauritius': 75, 'UK': 60, 'USA': 55,
};

export const SKILL_MATRIX = {
    labels: ['Crypto', 'Trade Finance', 'KYC', 'Structuring', 'Sanctions', 'AML Tech'],
    values: [90, 75, 85, 95, 80, 92],
};

export const SEARCH_RESULTS = [
    { id: 'sr-1', caseId: 'C-88291', customer: 'Rahul Gupta', risk: 'High', typology: 'Structuring', updated: '2023-10-26' },
    { id: 'sr-2', caseId: 'C-88290', customer: 'Aarav Sharma', risk: 'Medium', typology: 'Mule Account', updated: '2023-10-25' },
    { id: 'sr-3', caseId: 'C-88289', customer: 'Saanvi Patel', risk: 'High', typology: 'Cross-Border', updated: '2023-10-25' },
    { id: 'sr-4', caseId: 'C-88288', customer: 'Vivaan Singh', risk: 'Low', typology: 'Smurfing', updated: '2023-10-24' },
    { id: 'sr-5', caseId: 'C-88287', customer: 'Anika Reddy', risk: 'Critical', typology: 'Politically Exposed Person', updated: '2023-10-24' },
    { id: 'sr-6', caseId: 'C-88285', customer: 'Reyansh Kumar', risk: 'Medium', typology: 'Structuring', updated: '2023-10-23' },
    { id: 'sr-7', caseId: 'C-88284', customer: 'Zoya Khan', risk: 'High', typology: 'Cross-Border', updated: '2023-10-22' }
];

export const RECENT_ACTIVITY: ActivityLog[] = [
    { id: 'act-1', timestamp: '2 mins ago', user: 'Priya S.', action: 'Case #88291 Approved', details: 'Approved and submitted for filing.', status: 'Approved' },
    { id: 'act-2', timestamp: '15 mins ago', user: 'System', action: 'System flagged Structuring', details: 'New case #88295 created. High risk score (96).', status: 'Flagged' },
    { id: 'act-3', timestamp: '45 mins ago', user: 'Admin User', action: 'Case #88294 Re-assigned', details: 'From Rohan to Priya S. due to specialty match.', status: 'In Progress' },
    { id: 'act-4', timestamp: '1 hour ago', user: 'Priya S.', action: 'Case #88290 In Review', details: 'Manual review started after draft.', status: 'In Progress' },
    { id: 'act-5', timestamp: '3 hours ago', user: 'System', action: 'System flagged Mule Account', details: 'New case #88294 created. Medium risk (85).', status: 'Flagged' },
];
