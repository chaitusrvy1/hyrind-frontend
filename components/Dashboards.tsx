import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { 
  Users, DollarSign, Activity, CheckCircle, AlertCircle, Clock, FileText, Download, Play, Pause, UploadCloud, Briefcase, Power, UserPlus, CreditCard, Star, Shield, Zap, Send, Phone, MapPin, Building, GraduationCap, Link, Lock, Bell, User
} from 'lucide-react';
import { Candidate, Recruiter, Document, CandidateStatus, UserRole, MarketingPlan, IntakeDetails, DashboardView } from '../types';
import { MOCK_DOCUMENTS, REVENUE_DATA, MARKETING_PLANS } from '../constants';

// --- Shared Components ---

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      {trend && <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">↑ {trend} vs last month</p>}
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    APPROVED: 'bg-green-100 text-green-700',
    ACTIVE: 'bg-blue-100 text-blue-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    SUBMITTED: 'bg-yellow-50 text-yellow-600',
    PAUSED: 'bg-orange-100 text-orange-700',
    REJECTED: 'bg-red-100 text-red-700',
    ONBOARDING: 'bg-purple-100 text-purple-700',
    PAST_DUE: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

const SettingsView = () => {
    return (
        <div className="max-w-4xl bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Account Settings</h3>
                <p className="text-slate-500 text-sm">Manage your password and preferences</p>
            </div>
            <div className="p-6 space-y-8">
                <div className="max-w-md">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Lock size={18} /> Change Password</h4>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Password updated!'); }}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                            <input type="password" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                            <input type="password" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                            <input type="password" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                        </div>
                        <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800">Update Password</button>
                    </form>
                </div>
                
                <div className="border-t border-slate-100 pt-6">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Bell size={18} /> Notifications</h4>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-600 rounded" />
                            <span className="text-slate-700 text-sm">Email me when jobs are applied</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-600 rounded" />
                            <span className="text-slate-700 text-sm">Email me about billing updates</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" />
                            <span className="text-slate-700 text-sm">Receive marketing newsletters</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Admin Dashboard ---

interface AdminDashboardProps {
  view: DashboardView;
  candidates: Candidate[];
  recruiters: Recruiter[];
  onToggleStatus: (id: string, role: UserRole) => void;
  onAssignRecruiter: (candidateId: string, recruiterId: string) => void;
  onSendPaymentLink: (candidateId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ view, candidates, recruiters, onToggleStatus, onAssignRecruiter, onSendPaymentLink }) => {
  const activeCandidates = candidates.filter(c => c.isActive && c.status === CandidateStatus.ACTIVE).length;
  const totalRevenue = candidates.filter(c => c.subscriptionStatus === 'ACTIVE').reduce((acc, curr) => {
    const plan = MARKETING_PLANS.find(p => p.id === curr.planId);
    return acc + (plan?.price || 0);
  }, 0);

  if (view === 'settings') return <SettingsView />;

  if (view === 'billing') {
      return (
          <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Financial Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                      <h4 className="text-lg font-bold mb-4">Revenue Trend</h4>
                      <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                             <AreaChartComponent data={REVENUE_DATA} />
                         </ResponsiveContainer>
                      </div>
                  </div>
                   <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                      <h4 className="text-lg font-bold mb-4">Subscription Distribution</h4>
                      <div className="space-y-4">
                          <div className="flex justify-between items-center">
                              <span>Basic Plan</span>
                              <span className="font-bold">12 Users</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-blue-500 h-2 rounded-full w-1/4"></div></div>
                          
                          <div className="flex justify-between items-center">
                              <span>Pro Plan</span>
                              <span className="font-bold">45 Users</span>
                          </div>
                           <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-brand-600 h-2 rounded-full w-3/4"></div></div>

                           <div className="flex justify-between items-center">
                              <span>Premium Plan</span>
                              <span className="font-bold">8 Users</span>
                          </div>
                           <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-indigo-600 h-2 rounded-full w-1/6"></div></div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  // Recruiters View
  if (view === 'recruiters') {
      return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Manage Recruiters</h3>
          </div>
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-6 py-3">Recruiter</th>
                <th className="px-6 py-3">Specialization</th>
                <th className="px-6 py-3">Joined Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recruiters.map((recruiter) => (
                <tr key={recruiter.id} className="hover:bg-slate-50">
                   <td className="px-6 py-4 font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                      <img src={recruiter.avatarUrl} className="w-8 h-8 rounded-full" alt="" />
                      {recruiter.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">{recruiter.specialization}</td>
                  <td className="px-6 py-4">{recruiter.joinedDate}</td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded text-xs font-medium ${recruiter.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {recruiter.isActive ? 'Available' : 'Unavailable'}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onToggleStatus(recruiter.id, UserRole.RECRUITER)}
                      className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${recruiter.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                    >
                      <Power size={12} /> {recruiter.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }

  // Candidates View
  if (view === 'candidates') {
      return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Manage Candidates</h3>
            <div className="flex gap-2">
              <input type="text" placeholder="Search..." className="px-4 py-2 text-sm border border-slate-300 rounded-lg" />
            </div>
          </div>
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Subscription</th>
                <th className="px-6 py-3">Assign Recruiter</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                      <img src={candidate.avatarUrl} className="w-8 h-8 rounded-full" alt="" />
                      {candidate.name}
                    </div>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={candidate.status} /></td>
                  <td className="px-6 py-4">
                     {candidate.subscriptionStatus === 'ACTIVE' ? (
                       <span className="text-green-600 font-medium text-xs flex items-center gap-1"><CheckCircle size={12} /> Active</span>
                     ) : (
                       <div className="flex items-center gap-2">
                          <span className="text-red-500 text-xs font-medium">{candidate.subscriptionStatus}</span>
                          <button onClick={() => onSendPaymentLink(candidate.id)} title="Send Payment Link" className="text-brand-600 hover:bg-brand-50 p-1 rounded">
                             <Link size={14} />
                          </button>
                       </div>
                     )}
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      className="border border-slate-300 rounded px-2 py-1 text-xs"
                      value={candidate.assignedRecruiterId || ''}
                      onChange={(e) => onAssignRecruiter(candidate.id, e.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {recruiters.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onToggleStatus(candidate.id, UserRole.CANDIDATE)}
                      className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${candidate.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                    >
                      <Power size={12} /> {candidate.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }

  // Default Dashboard View
  return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Candidates" value={candidates.length} icon={Users} color="bg-blue-500" trend="12%" />
            <StatCard title="Active Marketing" value={activeCandidates} icon={Activity} color="bg-green-500" trend="8%" />
            <StatCard title="Total Recruiters" value={recruiters.length} icon={Briefcase} color="bg-orange-500" />
            <StatCard title="Monthly Revenue" value={`$${totalRevenue}`} icon={DollarSign} color="bg-indigo-500" trend="15%" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
                <select className="text-sm border-slate-300 rounded-md shadow-sm">
                  <option>Year to Date</option>
                </select>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChartComponent data={REVENUE_DATA} />
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
               <h3 className="text-lg font-bold text-slate-900 mb-4">Platform Health</h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-600">Server Status</span>
                   <span className="text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14}/> Operational</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-600">Pending Approvals</span>
                   <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold">3</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-600">Active Subscriptions</span>
                   <span className="text-slate-900 font-medium">{candidates.filter(c => c.subscriptionStatus === 'ACTIVE').length}</span>
                 </div>
               </div>
            </div>
          </div>
        </>
  );
};

// --- Recruiter Dashboard ---

interface RecruiterDashboardProps {
  view: DashboardView;
  recruiter: Recruiter;
  candidates: Candidate[];
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ view, recruiter, candidates }) => {
  const myCandidates = candidates.filter(c => c.assignedRecruiterId === recruiter.id && c.isActive);

  if (view === 'settings') return <SettingsView />;

  if (view === 'profile') {
      return (
         <div className="max-w-3xl bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 mb-6">Recruiter Profile & Bank Details</h3>
             <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Profile Saved!')}}>
                <div className="grid grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input type="text" defaultValue={recruiter.name} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <input type="text" defaultValue={recruiter.phone} placeholder="+1 ..." className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input type="email" defaultValue={recruiter.email} disabled className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-lg text-slate-500" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Specialization</label>
                      <input type="text" defaultValue={recruiter.specialization} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                   </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                   <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><CreditCard size={18}/> Bank Account for Salary</h4>
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Bank Name</label>
                         <input type="text" defaultValue={recruiter.bankDetails?.bankName} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Account Holder</label>
                         <input type="text" defaultValue={recruiter.bankDetails?.accountName} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Routing Number</label>
                         <input type="text" defaultValue={recruiter.bankDetails?.routingNumber} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
                         <input type="password" defaultValue={recruiter.bankDetails?.accountNumber} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                      </div>
                   </div>
                </div>
                <button type="submit" className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700">Save Changes</button>
             </form>
         </div>
      );
  }

  if (view === 'billing') {
      return (
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">Salary & Payslips</h3></div>
             <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                   <tr>
                      <th className="px-6 py-3">Period</th>
                      <th className="px-6 py-3">Date Processed</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {recruiter.payslips.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No payslips generated yet.</td></tr>
                   ) : (
                     recruiter.payslips.map(slip => (
                        <tr key={slip.id} className="hover:bg-slate-50">
                           <td className="px-6 py-4 font-medium text-slate-900">{slip.period}</td>
                           <td className="px-6 py-4">{slip.date}</td>
                           <td className="px-6 py-4 font-medium">${slip.amount.toLocaleString()}</td>
                           <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">{slip.status}</span></td>
                           <td className="px-6 py-4"><button className="text-brand-600 hover:underline flex items-center gap-1"><Download size={14}/> Download PDF</button></td>
                        </tr>
                     ))
                   )}
                </tbody>
             </table>
         </div>
      );
  }

  // Default Candidates View
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Welcome, {recruiter.name}</h2>
           <p className="text-slate-500">You have {myCandidates.length} active candidates assigned.</p>
        </div>
        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700">
           + Log Daily Activity
        </button>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {myCandidates.length === 0 ? (
            <div className="col-span-3 bg-white p-12 text-center rounded-xl border border-slate-200 border-dashed">
              <Users size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No Candidates Assigned</h3>
            </div>
          ) : (
            myCandidates.map(candidate => (
              <div key={candidate.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${candidate.subscriptionStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div className="flex justify-between items-start mb-4 pl-3">
                    <div className="flex items-center gap-3">
                        <img src={candidate.avatarUrl} className="w-12 h-12 rounded-full" alt="" />
                        <div>
                          <h4 className="font-bold text-slate-900">{candidate.name}</h4>
                          <p className="text-xs text-slate-500">{candidate.major}</p>
                        </div>
                    </div>
                    <StatusBadge status={candidate.status} />
                  </div>
                  <div className="flex gap-2 pl-3 mt-6">
                    <button className="flex-1 bg-slate-50 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 border border-slate-200">View Profile</button>
                  </div>
              </div>
            ))
          )}
        </div>
    </div>
  );
}

// --- Candidate Dashboard ---

interface CandidateDashboardProps {
  view: DashboardView;
  candidate: Candidate;
  onUpdateSubscription: (candidateId: string, planId: string) => void;
  onUpdateProfile: (candidateId: string, data: Partial<IntakeDetails>) => void;
  onUploadDoc: (candidateId: string, file: any) => void;
}

export const CandidateDashboard: React.FC<CandidateDashboardProps> = ({ view, candidate, onUpdateSubscription, onUpdateProfile, onUploadDoc }) => {
  const [showPlanSelection, setShowPlanSelection] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<MarketingPlan | null>(null);

  const currentPlan = MARKETING_PLANS.find(p => p.id === candidate.planId);
  const needsPlan = candidate.subscriptionStatus === 'NONE' || candidate.subscriptionStatus === 'CANCELED';

  const handlePlanSelect = (plan: MarketingPlan) => {
    setSelectedPlanForPayment(plan);
  };

  const handlePaymentSuccess = () => {
    if (selectedPlanForPayment) {
      onUpdateSubscription(candidate.id, selectedPlanForPayment.id);
      setSelectedPlanForPayment(null);
      setShowPlanSelection(false);
      alert('Payment Successful! Subscription Active.');
    }
  };

  const handleIntakeSave = (e: React.FormEvent) => {
     e.preventDefault();
     // In a real Django app, you would gather all form fields here and send them via API
     alert('Profile Intake Updated Successfully');
  };

  if (view === 'settings') return <SettingsView />;

  if (view === 'profile') {
      return (
         <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Candidate Intake Form</h3>
            <p className="text-slate-500 mb-6">Please complete your profile to help recruiters market you better.</p>
            <form onSubmit={handleIntakeSave} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                     <input type="text" defaultValue={candidate.intake?.phone} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label>
                     <input type="text" defaultValue={candidate.intake?.linkedInUrl} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Graduation Date</label>
                     <input type="date" defaultValue={candidate.intake?.graduationDate} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">CGPA</label>
                     <input type="text" defaultValue={candidate.intake?.cgpa} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-slate-700 mb-1">Current Address</label>
                     <input type="text" defaultValue={candidate.intake?.address} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-slate-700 mb-1">Target Roles</label>
                     <input type="text" defaultValue={candidate.intake?.targetRoles} placeholder="e.g. Java Developer, Data Analyst" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-slate-700 mb-1">Key Skills</label>
                     <textarea defaultValue={candidate.intake?.skills} rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg"></textarea>
                  </div>
               </div>
               <button type="submit" className="bg-brand-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-700">Save Profile</button>
            </form>
         </div>
      );
  }

  if (view === 'billing') {
      return (
         <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Billing Overview</h3>
            {currentPlan ? (
               <div className="bg-slate-900 text-white p-6 rounded-xl flex justify-between items-center shadow-lg">
                  <div>
                     <p className="text-slate-400 text-sm mb-1">Current Plan</p>
                     <h2 className="text-2xl font-bold">{currentPlan.name}</h2>
                     <p className="text-slate-300 mt-2">${currentPlan.price} / {currentPlan.interval}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-slate-400 text-sm mb-1">Status</p>
                     <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">ACTIVE</span>
                     <p className="text-sm text-slate-400 mt-2">Next Billing: {candidate.nextBillingDate}</p>
                  </div>
               </div>
            ) : (
               <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 text-orange-800">
                  You do not have an active plan. Please select one to start marketing.
               </div>
            )}
            
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-900">Payment History</div>
               <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                     <tr><th className="px-6 py-3">Date</th><th className="px-6 py-3">Amount</th><th className="px-6 py-3">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {/* Mock History */}
                     {currentPlan && (
                       <tr><td className="px-6 py-4">2023-11-01</td><td className="px-6 py-4">${currentPlan.price}</td><td className="px-6 py-4 text-green-600 font-bold">Paid</td></tr>
                     )}
                     <tr><td className="px-6 py-4" colSpan={3}>No other records found.</td></tr>
                  </tbody>
               </table>
            </div>
            
            <button onClick={() => setShowPlanSelection(true)} className="w-full py-3 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50">Change Plan</button>
            
             {/* Plan Selection Modal */}
            {(showPlanSelection || needsPlan) && !selectedPlanForPayment && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-4xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-900">Select a Marketing Plan</h3>
                        {needsPlan || <button onClick={() => setShowPlanSelection(false)} className="text-slate-500">Close</button>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {MARKETING_PLANS.map(plan => (
                        <div key={plan.id} className={`border p-6 rounded-xl flex flex-col ${plan.recommended ? 'border-brand-500 shadow-lg' : 'border-slate-200'}`}>
                            <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                            <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                            <div className="text-3xl font-bold mb-6">${plan.price}<span className="text-sm font-normal">/mo</span></div>
                            <button onClick={() => handlePlanSelect(plan)} className="mt-auto w-full bg-slate-900 text-white py-2 rounded-lg font-bold hover:bg-slate-800">Select</button>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {selectedPlanForPayment && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-white rounded-2xl w-full max-w-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Confirm Subscription</h3>
                        <button onClick={() => setSelectedPlanForPayment(null)} className="text-slate-400">✕</button>
                    </div>
                    <p className="mb-4">You are subscribing to <strong>{selectedPlanForPayment.name}</strong> for <strong>${selectedPlanForPayment.price}/mo</strong>.</p>
                    <div className="bg-slate-100 p-4 rounded-lg mb-4 text-sm text-slate-500">
                        Secure Payment Gateway Mockup
                    </div>
                    <button onClick={handlePaymentSuccess} className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700">Pay Now</button>
                </div>
                </div>
            )}
         </div>
      );
  }

  if (view === 'documents') {
      return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">My Documents</h3>
            <label className="flex items-center gap-2 text-sm text-brand-600 font-medium hover:bg-brand-50 px-3 py-2 rounded-lg transition-colors cursor-pointer">
                <UploadCloud size={16} /> Upload New
                <input type="file" className="hidden" onChange={(e) => onUploadDoc(candidate.id, e.target.files?.[0])} />
            </label>
            </div>
            <div className="space-y-4">
            {MOCK_DOCUMENTS.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500"><FileText size={20} /></div>
                        <div><p className="font-medium text-slate-900">{doc.name}</p><p className="text-xs text-slate-500">{doc.type}</p></div>
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">{doc.status}</span>
                </div>
            ))}
            </div>
        </div>
      )
  }

  // Default Dashboard View
  return (
    <div className="max-w-5xl mx-auto space-y-8">
            {/* Onboarding Progress (Only if onboarding) */}
            {candidate.status === CandidateStatus.ONBOARDING && (
               <div className="bg-brand-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl mb-8">
                  <div className="relative z-10">
                     <h2 className="text-2xl font-bold mb-2">Welcome to HYRIND!</h2>
                     <p className="text-brand-100 mb-6 max-w-xl">Complete your onboarding steps to start the marketing process.</p>
                     <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold"><CheckCircle size={14}/></div><span className="font-medium text-brand-100">Profile</span></div>
                        <div className="w-8 h-0.5 bg-brand-700"></div>
                        <div className="flex items-center gap-2"><div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${candidate.status === 'ONBOARDING' ? 'bg-white text-brand-900 animate-pulse' : 'bg-brand-700'}`}>2</div><span className="font-medium text-white">Docs</span></div>
                        <div className="w-8 h-0.5 bg-brand-700"></div>
                        <div className="flex items-center gap-2"><div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${needsPlan ? 'bg-brand-700 border-2 border-brand-400' : 'bg-brand-700'}`}>3</div><span className="font-medium text-brand-300">Plan</span></div>
                     </div>
                  </div>
               </div>
            )}
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-left">
                            <Briefcase className="text-brand-600 mb-2" />
                            <div className="font-semibold text-slate-900">View Jobs</div>
                            <div className="text-xs text-slate-500">See recommended roles</div>
                        </button>
                         <button className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-left">
                            <Clock className="text-orange-500 mb-2" />
                            <div className="font-semibold text-slate-900">Pending Tasks</div>
                            <div className="text-xs text-slate-500">2 items need attention</div>
                        </button>
                    </div>
                  </div>
               </div>

               {/* Right Rail */}
               <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                     <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Your Recruiter</h3>
                     {candidate.assignedRecruiterId ? (
                       <div className="text-center">
                          <img src="https://picsum.photos/201/201" className="w-20 h-20 rounded-full mx-auto mb-3" alt="Recruiter" />
                          <h4 className="font-bold text-slate-900">Sarah Jenkins</h4>
                          <button className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-slate-800 mt-4">Message</button>
                       </div>
                     ) : (
                       <div className="text-center py-6 text-slate-500"><p>No recruiter assigned yet.</p></div>
                     )}
                  </div>
                  
                  {needsPlan && <button onClick={() => setShowPlanSelection(true)} className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-brand-200 animate-pulse">Select Marketing Plan</button>}
               </div>
            </div>
    </div>
  );
}

// Helper components
const AreaChartComponent = ({ data }: { data: any[] }) => (
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
        <Tooltip contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{r: 6}} />
    </LineChart>
);