// src/pages/Admin.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Mail, Loader2, LogOut, User, Film, Palette, Save, CheckCircle, Settings } from 'lucide-react';

import AdminSettings from '../components/AdminSettings';
import AdminVideos from '../components/AdminVideos';
import AdminDesigns from '../components/AdminDesigns';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [savingMsg, setSavingMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // প্রোফাইলের জন্য স্টেট
  const [profileData, setProfileData] = useState({
    name: '',
    name_en: '',
    bio: '',
    bio_en: '',
    email: '',
    whatsapp: '',
    location: '',
    youtube: '',
    facebook: '',
    instagram: '',
    linkedin: ''
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitialLoad(false);
      if (session) fetchProfile();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile();
    });

    return () => subscription.unsubscribe();
  }, []);

  // ডেটাবেস থেকে প্রোফাইল ডেটা নিয়ে আসা
  const fetchProfile = async () => {
    const { data, error } = await supabase.from('profiles').select('*').maybeSingle();
    if (data) {
      setProfileData(data);
    }
  };

  // প্রোফাইল ডেটা সেভ বা আপডেট করা
  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSavingMsg('');

    try {
      const { data: existingData } = await supabase.from('profiles').select('id').maybeSingle();

      if (existingData) {
        // যদি আগে থেকে ডেটা থাকে, তবে আপডেট করবে
        await supabase.from('profiles').update(profileData).eq('id', existingData.id);
      } else {
        // যদি প্রথমবার হয়, তবে ইনসার্ট করবে
        await supabase.from('profiles').insert([profileData]);
      }
      
      setSavingMsg('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
      setTimeout(() => setSavingMsg(''), 3000);
    } catch (err) {
      console.error(err);
      alert('সেভ করতে সমস্যা হয়েছে!');
    }
    setIsSaving(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError('ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!');
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  if (initialLoad) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center text-amber-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // লগিন ফর্ম (লগিন না থাকলে)
  if (!session) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0a0c10] p-8 rounded-3xl border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-[60px] pointer-events-none" />
          <div className="text-center mb-8 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-5 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Lock className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">অ্যাডমিন প্যানেল</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">পোর্টফোলিও ম্যানেজ করতে লগিন করুন</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm px-4 py-3 rounded-xl mb-5 text-center">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">ইমেইল এড্রেস</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-amber-400 transition-all text-sm" placeholder="admin@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-amber-400 transition-all text-sm" placeholder="••••••••" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 mt-4 cursor-pointer hover:scale-[1.02] active:scale-95">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'লগিন করুন'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ড্যাশবোর্ড
  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col md:flex-row selection:bg-amber-500 selection:text-black font-sans">
      
      {/* ১. মোবাইল হেডার */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0a0c10]/95 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.5)]">
            <User className="w-4 h-4 text-slate-950" />
          </div>
          <h1 className="text-base font-black text-white tracking-wide">অ্যাডমিন প্যানেল</h1>
        </div>
        <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400 bg-white/5 rounded-lg transition-all cursor-pointer">
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* ২. ডেস্কটপ সাইডবার */}
      <div className="hidden md:flex w-64 bg-[#0a0c10] border-r border-amber-500/20 flex-col justify-between sticky top-0 h-screen shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <User className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-tight">অ্যাডমিন প্যানেল</h1>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">ড্যাশবোর্ড</span>
            </div>
          </div>
          <nav className="space-y-3">
            <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm cursor-pointer ${activeTab === 'profile' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}><User className="w-4 h-4" /><span>প্রোফাইল সেটিংস</span></button>
            <button onClick={() => setActiveTab('videos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm cursor-pointer ${activeTab === 'videos' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}><Film className="w-4 h-4" /><span>ভিডিও প্রজেক্ট</span></button>
            <button onClick={() => setActiveTab('designs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm cursor-pointer ${activeTab === 'designs' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}><Palette className="w-4 h-4" /><span>গ্রাফিক ডিজাইন</span></button>
            
            {/* নতুন যুক্ত করা Settings (CV) বাটন */}
            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm cursor-pointer ${activeTab === 'settings' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}><Settings className="w-4 h-4" /><span>ওয়েবসাইট সেটিংস</span></button>
          </nav>
        </div>
        <div className="p-6 border-t border-amber-500/20">
          <button onClick={handleLogout} className="flex items-center gap-3 text-slate-400 hover:text-red-400 w-full p-3 rounded-xl transition-all hover:bg-red-500/10 border border-transparent hover:border-red-500/30 cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span className="font-bold text-sm">লগআউট করুন</span>
          </button>
        </div>
      </div>

      {/* ৩. মূল কন্টেন্ট এরিয়া */}
      <div className="flex-1 p-4 sm:p-8 pb-24 md:pb-8 h-screen overflow-y-auto relative">
        <div className="max-w-4xl mx-auto">
          
          {savingMsg && (
            <div className="fixed top-20 md:top-8 right-4 md:right-8 bg-[#0a0c10] border border-emerald-500/50 text-emerald-400 px-5 py-3 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center gap-2 z-50 animate-in slide-in-from-right fade-in">
              <CheckCircle className="w-5 h-5" />
              <span className="font-bold text-sm">{savingMsg}</span>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">প্রোফাইল সেটিংস</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">আপনার পোর্টফোলিওর মূল তথ্যগুলো এখান থেকে আপডেট করুন</p>
                </div>
                <button onClick={handleSaveProfile} disabled={isSaving} className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-70">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>সেভ করুন</span>
                </button>
              </div>

              {/* Basic Info */}
              <div className="bg-[#0a0c10] border border-amber-500/20 rounded-2xl p-5 sm:p-7 shadow-lg space-y-6">
                <h3 className="text-amber-400 font-bold border-b border-amber-500/20 pb-2 mb-4">প্রাথমিক তথ্য</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">নাম (বাংলা)</label>
                    <input type="text" name="name" value={profileData.name || ''} onChange={handleProfileChange} placeholder="যেমন: গ্রাফিক ডিজাইনার" className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:border-amber-400 focus:outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">নাম (ইংরেজি)</label>
                    <input type="text" name="name_en" value={profileData.name_en || ''} onChange={handleProfileChange} placeholder="যেমন: Graphic Designer" className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:border-amber-400 focus:outline-none transition-colors text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">বায়ো (বাংলা)</label>
                    <textarea name="bio" value={profileData.bio || ''} onChange={handleProfileChange} rows={2} placeholder="উচ্চমানের ভিডিও এডিটিং..." className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:border-amber-400 focus:outline-none transition-colors text-sm resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">বায়ো (ইংরেজি)</label>
                    <textarea name="bio_en" value={profileData.bio_en || ''} onChange={handleProfileChange} rows={2} placeholder="Transforming footage into..." className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:border-amber-400 focus:outline-none transition-colors text-sm resize-none" />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-[#0a0c10] border border-amber-500/20 rounded-2xl p-5 sm:p-7 shadow-lg space-y-6">
                <h3 className="text-amber-400 font-bold border-b border-amber-500/20 pb-2 mb-4">যোগাযোগ ও সোশ্যাল মিডিয়া</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">ইমেইল</label>
                    <input type="email" name="email" value={profileData.email || ''} onChange={handleProfileChange} placeholder="example@gmail.com" className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:border-amber-400 focus:outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">হোয়াটসঅ্যাপ নাম্বার</label>
                    <input type="text" name="whatsapp" value={profileData.whatsapp || ''} onChange={handleProfileChange} placeholder="+880..." className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:border-amber-400 focus:outline-none transition-colors text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">লোকেশন / ঠিকানা</label>
                    <input type="text" name="location" value={profileData.location || ''} onChange={handleProfileChange} placeholder="Dhaka, Bangladesh" className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:border-amber-400 focus:outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">YouTube লিংক</label>
                    <input type="text" name="youtube" value={profileData.youtube || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:border-amber-400 focus:outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Facebook লিংক</label>
                    <input type="text" name="facebook" value={profileData.facebook || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:border-amber-400 focus:outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Instagram লিংক</label>
                    <input type="text" name="instagram" value={profileData.instagram || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:border-amber-400 focus:outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">LinkedIn লিংক</label>
                    <input type="text" name="linkedin" value={profileData.linkedin || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:border-amber-400 focus:outline-none transition-colors text-sm" />
                  </div>
                </div>
              </div>

              <button onClick={handleSaveProfile} disabled={isSaving} className="sm:hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-5 py-3.5 rounded-xl font-black text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer active:scale-95 disabled:opacity-70">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>সেভ করুন</span>
              </button>
            </div>
          )}

          {activeTab === 'videos' && <AdminVideos />}
          {activeTab === 'designs' && <AdminDesigns />}
          
          {/* নতুন যুক্ত করা AdminSettings কম্পোনেন্ট */}
          {activeTab === 'settings' && <AdminSettings />}

        </div>
      </div>

      {/* ৪. মোবাইল বটম নেভিগেশন */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0c10]/95 backdrop-blur-xl border-t border-amber-500/30 flex items-center justify-around p-2 pb-safe z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 p-2 rounded-xl min-w-[60px] transition-all cursor-pointer ${activeTab === 'profile' ? 'text-amber-400 scale-110' : 'text-slate-400 hover:text-white'}`}><User className="w-5 h-5" /><span className="text-[10px] font-bold">প্রোফাইল</span></button>
        <button onClick={() => setActiveTab('videos')} className={`flex flex-col items-center gap-1 p-2 rounded-xl min-w-[60px] transition-all cursor-pointer ${activeTab === 'videos' ? 'text-amber-400 scale-110' : 'text-slate-400 hover:text-white'}`}><Film className="w-5 h-5" /><span className="text-[10px] font-bold">ভিডিও</span></button>
        <button onClick={() => setActiveTab('designs')} className={`flex flex-col items-center gap-1 p-2 rounded-xl min-w-[60px] transition-all cursor-pointer ${activeTab === 'designs' ? 'text-amber-400 scale-110' : 'text-slate-400 hover:text-white'}`}><Palette className="w-5 h-5" /><span className="text-[10px] font-bold">ডিজাইন</span></button>
        
        {/* মোবাইল বটম নেভিগেশনে Settings (CV) বাটন */}
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 p-2 rounded-xl min-w-[60px] transition-all cursor-pointer ${activeTab === 'settings' ? 'text-amber-400 scale-110' : 'text-slate-400 hover:text-white'}`}><Settings className="w-5 h-5" /><span className="text-[10px] font-bold">সেটিংস</span></button>
      </div>
      
    </div>
  );
}