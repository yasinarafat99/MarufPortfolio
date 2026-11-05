// src/pages/Admin.tsx
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Mail, Loader2, LogOut, User, Film, Palette, Save, CheckCircle, Settings, Camera, UploadCloud } from 'lucide-react';

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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // প্রোফাইলের জন্য স্টেট (avatar_url যুক্ত করা হয়েছে)
  const [profileData, setProfileData] = useState({
    name: '', name_en: '', bio: '', bio_en: '', email: '', whatsapp: '', location: '', youtube: '', facebook: '', instagram: '', linkedin: '', avatar_url: ''
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

  const fetchProfile = async () => {
    const { data, error } = await supabase.from('profiles').select('*').maybeSingle();
    if (data) setProfileData(data);
  };

  // হিরো ইমেজ আপলোডের ফাংশন
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('ছবির সাইজ ৫MB এর বেশি হওয়া যাবে না!'); return; }
    
    setIsUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `hero_${Date.now()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;
      
      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      setProfileData({ ...profileData, avatar_url: data.publicUrl });
      
    } catch (error: any) {
      alert('ছবি আপলোড করতে সমস্যা হয়েছে: ' + error.message);
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSavingMsg('');
    try {
      const { data: existingData } = await supabase.from('profiles').select('id').maybeSingle();
      if (existingData) {
        await supabase.from('profiles').update(profileData).eq('id', existingData.id);
      } else {
        await supabase.from('profiles').insert([profileData]);
      }
      setSavingMsg('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
      setTimeout(() => setSavingMsg(''), 3000);
    } catch (err) {
      alert('সেভ করতে সমস্যা হয়েছে!');
    }
    setIsSaving(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError('ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!');
    setLoading(false);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  if (initialLoad) return <div className="min-h-screen bg-[#050608] flex items-center justify-center text-amber-400"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  if (!session) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-[#050608] text-white flex flex-col md:flex-row font-sans">
      {/* মোবাইল হেডার */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0a0c10]/95 border-b border-amber-500/20 sticky top-0 z-50">
        <h1 className="text-base font-black text-white">অ্যাডমিন প্যানেল</h1>
        <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400"><LogOut className="w-4 h-4" /></button>
      </div>

      {/* সাইডবার */}
      <div className="hidden md:flex w-64 bg-[#0a0c10] border-r border-amber-500/20 flex-col justify-between sticky top-0 h-screen shrink-0">
        <div className="p-6">
          <h1 className="text-lg font-black text-white mb-8">অ্যাডমিন প্যানেল</h1>
          <nav className="space-y-3">
            <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${activeTab === 'profile' ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:text-white'}`}><User className="w-4 h-4" /><span>প্রোফাইল সেটিংস</span></button>
            <button onClick={() => setActiveTab('videos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${activeTab === 'videos' ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:text-white'}`}><Film className="w-4 h-4" /><span>ভিডিও প্রজেক্ট</span></button>
            <button onClick={() => setActiveTab('designs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${activeTab === 'designs' ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:text-white'}`}><Palette className="w-4 h-4" /><span>গ্রাফিক ডিজাইন</span></button>
            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${activeTab === 'settings' ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:text-white'}`}><Settings className="w-4 h-4" /><span>ওয়েবসাইট সেটিংস</span></button>
          </nav>
        </div>
        <div className="p-6 border-t border-amber-500/20"><button onClick={handleLogout} className="flex items-center gap-3 text-slate-400 hover:text-red-400"><LogOut className="w-4 h-4" /><span>লগআউট</span></button></div>
      </div>

      {/* মেইন কন্টেন্ট */}
      <div className="flex-1 p-4 sm:p-8 pb-24 md:pb-8 h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {savingMsg && <div className="fixed top-8 right-8 bg-[#0a0c10] border border-emerald-500 text-emerald-400 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50"><CheckCircle className="w-5 h-5" /><span>{savingMsg}</span></div>}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div><h2 className="text-xl sm:text-2xl font-black text-white">প্রোফাইল সেটিংস</h2><p className="text-slate-400 mt-1 text-sm">আপনার পোর্টফোলিওর মূল তথ্যগুলো আপডেট করুন</p></div>
                <button onClick={handleSaveProfile} disabled={isSaving} className="hidden sm:flex items-center gap-2 bg-amber-500 text-black px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg cursor-pointer hover:bg-amber-400">{isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}<span>সেভ করুন</span></button>
              </div>

              {/* হিরো ইমেজ আপলোড সেকশন */}
              <div className="bg-[#0a0c10] border border-amber-500/20 rounded-2xl p-5 sm:p-7 shadow-lg">
                <h3 className="text-amber-400 font-bold border-b border-amber-500/20 pb-2 mb-5">আপনার ছবি (হিরো ইমেজ)</h3>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-32 h-32 rounded-full border-2 border-amber-500/40 p-1 overflow-hidden bg-slate-900 flex shrink-0 items-center justify-center">
                    {isUploadingImage ? <Loader2 className="w-8 h-8 text-amber-400 animate-spin" /> : (
                      profileData.avatar_url ? <img src={profileData.avatar_url} alt="Profile" className="w-full h-full object-cover rounded-full" /> : <Camera className="w-10 h-10 text-slate-600" />
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-slate-300 text-sm mb-3">হোম পেজে প্রদর্শনের জন্য একটি সুন্দর ও প্রফেশনাল ছবি আপলোড করুন। (সর্বোচ্চ 5MB)</p>
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingImage} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/30 font-bold text-sm cursor-pointer transition-all">
                      <UploadCloud className="w-4 h-4" /> <span>{isUploadingImage ? 'আপলোড হচ্ছে...' : 'ছবি পরিবর্তন করুন'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* প্রাথমিক তথ্য */}
              <div className="bg-[#0a0c10] border border-amber-500/20 rounded-2xl p-5 sm:p-7 shadow-lg">
                <h3 className="text-amber-400 font-bold border-b border-amber-500/20 pb-2 mb-4">প্রাথমিক তথ্য</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div><label className="block text-xs font-bold text-slate-300 mb-2">নাম (বাংলা)</label><input type="text" name="name" value={profileData.name || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-2">নাম (ইংরেজি)</label><input type="text" name="name_en" value={profileData.name_en || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm" /></div>
                  <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-300 mb-2">বায়ো (বাংলা)</label><textarea name="bio" value={profileData.bio || ''} onChange={handleProfileChange} rows={2} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm resize-none" /></div>
                  <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-300 mb-2">বায়ো (ইংরেজি)</label><textarea name="bio_en" value={profileData.bio_en || ''} onChange={handleProfileChange} rows={2} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm resize-none" /></div>
                </div>
              </div>

              {/* যোগাযোগ ও সোশ্যাল মিডিয়া */}
              <div className="bg-[#0a0c10] border border-amber-500/20 rounded-2xl p-5 sm:p-7 shadow-lg">
                <h3 className="text-amber-400 font-bold border-b border-amber-500/20 pb-2 mb-4">যোগাযোগ ও সোশ্যাল মিডিয়া</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div><label className="block text-xs font-bold text-slate-300 mb-2">ইমেইল</label><input type="email" name="email" value={profileData.email || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-2">হোয়াটসঅ্যাপ নাম্বার</label><input type="text" name="whatsapp" value={profileData.whatsapp || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm" /></div>
                  <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-300 mb-2">লোকেশন / ঠিকানা</label><input type="text" name="location" value={profileData.location || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-2">YouTube লিংক</label><input type="text" name="youtube" value={profileData.youtube || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-2">Facebook লিংক</label><input type="text" name="facebook" value={profileData.facebook || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-2">Instagram লিংক</label><input type="text" name="instagram" value={profileData.instagram || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-2">LinkedIn লিংক</label><input type="text" name="linkedin" value={profileData.linkedin || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm" /></div>
                </div>
              </div>

              <button onClick={handleSaveProfile} disabled={isSaving} className="sm:hidden w-full flex items-center justify-center gap-2 bg-amber-500 text-black px-5 py-3.5 rounded-xl font-black text-sm shadow-lg"><Save className="w-4 h-4" /><span>সেভ করুন</span></button>
            </div>
          )}
          {activeTab === 'videos' && <AdminVideos />}
          {activeTab === 'designs' && <AdminDesigns />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </div>

      {/* মোবাইল বটম নেভিগেশন */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0c10]/95 border-t border-amber-500/30 flex items-center justify-around p-2 z-50">
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'profile' ? 'text-amber-400' : 'text-slate-400'}`}><User className="w-5 h-5" /><span className="text-[10px] font-bold">প্রোফাইল</span></button>
        <button onClick={() => setActiveTab('videos')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'videos' ? 'text-amber-400' : 'text-slate-400'}`}><Film className="w-5 h-5" /><span className="text-[10px] font-bold">ভিডিও</span></button>
        <button onClick={() => setActiveTab('designs')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'designs' ? 'text-amber-400' : 'text-slate-400'}`}><Palette className="w-5 h-5" /><span className="text-[10px] font-bold">ডিজাইন</span></button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'settings' ? 'text-amber-400' : 'text-slate-400'}`}><Settings className="w-5 h-5" /><span className="text-[10px] font-bold">সেটিংস</span></button>
      </div>
    </div>
  );
}