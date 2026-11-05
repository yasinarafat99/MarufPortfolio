// src/components/AdminSettings.tsx
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Settings, UploadCloud, FileText, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

export default function AdminSettings() {
  const [currentCv, setCurrentCv] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('settings').select('cv_url').eq('id', 1).single();
    if (data && data.cv_url) setCurrentCv(data.cv_url);
  };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3500);
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      showToast('দয়া করে শুধুমাত্র PDF ফাইল আপলোড করুন!', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('ফাইলের সাইজ ৫MB এর বেশি হওয়া যাবে না!', 'error');
      return;
    }

    setIsUploading(true);
    try {
      const fileName = `cv_${Date.now()}.pdf`;
      const filePath = `documents/${fileName}`;
      
      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      
      const { error: dbError } = await supabase.from('settings').upsert({ id: 1, cv_url: data.publicUrl, updated_at: new Date() });
      if (dbError) throw dbError;
      
      setCurrentCv(data.publicUrl);
      showToast('আপনার CV সফলভাবে আপডেট হয়েছে!', 'success');
      
    } catch (error: any) {
      showToast('CV আপলোড করতে সমস্যা হয়েছে: ' + error.message, 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative max-w-4xl mx-auto">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-8 right-8 z-[70] animate-in slide-in-from-right fade-in">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.15)]'}`}>
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-bold text-sm">{toast.msg}</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <Settings className="w-7 h-7 text-amber-400" />
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">ওয়েবসাইট সেটিংস</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">আপনার ওয়েবসাইটের গ্লোবাল সেটিংস এবং CV ম্যানেজ করুন</p>
        </div>
      </div>

      <div className="bg-[#0a0c10] border border-amber-500/20 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white">আপনার CV (Resume)</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#050608] border border-slate-800 p-6 rounded-2xl">
          <div className="w-24 h-24 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center relative shrink-0">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            ) : (
              <FileText className={`w-10 h-10 ${currentCv ? 'text-emerald-400' : 'text-slate-600'}`} />
            )}
            {currentCv && !isUploading && <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1"><CheckCircle className="w-4 h-4" /></div>}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-3 w-full">
            <div>
              <h4 className="text-sm font-bold text-white mb-1">নতুন PDF ফাইল আপলোড করুন</h4>
              <p className="text-xs text-slate-400">সর্বোচ্চ সাইজ: 5MB. আপলোড করার সাথে সাথেই মেনুবারে আপডেট হয়ে যাবে।</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <input type="file" accept="application/pdf" className="hidden" ref={fileInputRef} onChange={handleCvUpload} />
              
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer disabled:opacity-50">
                <UploadCloud className="w-4 h-4" />
                <span>{isUploading ? 'আপলোড হচ্ছে...' : 'CV আপলোড করুন'}</span>
              </button>

              {currentCv && (
                <a href={currentCv} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-700 hover:border-slate-500 text-sm font-semibold transition-all">
                  <ExternalLink className="w-4 h-4" />
                  <span>বর্তমান CV দেখুন</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}