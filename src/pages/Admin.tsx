// src/pages/Admin.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Mail, Loader2, LogOut, User, Film, Palette, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import AdminProfile from '../components/AdminProfile';
import AdminVideos from '../components/AdminVideos';
import AdminDesigns from '../components/AdminDesigns';
import AdminSettings from '../components/AdminSettings';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitialLoad(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError('ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!');
    setLoading(false);
  };

  const executeLogout = async () => {
    setLogoutModal(false);
    await supabase.auth.signOut();
  };

  if (initialLoad) return <div className="flex h-dvh items-center justify-center bg-[#050608] text-amber-400"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  if (!session) {
    return (
      <div className="flex h-dvh items-center justify-center bg-[#050608] p-4 font-sans">
        <div className="w-full max-w-md bg-[#0a0c10] p-8 rounded-3xl border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden">
          <div className="text-center mb-8 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-5 border border-amber-500/40">
              <Lock className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-black text-white">অ্যাডমিন প্যানেল</h2>
          </div>
          {error && <div className="bg-red-500/10 text-red-400 px-4 py-3 rounded-xl mb-5 text-center text-sm">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-5">
            <div><label className="block text-xs font-bold text-slate-300 mb-2">ইমেইল এড্রেস</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm" required /></div>
            <div><label className="block text-xs font-bold text-slate-300 mb-2">পাসওয়ার্ড</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm" required /></div>
            <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-3.5 rounded-xl shadow-lg flex items-center justify-center cursor-pointer">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'লগিন করুন'}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-[#050608] text-white font-sans selection:bg-amber-500 selection:text-black">
      
      {/* লগআউট মোডাল */}
      <AnimatePresence>
        {logoutModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#050608]/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-sm bg-[#0a0c10] border border-amber-500/20 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-5 mx-auto border border-red-500/20">
                <LogOut className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-black text-white text-center mb-2">লগআউট কনফার্মেশন</h3>
              <p className="text-slate-400 text-sm text-center mb-8">আপনি কি নিশ্চিত যে আপনি অ্যাডমিন প্যানেল থেকে বের হয়ে যেতে চান?</p>
              <div className="flex gap-3">
                <button onClick={() => setLogoutModal(false)} className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-colors">বাতিল</button>
                <button onClick={executeLogout} className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 cursor-pointer transition-colors">হ্যাঁ, লগআউট</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* সাইডবার (Desktop View) */}
      <aside className="hidden md:flex w-64 flex-col justify-between bg-[#0a0c10] border-r border-amber-500/20 shrink-0 z-50">
        <div className="p-6">
          <h1 className="text-lg font-black text-white mb-8">অ্যাডমিন প্যানেল</h1>
          <nav className="space-y-3">
            <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${activeTab === 'profile' ? 'bg-amber-500/15 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><User className="w-4 h-4" /><span>প্রোফাইল সেটিংস</span></button>
            <button onClick={() => setActiveTab('videos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${activeTab === 'videos' ? 'bg-amber-500/15 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Film className="w-4 h-4" /><span>ভিডিও প্রজেক্ট</span></button>
            <button onClick={() => setActiveTab('designs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${activeTab === 'designs' ? 'bg-amber-500/15 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Palette className="w-4 h-4" /><span>গ্রাফিক ডিজাইন</span></button>
            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${activeTab === 'settings' ? 'bg-amber-500/15 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Settings className="w-4 h-4" /><span>ওয়েবসাইট সেটিংস</span></button>
          </nav>
        </div>
        <div className="p-6 border-t border-amber-500/20">
          <button onClick={() => setLogoutModal(true)} className="flex items-center gap-3 text-slate-400 hover:text-red-400 w-full transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" /><span>লগআউট</span>
          </button>
        </div>
      </aside>

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 flex flex-col min-w-0 relative bg-[#050608] overflow-hidden">
        
        {/* কন্টেন্ট বক্স (Mobile-এ অতিরিক্ত হেডার রিমুভ করে স্পেস ক্লিয়ার করা হয়েছে) */}
        {/* pb-28 দেওয়া হয়েছে যাতে Floating Dock এর নিচে কন্টেন্ট লুকিয়ে না যায় */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative scroll-smooth pb-28 md:pb-8">
          <div className="max-w-4xl mx-auto">
            
            <div className={activeTab === 'profile' ? 'block' : 'hidden'}>
              <motion.div initial={{ opacity: 0, y: 15 }} animate={activeTab === 'profile' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <AdminProfile />
              </motion.div>
            </div>

            <div className={activeTab === 'videos' ? 'block' : 'hidden'}>
              <motion.div initial={{ opacity: 0, y: 15 }} animate={activeTab === 'videos' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <AdminVideos />
              </motion.div>
            </div>

            <div className={activeTab === 'designs' ? 'block' : 'hidden'}>
              <motion.div initial={{ opacity: 0, y: 15 }} animate={activeTab === 'designs' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <AdminDesigns />
              </motion.div>
            </div>

            <div className={activeTab === 'settings' ? 'block' : 'hidden'}>
              <motion.div initial={{ opacity: 0, y: 15 }} animate={activeTab === 'settings' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <AdminSettings />
              </motion.div>
            </div>

          </div>
        </div>

        {/* 
          Premium iOS Style Floating Dock (Mobile View)
          এটি স্ক্রিনের নিচে ফিক্সড হয়ে ভাসতে থাকবে, দেখতে একদম মডার্ন অ্যাপের মতো লাগবে।
        */}
        <nav className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] bg-[#0a0c10]/85 backdrop-blur-2xl border border-amber-500/25 rounded-2xl flex items-center justify-between px-3 py-2 z-50 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 p-2 transition-transform duration-300 cursor-pointer ${activeTab === 'profile' ? 'text-amber-400 scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-slate-400 hover:text-slate-200'}`}>
            <User className="w-5 h-5" />
          </button>
          
          <button onClick={() => setActiveTab('videos')} className={`flex flex-col items-center gap-1 p-2 transition-transform duration-300 cursor-pointer ${activeTab === 'videos' ? 'text-amber-400 scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-slate-400 hover:text-slate-200'}`}>
            <Film className="w-5 h-5" />
          </button>
          
          <button onClick={() => setActiveTab('designs')} className={`flex flex-col items-center gap-1 p-2 transition-transform duration-300 cursor-pointer ${activeTab === 'designs' ? 'text-amber-400 scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-slate-400 hover:text-slate-200'}`}>
            <Palette className="w-5 h-5" />
          </button>
          
          <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 p-2 transition-transform duration-300 cursor-pointer ${activeTab === 'settings' ? 'text-amber-400 scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-slate-400 hover:text-slate-200'}`}>
            <Settings className="w-5 h-5" />
          </button>

          {/* ডিভাইডার */}
          <div className="w-[1px] h-8 bg-slate-700/50 mx-1"></div>

          {/* লগআউট বাটন (ডানপাশে ফিক্সড) */}
          <button onClick={() => setLogoutModal(true)} className="flex flex-col items-center gap-1 p-2 transition-transform duration-300 cursor-pointer text-red-500/80 hover:text-red-400 hover:scale-110">
            <LogOut className="w-5 h-5" />
          </button>
        </nav>
      </main>
    </div>
  );
}