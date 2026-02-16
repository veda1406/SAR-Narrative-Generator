
export type Role = 'Admin' | 'Analyst';

export type Theme = 'light' | 'dark';

export type AnalystView = 'DASHBOARD' | 'PROFILE' | 'CASES';

export interface User {
  username: string;
  password?: string; // Optional for security
  role: Role;
  name: string;
  profileImageUrl?: string;
}

export type WorkflowState =
  | 'IDLE'
  | 'INVESTIGATION'
  | 'DRAFTING_EDITING'
  | 'FINAL';

export interface Alert {
    id: string;
    caseId: string;
    riskScore: number;
    type: string;
    date: string;
}

export interface Transaction {
    id: string;
    date: string;
    counterparty: string;
    amount: number;
    type: 'Credit' | 'Debit';
}

export interface ActivityLog {
    id: string;
    timestamp: string;
    user: string;
    action: string;
    details: string;
    status: 'Approved' | 'Flagged' | 'In Progress';
}

export interface DonutChartData {
    name: string;
    value: number;
    color: string;
}
