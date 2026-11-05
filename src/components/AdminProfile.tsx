// src/components/AdminProfile.tsx
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Save, CheckCircle, Camera, UploadCloud, Trash2, AlertCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });

  const defaultProfile = { name: '', name_en: '', bio: '', bio_en: '', email: '', whatsapp: '', location: '', youtube: '', facebook: '', instagram: '', linkedin: '', avatar_url: '' };
  const [profileData, setProfileData] = useState(defaultProfile);
  const [originalProfileData, setOriginalProfileData] = useState(defaultProfile);

  const isDirty = JSON.stringify(profileData) !== JSON.stringify(originalProfileData);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await supabase.from('profiles').select('*').maybeSingle();
    if (data) {
      setProfileData(data);
      setOriginalProfileData(data); 
    }
  };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3500);
  };

  const getStoragePathFromUrl = (url: string) => {
    if (!url) return null;
    const parts = url.split('/portfolio-assets/');
    return parts.length === 2 ? parts[1] : null;
  };

  const executeDeleteImage = async () => {
    setDeleteModal(false);
    setIsUploadingImage(true);
    try {
      const oldPath = getStoragePathFromUrl(profileData.avatar_url);
      if (oldPath) await supabase.storage.from('portfolio-assets').remove([oldPath]);

      const { data: existingData } = await supabase.from('profiles').select('id').maybeSingle();
      if (existingData) {
        await supabase.from('profiles').update({ avatar_url: '' }).eq('id', existingData.id);
      }
      
      const updatedData = { ...profileData, avatar_url: '' };
      setProfileData(updatedData);
      setOriginalProfileData(updatedData); 
      showToast('ছবি সফলভাবে মুছে ফেলা হয়েছে!', 'success');
    } catch (error: any) {
      showToast('ছবি মুছতে সমস্যা হয়েছে: ' + error.message, 'error');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast('ছবির সাইজ ৫MB এর বেশি হওয়া যাবে না!', 'error'); return; }
    
    setIsUploadingImage(true);
    try {
      const oldPath = getStoragePathFromUrl(profileData.avatar_url);
      if (oldPath) await supabase.storage.from('portfolio-assets').remove([oldPath]);

      const fileExt = file.name.split('.').pop();
      const fileName = `hero_${Date.now()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;
      
      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      const newUrl = data.publicUrl;

      const { data: existingData } = await supabase.from('profiles').select('id').maybeSingle();
      if (existingData) {
        await supabase.from('profiles').update({ avatar_url: newUrl }).eq('id', existingData.id);
      } else {
        await supabase.from('profiles').insert([{ ...profileData, avatar_url: newUrl }]);
      }
      
      const updatedData = { ...profileData, avatar_url: newUrl };
      setProfileData(updatedData);
      setOriginalProfileData(updatedData); 
      showToast('নতুন ছবি সফলভাবে সেট করা হয়েছে!', 'success');
    } catch (error: any) {
      showToast('ছবি আপলোড করতে সমস্যা হয়েছে: ' + error.message, 'error');
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSaveProfile = async () => {
    if (!isDirty) return; 
    setIsSaving(true);
    try {
      const { data: existingData } = await supabase.from('profiles').select('id').maybeSingle();
      if (existingData) {
        await supabase.from('profiles').update(profileData).eq('id', existingData.id);
      } else {
        await supabase.from('profiles').insert([profileData]);
      }
      setOriginalProfileData(profileData); 
      showToast('প্রোফাইল সফলভাবে আপডেট হয়েছে!', 'success');
    } catch (err: any) {
      showToast('সেভ করতে সমস্যা হয়েছে!', 'error');
    }
    setIsSaving(false);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* টোস্ট নোটিফিকেশন */}
      <AnimatePresence>
        {toast.show && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="fixed top-20 md:top-8 right-4 md:right-8 z-[100]">
            <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
              {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="font-bold text-sm">{toast.msg}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ডিলিট মোডাল */}
      <AnimatePresence>
        {deleteModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#050608]/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-sm bg-[#0a0c10] border border-amber-500/20 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-5 mx-auto border border-red-500/20">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-black text-white text-center mb-2">ছবি মুছে ফেলবেন?</h3>
              <p className="text-slate-400 text-sm text-center mb-8">এই হিরো ইমেজটি পাকাপাকিভাবে স্টোরেজ থেকে ডিলিট হয়ে যাবে।</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteModal(false)} className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-white/5 hover:bg-white/10 text-white cursor-pointer">বাতিল</button>
                <button onClick={executeDeleteImage} className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 cursor-pointer">ডিলিট করুন</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* স্টিকি হেডার */}
      <div className="sticky top-0 z-40 bg-[#050608]/95 backdrop-blur-xl border-b border-amber-500/20 py-4 -mx-4 px-4 sm:-mx-8 sm:px-8 mb-6 flex items-center justify-between gap-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]">
        <div>
          <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">প্রোফাইল সেটিংস</h2>
          <p className="text-slate-400 mt-0.5 sm:mt-1 text-[10px] sm:text-sm hidden xs:block">আপনার পোর্টফোলিওর মূল তথ্যগুলো আপডেট করুন</p>
        </div>
        <button onClick={handleSaveProfile} disabled={!isDirty || isSaving} className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${isDirty ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 cursor-pointer' : 'bg-white/5 text-slate-500 border border-slate-700 cursor-not-allowed'}`}>
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : (isDirty ? <Save className="w-4 h-4" /> : <CheckCircle className="w-4 h-4 opacity-50" />)}
          <span>{isSaving ? 'সেভ হচ্ছে...' : (isDirty ? 'সেভ করুন' : 'সেভ করা আছে')}</span>
        </button>
      </div>

      {/* মেইন কন্টেন্ট */}
      <div className="space-y-6">
        {/* ছবি আপলোড */}
        <div className="bg-[#0a0c10] border border-amber-500/20 rounded-2xl p-5 sm:p-7 shadow-lg">
          <h3 className="text-amber-400 font-bold border-b border-amber-500/20 pb-2 mb-5">আপনার ছবি (হিরো ইমেজ)</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-32 h-32 rounded-full border-2 border-amber-500/40 p-1 overflow-hidden bg-slate-900 flex shrink-0 items-center justify-center">
              {isUploadingImage ? <Loader2 className="w-8 h-8 text-amber-400 animate-spin" /> : (profileData.avatar_url ? <img src={profileData.avatar_url} alt="Profile" className="w-full h-full object-cover rounded-full" /> : <Camera className="w-10 h-10 text-slate-600" />)}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-slate-300 text-sm mb-3">হোম পেজে প্রদর্শনের জন্য একটি সুন্দর ছবি আপলোড করুন। (সর্বোচ্চ 5MB)</p>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
              <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingImage} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/30 font-bold text-sm cursor-pointer">
                  <UploadCloud className="w-4 h-4" /> <span>{isUploadingImage ? 'আপলোড হচ্ছে...' : (profileData.avatar_url ? 'রিপ্লেস করুন' : 'ছবি আপলোড করুন')}</span>
                </button>
                {profileData.avatar_url && (
                  <button type="button" onClick={() => setDeleteModal(true)} disabled={isUploadingImage} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-sm cursor-pointer">
                    <Trash2 className="w-4 h-4" /> <span>মুছে ফেলুন</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* প্রাথমিক তথ্য */}
        <div className="bg-[#0a0c10] border border-amber-500/20 rounded-2xl p-5 sm:p-7 shadow-lg">
          <h3 className="text-amber-400 font-bold border-b border-amber-500/20 pb-2 mb-4">প্রাথমিক তথ্য</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="block text-xs font-bold text-slate-300 mb-2">নাম (বাংলা)</label><input type="text" name="name" value={profileData.name || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm focus:border-amber-400 focus:outline-none" /></div>
            <div><label className="block text-xs font-bold text-slate-300 mb-2">নাম (ইংরেজি)</label><input type="text" name="name_en" value={profileData.name_en || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm focus:border-amber-400 focus:outline-none" /></div>
            <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-300 mb-2">বায়ো (বাংলা)</label><textarea name="bio" value={profileData.bio || ''} onChange={handleProfileChange} rows={2} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm resize-none focus:border-amber-400 focus:outline-none" /></div>
            <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-300 mb-2">বায়ো (ইংরেজি)</label><textarea name="bio_en" value={profileData.bio_en || ''} onChange={handleProfileChange} rows={2} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm resize-none focus:border-amber-400 focus:outline-none" /></div>
          </div>
        </div>

        {/* যোগাযোগ ও সোশ্যাল মিডিয়া */}
        <div className="bg-[#0a0c10] border border-amber-500/20 rounded-2xl p-5 sm:p-7 shadow-lg">
          <h3 className="text-amber-400 font-bold border-b border-amber-500/20 pb-2 mb-4">যোগাযোগ ও সোশ্যাল মিডিয়া</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="block text-xs font-bold text-slate-300 mb-2">ইমেইল</label><input type="email" name="email" value={profileData.email || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm focus:border-amber-400 focus:outline-none" /></div>
            <div><label className="block text-xs font-bold text-slate-300 mb-2">হোয়াটসঅ্যাপ নাম্বার</label><input type="text" name="whatsapp" value={profileData.whatsapp || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm focus:border-amber-400 focus:outline-none" /></div>
            <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-300 mb-2">লোকেশন / ঠিকানা</label><input type="text" name="location" value={profileData.location || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm focus:border-amber-400 focus:outline-none" /></div>
            <div><label className="block text-xs font-bold text-slate-300 mb-2">YouTube লিংক</label><input type="text" name="youtube" value={profileData.youtube || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm focus:border-amber-400 focus:outline-none" /></div>
            <div><label className="block text-xs font-bold text-slate-300 mb-2">Facebook লিংক</label><input type="text" name="facebook" value={profileData.facebook || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm focus:border-amber-400 focus:outline-none" /></div>
            <div><label className="block text-xs font-bold text-slate-300 mb-2">Instagram লিংক</label><input type="text" name="instagram" value={profileData.instagram || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm focus:border-amber-400 focus:outline-none" /></div>
            <div><label className="block text-xs font-bold text-slate-300 mb-2">LinkedIn লিংক</label><input type="text" name="linkedin" value={profileData.linkedin || ''} onChange={handleProfileChange} className="w-full bg-[#050608] border border-amber-500/20 rounded-xl py-3 px-4 text-white text-sm focus:border-amber-400 focus:outline-none" /></div>
          </div>
        </div>
      </div>
    </>
  );
}