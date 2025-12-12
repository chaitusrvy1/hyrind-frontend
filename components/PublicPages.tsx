import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Shield, TrendingUp, Users, User, Briefcase } from 'lucide-react';
import { UserRole } from '../types';

interface PublicProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<PublicProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-md flex items-center justify-center text-white font-bold text-xl">H</div>
            <span className="text-xl font-bold text-slate-900">HYRIND</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('login')} className="text-slate-600 hover:text-brand-600 font-medium text-sm">Log In</button>
            <button 
              onClick={() => onNavigate('register')}
              className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Launch Your Career in the <span className="text-brand-600">US Tech Market</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Specialized placement and marketing services for Master's students and F-1 OPT holders. We bridge the gap between your education and your dream job.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={() => onNavigate('register')} className="flex items-center gap-2 bg-brand-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200">
            Get Started Now <ArrowRight size={18} />
          </button>
          <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-full font-semibold hover:bg-slate-50 transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-brand-600 mb-2">500+</div>
            <div className="text-slate-600 font-medium">Candidates Placed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-600 mb-2">98%</div>
            <div className="text-slate-600 font-medium">Visa Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-600 mb-2">45 Days</div>
            <div className="text-slate-600 font-medium">Avg. Time to Offer</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Aggressive Marketing</h3>
            <p className="text-slate-600">Our recruiters actively market your profile to our network of 1000+ direct clients and prime vendors.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Compliance First</h3>
            <p className="text-slate-600">We specialize in F-1 OPT compliance, ensuring your employment records are meticulously maintained.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Guidance</h3>
            <p className="text-slate-600">From resume crafting to mock interviews, our industry experts prepare you for every step.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export const RegisterPage: React.FC<PublicProps> = ({ onNavigate }) => {
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', university: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Registration
    alert(`Registration Successful for ${formData.email} as ${role.toUpperCase()}. Please login.`);
    onNavigate('login');
  };

  return (
     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
           <div className="text-center mb-8">
              <div className="w-12 h-12 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">H</div>
              <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
              <p className="text-slate-500 mt-2">Join HYRIND today</p>
           </div>

           <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
              <button 
                onClick={() => setRole('candidate')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${role === 'candidate' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'}`}
              >
                <User size={16} /> Candidate
              </button>
              <button 
                 onClick={() => setRole('recruiter')}
                 className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${role === 'recruiter' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'}`}
              >
                 <Briefcase size={16} /> Recruiter
              </button>
           </div>

           <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input required onChange={e => setFormData({...formData, firstName: e.target.value})} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input required onChange={e => setFormData({...formData, lastName: e.target.value})} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                 </div>
              </div>
              
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                 <input required onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>

              {role === 'candidate' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">University</label>
                  <input required onChange={e => setFormData({...formData, university: e.target.value})} type="text" placeholder="Current or Past University" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>
              )}

              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                 <input required onChange={e => setFormData({...formData, password: e.target.value})} type="password" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>

              <button type="submit" className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors mt-2">
                 Sign Up as {role === 'candidate' ? 'Candidate' : 'Recruiter'}
              </button>
           </form>

           <div className="mt-6 text-center text-sm">
              <span className="text-slate-500">Already have an account? </span>
              <button onClick={() => onNavigate('login')} className="text-brand-600 font-medium hover:underline">Log in</button>
           </div>
        </div>
     </div>
  );
};

export const InterestForm: React.FC<PublicProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        // In a real app, this would redirect or show a success message
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Interest Received!</h2>
          <p className="text-slate-600 mb-6">
            Thank you for applying. Our admin team will review your details and send login credentials to your email within 24 hours.
          </p>
          <button 
            onClick={() => onNavigate('landing')}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
           <h2 className="text-xl font-bold text-slate-900">Candidate Interest Form</h2>
           <button onClick={() => onNavigate('landing')} className="text-sm text-slate-500 hover:text-slate-900">Cancel</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input required type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">University</label>
            <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="e.g. Northeastern University" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Major</label>
              <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Graduation Date</label>
              <input required type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Visa Status</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all">
              <option>F-1 OPT</option>
              <option>F-1 CPT</option>
              <option>H1-B</option>
              <option>Green Card / Citizen</option>
            </select>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Resume Upload (PDF)</label>
             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:bg-slate-50 transition-colors">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-slate-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PDF up to 10MB</p>
                </div>
              </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-brand-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200">
              Submit Application
            </button>
            <p className="text-xs text-slate-500 text-center mt-4">
              By submitting this form, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};