// src/components/AdminDesigns.tsx
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Plus, Trash2, Palette, X, Edit2, AlertCircle, Image as ImageIcon, UploadCloud, CheckCircle } from 'lucide-react';

export default function AdminDesigns() {
  const [designs, setDesigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [designToDelete, setDesignToDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialForm = {
    title: '', title_bn: '', category_label: '', category_label_bn: '', image: '', client: '',
    description: '', description_bn: '', dimensions: '', tools_used: '', key_features: '', key_features_bn: ''
  };
  
  const [formData, setFormData] = useState(initialForm);
  const [originalData, setOriginalData] = useState(initialForm);

  useEffect(() => { fetchDesigns(); }, []);

  const fetchDesigns = async () => {
    const { data } = await supabase.from('designs').select('*').order('created_at', { ascending: false });
    if (data) setDesigns(data);
    setIsLoading(false);
  };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast('ছবির সাইজ ৫MB এর বেশি হওয়া যাবে না!', 'error'); return; }
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `designs/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      setFormData({ ...formData, image: data.publicUrl });
      showToast('ছবি সফলভাবে আপলোড হয়েছে!', 'success');
    } catch (error) {
      showToast('ছবি আপলোড করতে সমস্যা হয়েছে!', 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddNew = () => {
    setEditingId(null); setFormData(initialForm); setOriginalData(initialForm); setIsModalOpen(true);
  };

  const handleEdit = (design: any) => {
    setEditingId(design.id);
    const designData = {
      title: design.title || '', title_bn: design.title_bn || '', category_label: design.category_label || '', category_label_bn: design.category_label_bn || '', image: design.image || '', client: design.client || '',
      description: design.description || '', description_bn: design.description_bn || '', dimensions: design.dimensions || '', tools_used: design.tools_used || '', key_features: design.key_features || '', key_features_bn: design.key_features_bn || ''
    };
    setFormData(designData); setOriginalData(designData); setIsModalOpen(true);
  };

  const isDataChanged = JSON.stringify(formData) !== JSON.stringify(originalData);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) { showToast('একটি ডিজাইন ছবি আপলোড করুন!', 'error'); return; }
    if (editingId && !isDataChanged) return;
    setIsSaving(true);
    
    // টেক্সটকে Array-তে কনভার্ট করার ছোট্ট ফাংশন
    const toArray = (str: any) => {
      if (Array.isArray(str)) return str; // আগে থেকেই Array থাকলে কিছু করবে না
      return str ? str.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
    };

    // ডেটাবেসে পাঠানোর আগে tools এবং features গুলোকে Array করে দেওয়া হচ্ছে
    const dataToSave = { 
      ...formData,
      tools_used: toArray(formData.tools_used),
      key_features: toArray(formData.key_features),
      key_features_bn: toArray(formData.key_features_bn)
    };
    
    if (editingId) {
      const { error } = await supabase.from('designs').update(dataToSave).eq('id', editingId);
      if (error) {
        alert("Supabase Error: " + error.message);
        console.error(error);
        showToast('ডিজাইন আপডেট করতে সমস্যা হয়েছে!', 'error');
      } else {
        showToast('ডিজাইন সফলভাবে আপডেট হয়েছে!', 'success');
        setIsModalOpen(false); fetchDesigns();
      }
    } else {
      const { error } = await supabase.from('designs').insert([dataToSave]);
      if (error) {
        alert("Supabase Error: " + error.message);
        console.error(error);
        showToast('ডিজাইন যুক্ত করতে সমস্যা হয়েছে!', 'error');
      } else {
        showToast('ডিজাইন সফলভাবে যুক্ত হয়েছে!', 'success');
        setIsModalOpen(false); fetchDesigns();
      }
    }
    setIsSaving(false);
  };

  const confirmDelete = async () => {
    if (!designToDelete) return;
    await supabase.from('designs').delete().eq('id', designToDelete);
    setDesignToDelete(null); fetchDesigns(); showToast('ডিলিট করা হয়েছে!', 'success');
  };

  if (isLoading) return <div className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-400" /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {toast.show && (
        <div className="fixed top-8 right-8 z-[70] animate-in slide-in-from-right"><div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl backdrop-blur-md border ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>{toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}<span className="font-bold text-sm">{toast.msg}</span></div></div>
      )}

      <div className="flex items-center justify-between">
        <div><h2 className="text-xl sm:text-2xl font-black text-white">গ্রাফিক ডিজাইন প্রজেক্টস</h2><p className="text-sm text-slate-400 mt-1">সব কন্টেন্ট ফিল্ডসহ ডিজাইন ম্যানেজ করুন</p></div>
        <button onClick={handleAddNew} className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer hover:scale-105 transition-all"><Plus className="w-4 h-4" /> <span className="hidden sm:inline">নতুন ডিজাইন</span></button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {designs.map((design) => (
          <div key={design.id} className="bg-[#0a0c10] border border-amber-500/20 rounded-2xl overflow-hidden group flex flex-col">
            <div className="relative aspect-square bg-slate-900 border-b border-amber-500/20">
              <img src={design.image} alt={design.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => handleEdit(design)} className="p-2 text-white hover:text-amber-400 bg-black/80 rounded-lg cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button><button onClick={() => setDesignToDelete(design.id)} className="p-2 text-white hover:text-red-400 bg-black/80 rounded-lg cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button></div>
            </div>
            <div className="p-3"><h3 className="font-bold text-white text-sm line-clamp-1">{design.title_bn || design.title}</h3><p className="text-xs text-slate-400 mt-0.5">{design.category_label_bn || design.category_label}</p></div>
          </div>
        ))}
      </div>

      {designToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"><div className="bg-[#0a0c10] border border-red-500/30 max-w-sm rounded-3xl p-6 text-center"><AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" /><h3 className="text-xl font-bold text-white mb-2">আপনি কি নিশ্চিত?</h3><div className="flex gap-3 mt-6"><button onClick={() => setDesignToDelete(null)} className="flex-1 py-3 rounded-xl bg-white/5 text-white border border-slate-700 cursor-pointer">ক্যান্সেল</button><button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-red-500 text-white cursor-pointer">ডিলিট করুন</button></div></div></div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-[#0a0c10] border border-amber-500/30 w-full max-w-4xl rounded-3xl p-5 sm:p-6 relative max-h-[95vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-red-400 cursor-pointer"><X className="w-6 h-6" /></button>
            <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2"><Palette className="w-5 h-5 text-amber-400" />{editingId ? 'ডিজাইন আপডেট করুন' : 'নতুন ডিজাইন'}</h2>
            
            <form onSubmit={handleSave} className="space-y-6">
              
              <div className="p-4 border border-slate-800 rounded-2xl bg-slate-900/30">
                <label className="block text-xs font-bold text-amber-400 mb-2">ডিজাইন আপলোড করুন (অবশ্যই দিন)</label>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-xl bg-black border border-slate-700 flex items-center justify-center relative overflow-hidden">
                    {formData.image ? <img src={formData.image} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon className="w-6 h-6 text-slate-600" />}
                    {isUploading && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><Loader2 className="w-5 h-5 text-amber-400 animate-spin" /></div>}
                  </div>
                  <div className="flex-1">
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="flex items-center gap-2 py-2 px-4 rounded-xl bg-white/5 hover:bg-amber-500/20 text-slate-300 border border-slate-700 cursor-pointer"><UploadCloud className="w-4 h-4" /> <span className="text-sm">ছবি সিলেক্ট করুন</span></button>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-slate-800 rounded-2xl bg-slate-900/30 space-y-4">
                <h3 className="text-amber-400 text-sm font-bold border-b border-slate-800 pb-2">১. বেসিক ইনফো</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">টাইটেল (বাংলা)</label><input required type="text" name="title_bn" value={formData.title_bn} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 rounded-xl py-2 px-3 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">টাইটেল (ইংরেজি)</label><input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 rounded-xl py-2 px-3 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">ক্যাটাগরি (বাংলা)</label><input type="text" name="category_label_bn" value={formData.category_label_bn} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 rounded-xl py-2 px-3 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">ক্যাটাগরি (ইংরেজি)</label><input type="text" name="category_label" value={formData.category_label} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 rounded-xl py-2 px-3 text-white text-sm" /></div>
                </div>
              </div>

              <div className="p-4 border border-slate-800 rounded-2xl bg-slate-900/30 space-y-4">
                <h3 className="text-amber-400 text-sm font-bold border-b border-slate-800 pb-2">২. প্রজেক্ট ডিটেইলস (কমা দিয়ে আলাদা করুন)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">ক্লায়েন্টের নাম</label><input type="text" name="client" value={formData.client} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 rounded-xl py-2 px-3 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">ডাইমেনশন (যেমন: 1080x1080px)</label><input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 rounded-xl py-2 px-3 text-white text-sm" /></div>
                  
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">ডেসক্রিপশন (বাংলা)</label><textarea name="description_bn" value={formData.description_bn} onChange={handleChange} rows={3} className="w-full bg-[#050608] border border-slate-700 rounded-xl py-2 px-3 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">ডেসক্রিপশন (ইংরেজি)</label><textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-[#050608] border border-slate-700 rounded-xl py-2 px-3 text-white text-sm" /></div>
                  
                  <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-300 mb-1">ব্যবহৃত টুলস (যেমন: Photoshop, Illustrator)</label><input type="text" name="tools_used" value={formData.tools_used} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 rounded-xl py-2 px-3 text-white text-sm" /></div>
                  
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">কি-ফিচারস (বাংলা)</label><textarea name="key_features_bn" value={formData.key_features_bn} onChange={handleChange} rows={2} className="w-full bg-[#050608] border border-slate-700 rounded-xl py-2 px-3 text-white text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">কি-ফিচারস (ইংরেজি)</label><textarea name="key_features" value={formData.key_features} onChange={handleChange} rows={2} className="w-full bg-[#050608] border border-slate-700 rounded-xl py-2 px-3 text-white text-sm" /></div>
                </div>
              </div>
              
              <button type="submit" disabled={isSaving || (editingId !== null && !isDataChanged) || !formData.image} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-3.5 rounded-xl shadow-lg active:scale-95 transition-all disabled:opacity-50 cursor-pointer">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (editingId ? 'আপডেট করুন' : 'সেভ করুন')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}