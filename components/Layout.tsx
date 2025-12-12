import React from 'react';
import { User, UserRole, DashboardView } from '../types';
import { LogOut, LayoutDashboard, Users, CreditCard, FileText, Briefcase, Settings, Bell, Shield } from 'lucide-react';

interface LayoutProps {
  user: User;
  currentView: DashboardView;
  onNavigate: (view: DashboardView) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors text-left ${
      active ? 'bg-brand-50 text-brand-700 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ user, currentView, onNavigate, onLogout, children }) => {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10 hidden md:flex">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-md flex items-center justify-center text-white font-bold text-xl">H</div>
            <span className="text-xl font-bold text-slate-900">HYRIND</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 font-medium uppercase tracking-wider">{user.role} Portal</div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => onNavigate('dashboard')} 
          />
          
          {user.role === UserRole.ADMIN && (
            <>
              <SidebarItem 
                icon={Users} 
                label="Candidates" 
                active={currentView === 'candidates'} 
                onClick={() => onNavigate('candidates')} 
              />
              <SidebarItem 
                icon={Briefcase} 
                label="Recruiters" 
                active={currentView === 'recruiters'} 
                onClick={() => onNavigate('recruiters')} 
              />
              <SidebarItem 
                icon={CreditCard} 
                label="Billing & Reports" 
                active={currentView === 'billing'} 
                onClick={() => onNavigate('billing')} 
              />
            </>
          )}

          {user.role === UserRole.RECRUITER && (
            <>
              <SidebarItem 
                icon={Users} 
                label="My Candidates" 
                active={currentView === 'candidates'} 
                onClick={() => onNavigate('candidates')} 
              />
              <SidebarItem 
                icon={FileText} 
                label="My Profile" 
                active={currentView === 'profile'} 
                onClick={() => onNavigate('profile')} 
              />
              <SidebarItem 
                icon={CreditCard} 
                label="Payroll & Slips" 
                active={currentView === 'billing'} 
                onClick={() => onNavigate('billing')} 
              />
            </>
          )}

          {user.role === UserRole.CANDIDATE && (
            <>
              <SidebarItem 
                icon={FileText} 
                label="Profile & Intake" 
                active={currentView === 'profile'} 
                onClick={() => onNavigate('profile')} 
              />
              <SidebarItem 
                icon={Briefcase} 
                label="Documents" 
                active={currentView === 'documents'} 
                onClick={() => onNavigate('documents')} 
              />
              <SidebarItem 
                icon={CreditCard} 
                label="Subscription" 
                active={currentView === 'billing'} 
                onClick={() => onNavigate('billing')} 
              />
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            active={currentView === 'settings'} 
            onClick={() => onNavigate('settings')} 
          />
          <SidebarItem 
            icon={LogOut} 
            label="Sign Out" 
            onClick={onLogout} 
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <h1 className="text-lg font-semibold text-slate-800 capitalize">
            {currentView.replace('-', ' ')}
          </h1>
          
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-slate-700">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <img 
                src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name}`} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-slate-200"
              />
            </div>
          </div>
        </header>

        <div className="p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};