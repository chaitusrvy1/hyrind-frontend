import { UserRole, CandidateStatus, Candidate, Recruiter, Document, MarketingPlan } from './types';

export const MARKETING_PLANS: MarketingPlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic Placement',
    price: 150,
    interval: 'month',
    description: 'Essential marketing for self-starters.',
    features: ['Resume Review', 'Weekly Job List', 'Email Support', '1 Mock Interview/mo']
  },
  {
    id: 'plan-pro',
    name: 'Pro Aggressive',
    price: 300,
    interval: 'month',
    description: 'Dedicated recruiter attention and aggressive marketing.',
    recommended: true,
    features: ['Dedicated Recruiter', 'Daily Submission Logs', 'Unlimited Mock Interviews', 'Priority Vendor List', 'Visa Guidance']
  },
  {
    id: 'plan-premium',
    name: 'Guaranteed Results',
    price: 500,
    interval: 'month',
    description: 'Full-service handling until placement.',
    features: ['Senior Recruiter Lead', 'Direct Client Access', 'Proxy Interview Support', '24/7 Support', 'Placement Guarantee*']
  }
];

export const MOCK_ADMIN = {
  id: 'admin-1',
  name: 'System Admin',
  email: 'admin@hyrind.com',
  role: UserRole.ADMIN,
  isActive: true,
  joinedDate: '2023-01-01',
  avatarUrl: 'https://picsum.photos/200/200'
};

export const MOCK_RECRUITERS_LIST: Recruiter[] = [
  {
    id: 'rec-1',
    name: 'Sarah Jenkins',
    email: 'sarah@hyrind.com',
    role: UserRole.RECRUITER,
    specialization: 'Java / Full Stack',
    isActive: true,
    joinedDate: '2023-03-15',
    avatarUrl: 'https://picsum.photos/201/201',
    phone: '+1 (555) 012-3456',
    bankDetails: {
      bankName: 'Chase Bank',
      accountName: 'Sarah Jenkins',
      accountNumber: '****8899',
      routingNumber: '****1234'
    },
    payslips: [
      { id: 'pay-1', date: '2023-10-31', amount: 4500, period: 'Oct 2023', status: 'PAID' },
      { id: 'pay-2', date: '2023-09-30', amount: 4500, period: 'Sep 2023', status: 'PAID' },
    ]
  },
  {
    id: 'rec-2',
    name: 'David Miller',
    email: 'david.m@hyrind.com',
    role: UserRole.RECRUITER,
    specialization: 'Data Science / AI',
    isActive: true,
    joinedDate: '2023-06-10',
    avatarUrl: 'https://picsum.photos/206/206',
    payslips: []
  }
];

const DEFAULT_INTAKE = {
  phone: '',
  address: '',
  cgpa: '',
  graduationDate: '',
  targetRoles: '',
  skills: '',
  experienceYears: '',
  linkedInUrl: ''
};

export const MOCK_CANDIDATE: Candidate = {
  id: 'cand-1',
  name: 'Rahul Sharma',
  email: 'rahul.s@university.edu',
  role: UserRole.CANDIDATE,
  status: CandidateStatus.ONBOARDING,
  university: 'Northeastern University',
  degree: 'Masters',
  major: 'Computer Science',
  visaStatus: 'F-1 OPT',
  subscriptionStatus: 'NONE',
  isActive: true,
  joinedDate: '2023-10-20',
  avatarUrl: 'https://picsum.photos/202/202',
  intake: { ...DEFAULT_INTAKE, phone: '555-0199' }
};

export const MOCK_CANDIDATES_LIST: Candidate[] = [
  MOCK_CANDIDATE,
  {
    id: 'cand-2',
    name: 'Emily Chen',
    email: 'emily.c@nyu.edu',
    role: UserRole.CANDIDATE,
    status: CandidateStatus.ACTIVE,
    university: 'NYU',
    degree: 'Masters',
    major: 'Data Science',
    visaStatus: 'H1-B Transfer',
    subscriptionStatus: 'ACTIVE',
    planId: 'plan-pro',
    marketingStartDate: '2023-11-01',
    nextBillingDate: '2023-12-01',
    assignedRecruiterId: 'rec-1',
    isActive: true,
    joinedDate: '2023-09-01',
    avatarUrl: 'https://picsum.photos/203/203',
    intake: { ...DEFAULT_INTAKE, skills: 'Python, SQL, Tableau', targetRoles: 'Data Scientist' }
  },
  {
    id: 'cand-3',
    name: 'Michael Ross',
    email: 'm.ross@usc.edu',
    role: UserRole.CANDIDATE,
    status: CandidateStatus.SUBMITTED,
    university: 'USC',
    degree: 'Masters',
    major: 'Business Analytics',
    visaStatus: 'F-1 OPT',
    subscriptionStatus: 'NONE',
    isActive: false, // Inactive user
    joinedDate: '2023-10-22',
    avatarUrl: 'https://picsum.photos/204/204',
    intake: DEFAULT_INTAKE
  },
  {
    id: 'cand-4',
    name: 'Priya Patel',
    email: 'p.patel@utdallas.edu',
    role: UserRole.CANDIDATE,
    status: CandidateStatus.PAUSED,
    university: 'UT Dallas',
    degree: 'Masters',
    major: 'Information Systems',
    visaStatus: 'F-1 OPT',
    subscriptionStatus: 'PAST_DUE',
    planId: 'plan-basic',
    marketingStartDate: '2023-09-15',
    nextBillingDate: '2023-10-15',
    assignedRecruiterId: 'rec-1',
    isActive: true,
    joinedDate: '2023-08-15',
    avatarUrl: 'https://picsum.photos/205/205',
    intake: DEFAULT_INTAKE
  }
];

export const MOCK_DOCUMENTS: Document[] = [
  { id: 'doc-1', name: 'Resume_V1.pdf', type: 'Resume', uploadDate: '2023-10-25', status: 'VERIFIED' },
  { id: 'doc-2', name: 'Passport_Copy.jpg', type: 'Identification', uploadDate: '2023-10-26', status: 'VERIFIED' },
  { id: 'doc-3', name: 'OPT_Card.png', type: 'Visa Document', uploadDate: '2023-10-26', status: 'PENDING' },
];

export const REVENUE_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 5400 },
];
