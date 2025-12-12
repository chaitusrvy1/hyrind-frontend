export enum UserRole {
  ADMIN = 'ADMIN',
  RECRUITER = 'RECRUITER',
  CANDIDATE = 'CANDIDATE',
  VISITOR = 'VISITOR'
}

export type DashboardView = 'dashboard' | 'candidates' | 'recruiters' | 'profile' | 'billing' | 'documents' | 'settings' | 'jobs';

export enum CandidateStatus {
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  ONBOARDING = 'ONBOARDING',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  PLACED = 'PLACED',
  REJECTED = 'REJECTED'
}

export interface IntakeDetails {
  phone: string;
  address: string;
  cgpa: string;
  graduationDate: string;
  targetRoles: string;
  skills: string;
  experienceYears: string;
  linkedInUrl: string;
  workAuthorization?: string;
  relocation?: boolean;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
}

export interface Payslip {
  id: string;
  date: string;
  amount: number;
  period: string;
  status: 'PAID' | 'PROCESSING';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  isActive: boolean;
  joinedDate: string;
}

export interface Candidate extends User {
  role: UserRole.CANDIDATE;
  status: CandidateStatus;
  university: string;
  degree: string;
  major: string;
  visaStatus: string;
  marketingStartDate?: string;
  assignedRecruiterId?: string;
  nextBillingDate?: string;
  subscriptionStatus: 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'NONE';
  planId?: string;
  intake: IntakeDetails;
}

export interface Recruiter extends User {
  role: UserRole.RECRUITER;
  specialization: string;
  bankDetails?: BankDetails;
  payslips: Payslip[];
  phone?: string;
}

export interface MarketingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface MetricData {
  name: string;
  value: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'PENDING' | 'VERIFIED';
}