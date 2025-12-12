import React, { useState, useEffect } from 'react';
import { User, UserRole, Candidate, Recruiter, CandidateStatus, IntakeDetails, DashboardView } from './types';
import { MOCK_ADMIN, MOCK_RECRUITERS_LIST, MOCK_CANDIDATES_LIST, MARKETING_PLANS } from './constants';
import { Layout } from './components/Layout';
import { LandingPage, InterestForm, RegisterPage } from './components/PublicPages';
import { AdminDashboard, CandidateDashboard, RecruiterDashboard } from './components/Dashboards';

// Simple Hash Router Implementation for SPA feel without heavy libs
const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [route, setRoute] = useState<string>('landing');
  
  // Dashboard internal navigation state
  const [currentView, setCurrentView] = useState<DashboardView>('dashboard');
  
  // App State - Centralized Source of Truth
  // NOTE: In a real Django app, these would be managed by React Query / Redux and fetched from API
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES_LIST);
  const [recruiters, setRecruiters] = useState<Recruiter[]>(MOCK_RECRUITERS_LIST);

  // Initialize router from hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'landing';
      setRoute(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Init
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const handleDashboardNavigate = (view: DashboardView) => {
      setCurrentView(view);
  };

  // Auth Logic
  const handleLogin = (role: UserRole) => {
    // In a real app, this would fetch from backend. Here we simulate logged in user.
    if (role === UserRole.ADMIN) setUser(MOCK_ADMIN);
    // Find the first matching role in our state to simulate "real" login
    if (role === UserRole.RECRUITER) setUser(recruiters[0]);
    if (role === UserRole.CANDIDATE) setUser(candidates[0]);
    
    // Reset view to dashboard on login
    setCurrentView('dashboard');
    navigate('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('landing');
  };

  // --- DATA SERVICE LAYER (Mocks for Django Backend) ---

  const toggleUserStatus = (userId: string, role: UserRole) => {
    // API Call: POST /api/admin/toggle-status
    if (role === UserRole.CANDIDATE) {
      setCandidates(prev => prev.map(c => c.id === userId ? { ...c, isActive: !c.isActive } : c));
    } else if (role === UserRole.RECRUITER) {
      setRecruiters(prev => prev.map(r => r.id === userId ? { ...r, isActive: !r.isActive } : r));
    }
  };

  const assignRecruiter = (candidateId: string, recruiterId: string) => {
    // API Call: POST /api/admin/assign-recruiter
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, assignedRecruiterId: recruiterId } : c));
  };

  const updateSubscription = (candidateId: string, planId: string) => {
    // API Call: POST /api/payments/subscribe
    setCandidates(prev => prev.map(c => {
      if (c.id !== candidateId) return c;
      const plan = MARKETING_PLANS.find(p => p.id === planId);
      // Simulate successful payment and activation
      return {
        ...c,
        planId: planId,
        subscriptionStatus: 'ACTIVE',
        status: c.status === CandidateStatus.ONBOARDING ? CandidateStatus.ACTIVE : c.status, 
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // +30 days
      };
    }));
    // If the currently logged in user is the candidate, update their session object too
    if (user?.id === candidateId) {
       const updatedCandidate = candidates.find(c => c.id === candidateId);
       if(updatedCandidate) setUser({ ...updatedCandidate, planId, subscriptionStatus: 'ACTIVE' } as any);
    }
  };

  const updateProfileIntake = (candidateId: string, data: Partial<IntakeDetails>) => {
     // API Call: PUT /api/candidates/{id}/intake
     setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, intake: { ...c.intake, ...data } } : c));
  };

  const uploadDocument = (candidateId: string, file: any) => {
     // API Call: POST /api/documents/upload
     alert(`Uploaded ${file.name} successfully! (Mock)`);
  };

  const sendPaymentLink = (candidateId: string) => {
     // API Call: POST /api/admin/trigger-payment
     const c = candidates.find(x => x.id === candidateId);
     if (c) alert(`Payment link sent to ${c.email}`);
  };

  // Login Page Component (Internal)
  const LoginPage = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-100">
        <div className="p-8 text-center border-b border-slate-50">
           <div className="w-12 h-12 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">H</div>
           <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
           <p className="text-slate-500 mt-2">Sign in to manage your placement journey.</p>
        </div>
        
        <div className="p-8 space-y-4">
          <p className="text-xs text-center text-slate-400 uppercase tracking-widest font-semibold mb-4">Select a Demo Role</p>
          
          <button 
            onClick={() => handleLogin(UserRole.ADMIN)}
            className="w-full p-4 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50 transition-all flex items-center gap-4 text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">A</div>
            <div>
              <p className="font-bold text-slate-900 group-hover:text-brand-700">Admin</p>
              <p className="text-xs text-slate-500">Full control & management</p>
            </div>
          </button>

          <button 
            onClick={() => handleLogin(UserRole.RECRUITER)}
            className="w-full p-4 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50 transition-all flex items-center gap-4 text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">R</div>
            <div>
              <p className="font-bold text-slate-900 group-hover:text-brand-700">Recruiter</p>
              <p className="text-xs text-slate-500">Candidate marketing view</p>
            </div>
          </button>

          <button 
            onClick={() => handleLogin(UserRole.CANDIDATE)}
            className="w-full p-4 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50 transition-all flex items-center gap-4 text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">C</div>
            <div>
              <p className="font-bold text-slate-900 group-hover:text-brand-700">Candidate</p>
              <p className="text-xs text-slate-500">Profile & Subscription</p>
            </div>
          </button>
        </div>
        
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
           <button onClick={() => navigate('register')} className="text-brand-600 font-medium hover:underline text-sm mr-4">Sign Up</button>
           <button onClick={() => navigate('landing')} className="text-sm text-slate-500 hover:text-brand-600">Back to Home</button>
        </div>
      </div>
    </div>
  );

  // Routing Logic
  if (route === 'landing') return <LandingPage onNavigate={navigate} />;
  if (route === 'interest') return <InterestForm onNavigate={navigate} />;
  if (route === 'register') return <RegisterPage onNavigate={navigate} />;
  if (route === 'login') return <LoginPage />;

  // Protected Routes
  if (route === 'dashboard') {
    if (!user) {
        setTimeout(() => navigate('login'), 0);
        return null;
    }

    return (
      <Layout user={user} currentView={currentView} onNavigate={handleDashboardNavigate} onLogout={handleLogout}>
        {user.role === UserRole.ADMIN && (
          <AdminDashboard 
            view={currentView}
            candidates={candidates} 
            recruiters={recruiters} 
            onToggleStatus={toggleUserStatus}
            onAssignRecruiter={assignRecruiter}
            onSendPaymentLink={sendPaymentLink}
          />
        )}
        {user.role === UserRole.RECRUITER && (
          <RecruiterDashboard 
            view={currentView}
            recruiter={user as Recruiter}
            candidates={candidates}
          />
        )}
        {user.role === UserRole.CANDIDATE && (
          <CandidateDashboard 
            view={currentView}
            candidate={candidates.find(c => c.id === user.id) || (user as Candidate)} 
            onUpdateSubscription={updateSubscription}
            onUpdateProfile={updateProfileIntake}
            onUploadDoc={uploadDocument}
          />
        )}
      </Layout>
    );
  }

  return <LandingPage onNavigate={navigate} />;
};

export default App;