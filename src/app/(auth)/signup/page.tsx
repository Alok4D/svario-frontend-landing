"use client";

import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  ArrowRight, 
  Github, 
  Check, 
  ShieldCheck,
  Layout,
  Laptop,
  Users,
  Settings,
  Bot,
  Inbox,
  Zap,
  Globe,
  Plus,
  Trash2,
  Upload,
  Link as LinkIcon,
  MessageSquare,
  MessageCircle,
  Instagram,
  Facebook,
  Send,
  Smartphone,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0: Register, 1: Welcome, 2: Workspace, 3: Channels, 4: Team, 5: AI Setup, 6: Complete
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Multi-step progress labels
  const steps = [
    { icon: Layout, label: "Welcome" },
    { icon: Laptop, label: "Workspace" },
    { icon: Users, label: "Channels" },
    { icon: Settings, label: "Team" },
    { icon: Bot, label: "AI Setup" },
    { icon: ShieldCheck, label: "Complete" },
  ];

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);

  // STEP 0: Registration
  if (currentStep === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-10 animate-in fade-in duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <div className="w-4 h-3 bg-white rounded-sm relative">
                <div className="absolute -bottom-1 left-1 w-1.5 h-1.5 bg-white rotate-45"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-gray-900">Svario.is</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-500">Welcome</h2>
        </div>

        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="text-center mb-1"><span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">✨ Get Started Free</span></div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">Create your account</h1>
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
            <div className="space-y-4 my-6">
              <InputField label="Full Name" icon={User} placeholder="John Doe" type="text" />
              <InputField label="Email Address" icon={Mail} placeholder="you@company.com" type="email" />
              <InputField label="Password" icon={Lock} placeholder="Create a strong password" type="password" isPassword value={password} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)} />
            </div>
            <PasswordChecklist password={password} />
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4 text-sm">
              Create Account <ArrowRight className="h-4 w-4" />
            </button>
            <div className="relative py-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SocialButton icon="/google.svg" label="Google" isSvg />
              <SocialButton icon={Github} label="GitHub" />
            </div>
          </form>
          <div className="mt-8 text-center"><p className="text-xs text-gray-500 font-medium">Already have an account? <Link href="/login" className="text-blue-500 font-bold hover:underline">Sign in</Link></p></div>
        </div>
        <BenefitsFooter />
      </div>
    );
  }

  // ONBOARDING WRAPPER
  return (
    <div className="w-full flex flex-col items-center py-10 px-4 max-w-5xl mx-auto animate-in slide-in-from-right duration-700">
      {/* Header */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
          <div className="w-5 h-4 bg-white rounded-sm relative">
            <div className="absolute -bottom-1 left-1.5 w-2 h-2 bg-white rotate-45"></div>
          </div>
        </div>
        <span className="text-2xl font-bold text-gray-900">Svario.js</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-4xl relative flex items-center justify-between mb-16 px-4">
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-100 -translate-y-1/2 rounded-full z-0"></div>
        {steps.map((s, i) => {
          const isActive = i + 1 === currentStep;
          const isCompleted = i + 1 < currentStep;
          return (
            <div key={i} className="relative z-10 flex flex-col items-center group">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
                isActive ? 'bg-blue-500 border-blue-500 text-white shadow-xl shadow-blue-200' : 
                isCompleted ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-100' :
                'bg-white border-gray-100 text-gray-400'
              }`}>
                {isCompleted ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
              </div>
              <span className={`absolute -bottom-8 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400 opacity-60'
              }`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* STEP 1: Welcome */}
      {currentStep === 1 && (
        <ContentCard icon={Layout} title="Welcome to Svario.is! 🎉" subtitle="Let's set up your AI-powered customer support hub in just a few steps. This will only take 2-3 minutes!" onNext={handleNext} nextLabel="Let's Get Started">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <FeatureCard icon={Inbox} title="Unified Inbox" desc="All channels in one place" color="blue" />
            <FeatureCard icon={Bot} title="AI Assistant" desc="Smart auto-responses" color="purple" />
            <FeatureCard icon={Zap} title="Automation" desc="Save time & resources" color="green" />
          </div>
        </ContentCard>
      )}

      {/* STEP 2: Workspace */}
      {currentStep === 2 && (
        <ContentCard icon={Laptop} title="Create Your Workspace" subtitle="Tell us about your company to personalize your experience" onNext={handleNext} onBack={handleBack}>
          <div className="w-full max-w-xl mx-auto space-y-5">
            <InputField label="Company Name" icon={Laptop} placeholder="e.g. Acme Corporation" type="text" />
            <div className="grid grid-cols-2 gap-5">
              <InputField label="Industry" icon={Layout} placeholder="e.g. E-commerce" type="text" />
              <InputField label="Team Size" icon={Users} placeholder="e.g. 1-10" type="text" />
            </div>
            <InputField label="Website URL" icon={Globe} placeholder="https://yourwebsite.com" type="text" />
          </div>
        </ContentCard>
      )}

      {/* STEP 3: Channels */}
      {currentStep === 3 && (
        <ContentCard icon={MessageSquare} title="Connect Your Channels" subtitle="Select the communication channels you want to manage" onNext={handleNext} onBack={handleBack}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <ChannelCard icon={MessageCircle} label="WhatsApp Business" color="green" isPremium />
            <ChannelCard icon={Instagram} label="Instagram" color="pink" isPremium />
            <ChannelCard icon={Facebook} label="Facebook Messenger" color="blue" />
            <ChannelCard icon={Send} label="Telegram" color="sky" />
            <ChannelCard icon={Mail} label="Email" color="orange" />
            <ChannelCard icon={Smartphone} label="SMS" color="indigo" />
            <ChannelCard icon={Layout} label="Website Chat Widget" color="blue" isPremium />
          </div>
          <p className="text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-widest">Connect 10 channels + manage with one interface</p>
        </ContentCard>
      )}

      {/* STEP 4: Team */}
      {currentStep === 4 && (
        <ContentCard icon={Users} title="Invite Your Team" subtitle="Add team members who will help manage customer support" onNext={handleNext} onBack={handleBack}>
          <div className="w-full max-w-2xl mx-auto space-y-4">
            <TeamRow email="john@example.com" role="Admin" />
            <TeamRow email="sarah@example.com" role="Agent" />
            <button className="flex items-center gap-2 text-blue-500 font-bold text-[11px] uppercase tracking-widest hover:text-blue-600 transition-colors py-2 group">
              <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" /> Add Another Team Member
            </button>
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 mt-6">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-blue-100"><Mail className="w-5 h-5 text-white" /></div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-none mb-1">Email invitations</p>
                <p className="text-[11px] text-gray-500 font-medium">Team members will receive an email invitation to join your workspace</p>
              </div>
            </div>
          </div>
        </ContentCard>
      )}

      {/* STEP 5: AI Setup */}
      {currentStep === 5 && (
        <ContentCard icon={Bot} title="Train Your AI Assistant" subtitle="Add some common questions to help AI learn your business" onNext={handleNext} onBack={handleBack}>
          <div className="w-full max-w-3xl mx-auto">
            <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-8 space-y-6">
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md shadow-purple-100">#1</div>
                 <span className="font-bold text-gray-900 text-sm">Entry #1</span>
               </div>
               <div className="space-y-4">
                 <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Question</label>
                   <input type="text" placeholder="e.g. What is the delivery time?" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Answer</label>
                   <textarea rows={3} placeholder="e.g. Inside Dhaka: 2-3 days. Outside Dhaka: 5-7 days." className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none" />
                 </div>
               </div>
            </div>
            <button className="w-full mt-4 border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all rounded-2xl py-3 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-blue-500 group">
              <Plus className="w-4 h-4 group-hover:scale-110" /> Add Another Question
            </button>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white border border-gray-100 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase text-gray-500 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"><Upload className="w-4 h-4 text-blue-500" /> Upload CSV</div>
              <div className="bg-white border border-gray-100 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase text-gray-500 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"><LinkIcon className="w-4 h-4 text-purple-500" /> Import from URL</div>
              <div className="bg-white border border-gray-100 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase text-gray-500 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"><Zap className="w-4 h-4 text-green-500" /> AI Generate</div>
            </div>
          </div>
        </ContentCard>
      )}

      {/* STEP 6: Complete */}
      {currentStep === 6 && (
        <ContentCard icon={Check} title="All Set! 🚀" subtitle="Your AI-powered customer support hub is ready to use. Let's start managing your conversations!" nextLabel="Go to Dashboard" onNext={() => router.push('/dashboard')}>
           <div className="w-full max-w-lg mx-auto bg-blue-50/30 border border-blue-100/50 rounded-[2.5rem] p-10 space-y-6">
              <h4 className="text-center text-sm font-bold text-gray-900 mb-2 uppercase tracking-widest">What's Next?</h4>
              <CompleteItem icon={MessageCircle} title="Start Receiving Messages" desc="Your channels are connected and ready!" color="blue" />
              <CompleteItem icon={Bot} title="AI Will Learn & Improve" desc="Your AI gets smarter with every conversation" color="purple" />
              <CompleteItem icon={Zap} title="Set Up Automations" desc="Control workflows & save time" color="green" />
           </div>
        </ContentCard>
      )}
    </div>
  );
};

// --- HELPER COMPONENTS ---

const InputField = ({ label, icon: Icon, placeholder, type, isPassword, value, onChange }: any) => (
  <div>
    <label className="text-[10px] font-bold text-gray-700 block mb-1.5 ml-1 uppercase tracking-widest">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
      </div>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} required className="block w-full pl-9 pr-3 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300 text-sm font-medium" />
      {isPassword && <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"><Eye className="h-4 w-4 opacity-50" /></button>}
    </div>
  </div>
);

const PasswordChecklist = ({ password }: { password: string }) => {
  const checks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) }
  ];
  return (
    <div className="bg-gray-50 rounded-2xl p-4 space-y-2 border border-gray-100/50">
      <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Password Requirements:</p>
      {checks.map((c, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`transition-all duration-300 ${c.valid ? 'scale-110' : 'scale-100'}`}>
            {c.valid ? <Check className="h-3 w-3 text-green-500 stroke-[3]" /> : <div className="h-1 w-2 bg-gray-200 rounded-full" />}
          </div>
          <span className={`text-[11px] font-semibold transition-colors ${c.valid ? 'text-green-600' : 'text-gray-400'}`}>{c.label}</span>
        </div>
      ))}
    </div>
  );
};

const ContentCard = ({ children, icon: Icon, title, subtitle, onNext, onBack, nextLabel = "Continue" }: any) => (
  <div className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-12 flex flex-col items-center border border-gray-50 animate-in fade-in zoom-in-95 duration-500 relative group overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner ring-8 ring-blue-50/50">
      <div className={`p-4 rounded-xl shadow-lg ${title.includes('All Set') ? 'bg-green-500' : 'bg-blue-500'} text-white`}><Icon className="w-8 h-8" /></div>
    </div>
    <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight text-center">{title}</h1>
    <p className="text-gray-500 text-center max-w-lg mb-12 text-base font-medium leading-relaxed opacity-80">{subtitle}</p>
    <div className="w-full">{children}</div>
    <div className="flex items-center justify-between w-full mt-12 pt-8 border-t border-gray-50">
      {onBack ? (
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold text-[10px] uppercase tracking-widest transition-colors"><ChevronLeft className="w-4 h-4" /> Back</button>
      ) : <div />}
      <button onClick={onNext} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 px-10 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-100 transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-widest">
        {nextLabel} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, color }: any) => (
  <div className={`p-6 rounded-3xl flex flex-col items-center text-center transition-all hover:-translate-y-1 ${color === 'blue' ? 'bg-blue-50/30 border-blue-100/50' : color === 'purple' ? 'bg-purple-50/30 border-purple-100/50' : 'bg-green-50/30 border-green-100/50'} border`}>
    <div className={`p-3 rounded-xl mb-4 ${color === 'blue' ? 'bg-blue-500' : color === 'purple' ? 'bg-purple-500' : 'bg-green-500'} text-white shadow-md`}><Icon className="w-5 h-5" /></div>
    <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
    <p className="text-[11px] text-gray-500 font-medium leading-snug">{desc}</p>
  </div>
);

const ChannelCard = ({ icon: Icon, label, color, isPremium }: any) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 relative group cursor-pointer hover:border-blue-200 hover:bg-blue-50/20 transition-all">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
      color === 'green' ? 'bg-green-500' : color === 'pink' ? 'bg-pink-500' : color === 'blue' ? 'bg-blue-500' : color === 'sky' ? 'bg-sky-400' : color === 'orange' ? 'bg-orange-500' : color === 'indigo' ? 'bg-indigo-500' : 'bg-gray-400'
    } text-white`}><Icon className="w-5 h-5" /></div>
    <span className="text-xs font-bold text-gray-700">{label}</span>
    {isPremium && <span className="absolute top-2 right-2 text-[8px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-md uppercase">Premium</span>}
  </div>
);

const TeamRow = ({ email, role }: any) => (
  <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left duration-300">
    <div className="flex-1 relative">
      <input type="email" value={email} readOnly className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 outline-none" />
    </div>
    <div className="w-32 relative">
      <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all">
        <option>{role}</option>
        <option>Admin</option>
        <option>Agent</option>
        <option>Manager</option>
      </select>
    </div>
    <button className="p-3 text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
  </div>
);

const CompleteItem = ({ icon: Icon, title, desc, color }: any) => (
  <div className="bg-white p-4 rounded-2xl border border-blue-100/50 flex items-center gap-4 shadow-sm hover:scale-[1.02] transition-transform">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
      color === 'blue' ? 'bg-blue-500' : color === 'purple' ? 'bg-purple-500' : 'bg-green-500'
    } text-white shadow-lg`}><Icon className="w-5 h-5" /></div>
    <div className="flex-1">
      <h5 className="text-xs font-bold text-gray-900 leading-none mb-1">{title}</h5>
      <p className="text-[10px] text-gray-500 font-medium">{desc}</p>
    </div>
    <ChevronLeft className="w-4 h-4 text-gray-200 rotate-180" />
  </div>
);

const SocialButton = ({ icon: Icon, label, isSvg }: any) => (
  <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-xs font-bold text-gray-700 w-full">
    {label === 'GitHub' && <Github className="w-4 h-4 text-gray-900" />}
    {label === 'Google' && (
      <svg viewBox="0 0 24 24" className="w-4 h-4">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    )}
    {label}
  </button>
);

const BenefitsFooter = () => (
  <div className="grid grid-cols-3 gap-8 mt-10">
    {[{ icon: Check, label: "14-day free trial", bg: "bg-green-500" }, { icon: ShieldCheck, label: "No credit card", bg: "bg-blue-500" }, { icon: Check, label: "Cancel anytime", bg: "bg-blue-400" }].map((b, i) => (
      <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
        <div className={`w-8 h-8 ${b.bg} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}><b.icon className="w-5 h-5 text-white" /></div>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">{b.label}</span>
      </div>
    ))}
  </div>
);

export default SignupPage;
