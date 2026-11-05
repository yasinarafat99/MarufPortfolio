// src/components/AdminVideos.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Plus, Trash2, Video, X, Edit2, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminVideos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  
  // Custom Premium Toast Notification State
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });
  
  const initialForm = {
    title: '', title_bn: '', category_label: '', category_label_bn: '', vimeo_embed_url: '', thumbnail: '', client: '',
    description: '', description_bn: '', duration: '', views: '', aspect_ratio: '16:9', tools_used: '', key_features: '', key_features_bn: ''
  };
  const [formData, setFormData] = useState(initialForm);
  const [originalData, setOriginalData] = useState(initialForm);

  useEffect(() => { fetchVideos(); }, []);

  const fetchVideos = async () => {
    const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
    if (data) setVideos(data);
    setIsLoading(false);
  };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === 'vimeo_embed_url' && value) {
      const ytMatch = value.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^"&?\/\s]{11})/);
      if (ytMatch && ytMatch[1]) {
        const videoId = ytMatch[1];
        newFormData.vimeo_embed_url = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        newFormData.thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      }
    }
    setFormData(newFormData);
  };

  const handleAddNew = () => {
    setEditingId(null); setFormData(initialForm); setOriginalData(initialForm); setIsModalOpen(true);
  };

  const handleEdit = (video: any) => {
    setEditingId(video.id);
    const videoData = {
      title: video.title || '', title_bn: video.title_bn || '', category_label: video.category_label || '', category_label_bn: video.category_label_bn || '', vimeo_embed_url: video.vimeo_embed_url || '', thumbnail: video.thumbnail || '', client: video.client || '',
      description: video.description || '', description_bn: video.description_bn || '', duration: video.duration || '', views: video.views || '', aspect_ratio: video.aspect_ratio || '16:9', tools_used: video.tools_used || '', key_features: video.key_features || '', key_features_bn: video.key_features_bn || ''
    };
    setFormData(videoData); setOriginalData(videoData); setIsModalOpen(true);
  };

  const isDataChanged = JSON.stringify(formData) !== JSON.stringify(originalData);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId && !isDataChanged) return;
    setIsSaving(true);

    const toArray = (str: any) => {
      if (Array.isArray(str)) return str;
      return str ? str.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
    };

    const dataToSave = { 
      ...formData,
      tools_used: toArray(formData.tools_used),
      key_features: toArray(formData.key_features),
      key_features_bn: toArray(formData.key_features_bn)
    };
    
    if (editingId) {
      const { error } = await supabase.from('videos').update(dataToSave).eq('id', editingId);
      if (error) {
        showToast("Error: " + error.message, 'error');
        console.error(error);
      } else {
        showToast('ভিডিও সফলভাবে আপডেট হয়েছে!', 'success');
        setIsModalOpen(false); 
        fetchVideos();
      }
    } else {
      const { error } = await supabase.from('videos').insert([dataToSave]);
      if (error) {
        showToast("Error: " + error.message, 'error');
        console.error(error);
      } else {
        showToast('নতুন ভিডিও সফলভাবে যুক্ত হয়েছে!', 'success');
        setIsModalOpen(false); 
        fetchVideos();
      }
    }
    setIsSaving(false);
  };

  const confirmDelete = async () => {
    if (!videoToDelete) return;
    await supabase.from('videos').delete().eq('id', videoToDelete);
    setVideoToDelete(null); 
    fetchVideos();
    showToast('ভিডিওটি ডিলিট করা হয়েছে!', 'success');
  };

  if (isLoading) return <div className="text-center py-10 text-amber-400"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Custom Premium Toast Notification */}
      {toast.show && (
        <div className="fixed top-8 right-8 z-[70] animate-in slide-in-from-right fade-in">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border ${
            toast.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
              : 'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
          }`}>
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-bold text-sm">{toast.msg}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">ভিডিও প্রজেক্টস</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">সব কন্টেন্ট ফিল্ডসহ ভিডিও ম্যানেজ করুন</p>
        </div>
        <button onClick={handleAddNew} className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer hover:scale-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]">
          <Plus className="w-4 h-4" /> <span className="hidden sm:inline">নতুন ভিডিও</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-[#0a0c10] border border-amber-500/20 p-4 rounded-2xl flex gap-4 items-center group shadow-lg hover:border-amber-500/40 transition-all">
            <img src={video.thumbnail || 'https://via.placeholder.com/150'} alt={video.title} className="w-24 h-16 object-cover rounded-lg border border-slate-800" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-sm line-clamp-1">{video.title_bn || video.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{video.category_label_bn || video.category_label}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleEdit(video)} className="p-2.5 text-slate-400 hover:text-amber-400 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => setVideoToDelete(video.id)} className="p-2.5 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {videoToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#0a0c10] border border-red-500/30 max-w-sm rounded-3xl p-6 text-center shadow-xl">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">আপনি কি নিশ্চিত?</h3>
            <p className="text-sm text-slate-400 mb-6">ভিডিওটি ডিলিট করলে তা আর ফেরত পাওয়া যাবে না।</p>
            <div className="flex gap-3">
              <button onClick={() => setVideoToDelete(null)} className="flex-1 py-3 rounded-xl bg-white/5 text-white border border-slate-700 hover:bg-white/10 transition-all cursor-pointer">ক্যান্সেল</button>
              <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all cursor-pointer">ডিলিট করুন</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
          <div className="bg-[#0a0c10] border border-amber-500/30 w-full max-w-4xl rounded-3xl p-5 sm:p-6 relative max-h-[95vh] overflow-y-auto shadow-[0_0_40px_rgba(245,158,11,0.15)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"><X className="w-6 h-6" /></button>
            <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2"><Video className="w-5 h-5 text-amber-400" />{editingId ? 'ভিডিও আপডেট করুন' : 'নতুন ভিডিও'}</h2>
            
            <form onSubmit={handleSave} className="space-y-6">
              {/* Basic Info */}
              <div className="p-4 border border-slate-800 rounded-2xl bg-slate-900/30 space-y-4">
                <h3 className="text-amber-400 text-sm font-bold border-b border-slate-800 pb-2">১. বেসিক ইনফো</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">টাইটেল (বাংলা)</label><input required type="text" name="title_bn" value={formData.title_bn} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">টাইটেল (ইংরেজি)</label><input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">ক্যাটাগরি (বাংলা)</label><input type="text" name="category_label_bn" value={formData.category_label_bn} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">ক্যাটাগরি (ইংরেজি)</label><input type="text" name="category_label" value={formData.category_label} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                </div>
              </div>

              {/* Media & Meta */}
              <div className="p-4 border border-slate-800 rounded-2xl bg-slate-900/30 space-y-4">
                <h3 className="text-amber-400 text-sm font-bold border-b border-slate-800 pb-2">২. মিডিয়া ও মেটাডেটা</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-amber-400 mb-1">ভিডিও লিংক (YouTube / Vimeo)</label>
                    <input required type="text" name="vimeo_embed_url" value={formData.vimeo_embed_url} onChange={handleChange} placeholder="https://youtube.com/shorts/..." className="w-full bg-[#050608] border border-amber-500/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" />
                  </div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">ক্লায়েন্টের নাম</label><input type="text" name="client" value={formData.client} onChange={handleChange} placeholder="যেমন: As-Sunnah Trust" className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">অ্যাসপেক্ট রেশিও</label>
                    <select name="aspect_ratio" value={formData.aspect_ratio} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all">
                      <option value="16:9">16:9 (Landscape)</option>
                      <option value="9:16">9:16 (Vertical/Shorts)</option>
                      <option value="4:3">4:3 (Standard)</option>
                      <option value="1:1">1:1 (Square)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><label className="block text-xs font-bold text-slate-300 mb-1">ডিউরেশন</label><input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="01:29" className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                    <div><label className="block text-xs font-bold text-slate-300 mb-1">ভিউজ</label><input type="text" name="views" value={formData.views} onChange={handleChange} placeholder="2M+" className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                  </div>
                </div>
              </div>

              {/* Rich Details */}
              <div className="p-4 border border-slate-800 rounded-2xl bg-slate-900/30 space-y-4">
                <h3 className="text-amber-400 text-sm font-bold border-b border-slate-800 pb-2">৩. প্রজেক্ট ডিটেইলস (কমা দিয়ে আলাদা করুন)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">ডেসক্রিপশন (বাংলা)</label><textarea name="description_bn" value={formData.description_bn} onChange={handleChange} rows={3} className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">ডেসক্রিপশন (ইংরেজি)</label><textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                  
                  <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-300 mb-1">ব্যবহৃত টুলস (যেমন: Premiere Pro, After Effects)</label><input type="text" name="tools_used" value={formData.tools_used} onChange={handleChange} className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                  
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">কি-ফিচারস (বাংলা)</label><textarea name="key_features_bn" value={formData.key_features_bn} onChange={handleChange} placeholder="অ্যানিমেশন, কালার গ্রেডিং" rows={2} className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">কি-ফিচারস (ইংরেজি)</label><textarea name="key_features" value={formData.key_features} onChange={handleChange} placeholder="Animation, Color Grading" rows={2} className="w-full bg-[#050608] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl py-2 px-3 text-white text-sm transition-all" /></div>
                </div>
              </div>
              
              <button type="submit" disabled={isSaving || (editingId !== null && !isDataChanged)} className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black py-3.5 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95 transition-all disabled:opacity-50 cursor-pointer">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (editingId ? 'আপডেট করুন' : 'সেভ করুন')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}