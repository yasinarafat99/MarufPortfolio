import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Plus, Edit3, Trash2, CheckCircle, AlertCircle, BookOpen, GraduationCap, Award, Save, X, DownloadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface AcademicItem { id?: number; degree_bn: string; degree_en: string; year_bn: string; year_en: string; status_bn: string; status_en: string; icon: string; desc_bn: string; desc_en: string; }
export interface TrainingTopic { name_bn: string; name_en: string; tools: string; }
export interface TrainingData { id?: number; institution_bn: string; institution_en: string; course_name: string; batch: string; topics: TrainingTopic[]; }

const defaultAcademicsList: AcademicItem[] = [
  { degree_bn: 'দাওরায়ে হাদিস', degree_en: 'Dawra-e Hadith (Masters Equivalent)', year_bn: '২০২৬', year_en: '2026', status_bn: 'সমাপ্তি / প্রত্যাশিত', status_en: 'Final Year / Completed', icon: 'Award', desc_bn: 'ইসলামিক স্টাডিজ ও হাদিস শাস্ত্রের সর্বোচ্চ স্তর।', desc_en: 'Highest academic qualification in Islamic Studies & Hadith literature.' },
  { degree_bn: 'এইচএসসি (HSC)', degree_en: 'Higher Secondary Certificate (HSC)', year_bn: 'অধ্যয়নরত', year_en: 'Ongoing', status_bn: 'অধ্যয়নরত', status_en: 'Currently Studying', icon: 'GraduationCap', desc_bn: 'উচ্চ মাধ্যমিক শিক্ষাক্রম চলমান।', desc_en: 'Pursuing higher secondary educational curriculum.' },
  { degree_bn: 'এসএসসি (SSC)', degree_en: 'Secondary School Certificate (SSC)', year_bn: '২০২৬', year_en: '2026', status_bn: 'পরীক্ষার্থী / সমাপ্তি', status_en: 'Batch 2026', icon: 'GraduationCap', desc_bn: 'মাধ্যমিক স্কুল সার্টিফিকেট পরীক্ষা।', desc_en: 'Secondary School Certificate examination curriculum.' },
  { degree_bn: 'হিফজুল কুরআন', degree_en: "Hifzul Qur'an", year_bn: '২০১৪', year_en: '2014', status_bn: 'সম্পন্ন', status_en: 'Completed', icon: 'BookOpen', desc_bn: 'সম্পূর্ণ পবিত্র কুরআন মুখস্থকরণ সম্পন্ন।', desc_en: "Successful memorization of the entire Holy Qur'an." },
];

const defaultTrainingList: TrainingData[] = [{
  institution_bn: 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট', institution_en: 'As-Sunnah Skill Development Institute', course_name: 'SBMC (Small Business Management Course)', batch: 'Batch 36', topics: [
    { name_bn: 'ভিডিও এডিটিং', name_en: 'Video Editing', tools: 'Premiere Pro & After Effects' },
    { name_bn: 'গ্রাফিক ডিজাইন', name_en: 'Graphic Design', tools: 'Photoshop, Illustrator & Canva Pro' },
    { name_bn: 'মেটা মার্কেটিং', name_en: 'Meta Marketing', tools: 'Facebook & Instagram Ads Strategy' },
    { name_bn: 'জেনারেটিভ এআই টুলস', name_en: 'Generative AI Tools', tools: 'Prompt Engineering, AI Visuals & Workflows' },
  ]
}];

export default function AdminEducation() {
  const [loading, setLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  
  const [academics, setAcademics] = useState<AcademicItem[]>([]);
  const [trainings, setTrainings] = useState<TrainingData[]>([]);

  const [academicModal, setAcademicModal] = useState<{ show: boolean; data: AcademicItem | null }>({ show: false, data: null });
  const [trainingModal, setTrainingModal] = useState<{ show: boolean; data: TrainingData | null }>({ show: false, data: null });
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });

  const emptyAcademic: AcademicItem = { degree_bn: '', degree_en: '', year_bn: '', year_en: '', status_bn: '', status_en: '', icon: 'GraduationCap', desc_bn: '', desc_en: '' };
  const [academicForm, setAcademicForm] = useState<AcademicItem>(emptyAcademic);
  
  const emptyTraining: TrainingData = { institution_bn: '', institution_en: '', course_name: '', batch: '', topics: Array(4).fill({ name_bn: '', name_en: '', tools: '' }) };
  const [trainingForm, setTrainingForm] = useState<TrainingData>(emptyTraining);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [academicRes, trainingRes] = await Promise.all([
      supabase.from('academic_items').select('*').order('id', { ascending: true }),
      supabase.from('training_data').select('*').order('id', { ascending: true }) // limit(1) বাদ দেওয়া হয়েছে
    ]);
    if (academicRes.data) setAcademics(academicRes.data);
    if (trainingRes.data) setTrainings(trainingRes.data);
    setLoading(false);
  };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3500);
  };

  const handleImportDefaults = async () => {
    setIsImporting(true);
    try {
      if (academics.length === 0) await supabase.from('academic_items').insert(defaultAcademicsList);
      if (trainings.length === 0) await supabase.from('training_data').insert(defaultTrainingList);
      showToast('ডিফল্ট ডাটা সফলভাবে ডাটাবেসে সেভ হয়েছে!', 'success');
      await fetchData();
    } catch (err: any) { showToast('ডাটা ইম্পোর্ট করতে সমস্যা হয়েছে!', 'error'); }
    setIsImporting(false);
  };

  // --- Academic Handlers ---
  const handleOpenAcademicModal = (item?: AcademicItem) => {
    setAcademicForm(item || emptyAcademic);
    setAcademicModal({ show: true, data: item || null });
  };
  const handleSaveAcademic = async () => {
    setIsSaving(true);
    try {
      if (academicModal.data?.id) await supabase.from('academic_items').update(academicForm).eq('id', academicModal.data.id);
      else await supabase.from('academic_items').insert([academicForm]);
      showToast(academicModal.data?.id ? 'একাডেমিক তথ্য আপডেট হয়েছে!' : 'নতুন একাডেমিক তথ্য যুক্ত হয়েছে!');
      setAcademicModal({ show: false, data: null });
      fetchData();
    } catch (err) { showToast('সেভ করতে সমস্যা হয়েছে!', 'error'); }
    setIsSaving(false);
  };
  const handleDeleteAcademic = async (id: number) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এটি মুছে ফেলতে চান?')) return;
    try {
      await supabase.from('academic_items').delete().eq('id', id);
      showToast('তথ্য মুছে ফেলা হয়েছে!', 'success');
      fetchData();
    } catch (err) { showToast('ডিলিট করতে সমস্যা হয়েছে!', 'error'); }
  };

  // --- Training Handlers ---
  const handleOpenTrainingModal = (item?: TrainingData) => {
    setTrainingForm(item || emptyTraining);
    setTrainingModal({ show: true, data: item || null });
  };
  const handleSaveTraining = async () => {
    setIsSaving(true);
    try {
      if (trainingModal.data?.id) await supabase.from('training_data').update(trainingForm).eq('id', trainingModal.data.id);
      else await supabase.from('training_data').insert([trainingForm]);
      showToast(trainingModal.data?.id ? 'ট্রেনিং তথ্য আপডেট হয়েছে!' : 'নতুন ট্রেনিং যুক্ত হয়েছে!');
      setTrainingModal({ show: false, data: null });
      fetchData();
    } catch (err) { showToast('সেভ করতে সমস্যা হয়েছে!', 'error'); }
    setIsSaving(false);
  };
  const handleDeleteTraining = async (id: number) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই ট্রেনিংটি মুছে ফেলতে চান?')) return;
    try {
      await supabase.from('training_data').delete().eq('id', id);
      showToast('ট্রেনিং মুছে ফেলা হয়েছে!', 'success');
      fetchData();
    } catch (err) { showToast('ডিলিট করতে সমস্যা হয়েছে!', 'error'); }
  };

  const updateTopic = (index: number, field: keyof TrainingTopic, value: string) => {
    const newTopics = [...trainingForm.topics];
    newTopics[index] = { ...newTopics[index], [field]: value };
    setTrainingForm({ ...trainingForm, topics: newTopics });
  };

  return (
    <div className="relative min-h-full">
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

      <div className="sticky top-0 z-[60] bg-[#050608] border-b border-amber-500/20 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between gap-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 lg:-mt-8 pt-4 sm:pt-6 lg:pt-8 mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">এডুকেশন ও ট্রেনিং</h2>
          <p className="text-slate-400 mt-0.5 sm:mt-1 text-[10px] sm:text-sm hidden xs:block">একাডেমিক যোগ্যতা এবং প্রফেশনাল স্কিল ম্যানেজ করুন</p>
        </div>
      </div>

      <div className="space-y-8">
        {!loading && academics.length === 0 && trainings.length === 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-amber-400 font-bold text-base flex items-center gap-2"><DownloadCloud className="w-5 h-5" /> ডাটাবেস খালি আছে!</h4>
              <p className="text-slate-400 text-sm mt-1">আপনার ওয়েবসাইটের আগের ডিফল্ট ডাটাগুলো এক ক্লিকে ডাটাবেসে সেভ করতে ডানদিকের বাটনে ক্লিক করুন।</p>
            </div>
            <button onClick={handleImportDefaults} disabled={isImporting} className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-colors cursor-pointer w-full sm:w-auto">
              {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4" />}
              <span>ডিফল্ট ডাটা ইম্পোর্ট করুন</span>
            </button>
          </div>
        )}

        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2"><GraduationCap className="w-5 h-5" /> একাডেমিক যোগ্যতা</h3>
            <button onClick={() => handleOpenAcademicModal()} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-sm font-bold transition-colors cursor-pointer">
              <Plus className="w-4 h-4" /> <span className="hidden sm:block">নতুন যোগ করুন</span>
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse"><div className="bg-[#0a0c10] border border-amber-500/10 h-32 rounded-2xl"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {academics.map((item) => (
                <div key={item.id} className="bg-[#0a0c10] border border-amber-500/20 p-5 rounded-2xl flex items-start justify-between gap-4 hover:border-amber-400/50 transition-colors">
                  <div>
                    <h4 className="text-white font-bold">{item.degree_bn}</h4>
                    <p className="text-slate-400 text-xs mt-1">{item.year_bn} • {item.status_bn}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleOpenAcademicModal(item)} className="p-2 text-slate-400 hover:text-amber-400 bg-white/5 rounded-lg cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteAcademic(item.id!)} className="p-2 text-slate-400 hover:text-red-400 bg-white/5 rounded-lg cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {academics.length === 0 && <p className="text-slate-500 text-sm">কোনো একাডেমিক তথ্য নেই।</p>}
            </div>
          )}
        </section>

        {/* Training Section - Now supports MULTIPLE items with Add Button */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2"><Award className="w-5 h-5" /> প্রফেশনাল স্কিল ট্রেনিং</h3>
            <button onClick={() => handleOpenTrainingModal()} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-sm font-bold transition-colors cursor-pointer">
              <Plus className="w-4 h-4" /> <span className="hidden sm:block">নতুন যোগ করুন</span>
            </button>
          </div>

          {loading ? (
            <div className="bg-[#0a0c10] border border-amber-500/10 h-40 rounded-2xl animate-pulse"></div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {trainings.map((t) => (
                <div key={t.id} className="bg-[#0a0c10] border border-amber-500/20 p-5 rounded-2xl flex flex-col sm:flex-row items-start justify-between gap-4 hover:border-amber-400/50 transition-colors">
                  <div className="w-full">
                    <h4 className="text-lg font-bold text-white mb-1">{t.institution_bn}</h4>
                    <p className="text-amber-400 text-sm font-semibold mb-3">{t.course_name} • {t.batch}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {t.topics.map((topic, i) => (
                        topic.name_bn && (
                          <div key={i} className="bg-white/5 p-2 rounded-lg border border-white/10">
                            <p className="text-white text-xs font-bold truncate">{topic.name_bn}</p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-start mt-2 sm:mt-0">
                    <button onClick={() => handleOpenTrainingModal(t)} className="p-2 text-slate-400 hover:text-amber-400 bg-white/5 rounded-lg cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteTraining(t.id!)} className="p-2 text-slate-400 hover:text-red-400 bg-white/5 rounded-lg cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {trainings.length === 0 && <p className="text-slate-500 text-sm bg-[#0a0c10] p-6 rounded-2xl border border-white/5">কোনো ট্রেনিং ডেটা যুক্ত করা হয়নি।</p>}
            </div>
          )}
        </section>
      </div>

      {/* --- Academic Modal --- */}
      <AnimatePresence>
        {academicModal.show && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#050608]/90 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="w-full max-w-2xl bg-[#0a0c10] border border-amber-500/20 rounded-3xl shadow-2xl my-8">
              <div className="sticky top-0 bg-[#0a0c10] border-b border-white/10 p-5 flex items-center justify-between rounded-t-3xl z-10">
                <h3 className="text-lg font-bold text-white">{academicModal.data ? 'একাডেমিক তথ্য এডিট করুন' : 'নতুন একাডেমিক তথ্য'}</h3>
                <button onClick={() => setAcademicModal({ show: false, data: null })} className="text-slate-400 hover:text-white p-1 cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-slate-400 mb-1.5">ডিগ্রির নাম (বাংলা)</label><input type="text" value={academicForm.degree_bn} onChange={e => setAcademicForm({...academicForm, degree_bn: e.target.value})} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-amber-400" /></div>
                  <div><label className="block text-xs font-bold text-slate-400 mb-1.5">ডিগ্রির নাম (ইংরেজি)</label><input type="text" value={academicForm.degree_en} onChange={e => setAcademicForm({...academicForm, degree_en: e.target.value})} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-amber-400" /></div>
                  
                  <div><label className="block text-xs font-bold text-slate-400 mb-1.5">পাসের সন (বাংলা)</label><input type="text" value={academicForm.year_bn} onChange={e => setAcademicForm({...academicForm, year_bn: e.target.value})} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-amber-400" /></div>
                  <div><label className="block text-xs font-bold text-slate-400 mb-1.5">পাসের সন (ইংরেজি)</label><input type="text" value={academicForm.year_en} onChange={e => setAcademicForm({...academicForm, year_en: e.target.value})} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-amber-400" /></div>
                  
                  <div><label className="block text-xs font-bold text-slate-400 mb-1.5">বর্তমান অবস্থা (বাংলা)</label><input type="text" value={academicForm.status_bn} onChange={e => setAcademicForm({...academicForm, status_bn: e.target.value})} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-amber-400" placeholder="যেমন: সমাপ্তি / অধ্যয়নরত" /></div>
                  <div><label className="block text-xs font-bold text-slate-400 mb-1.5">বর্তমান অবস্থা (ইংরেজি)</label><input type="text" value={academicForm.status_en} onChange={e => setAcademicForm({...academicForm, status_en: e.target.value})} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-amber-400" /></div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">আইকন নির্বাচন করুন</label>
                  <select value={academicForm.icon} onChange={e => setAcademicForm({...academicForm, icon: e.target.value})} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-amber-400">
                    <option value="GraduationCap">Graduation Cap (School/College)</option>
                    <option value="Award">Award (Masters/Degree)</option>
                    <option value="BookOpen">Book Open (Quran/Religious)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-slate-400 mb-1.5">বিবরণ (বাংলা)</label><textarea value={academicForm.desc_bn} onChange={e => setAcademicForm({...academicForm, desc_bn: e.target.value})} rows={3} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-amber-400 resize-none" /></div>
                  <div><label className="block text-xs font-bold text-slate-400 mb-1.5">বিবরণ (ইংরেজি)</label><textarea value={academicForm.desc_en} onChange={e => setAcademicForm({...academicForm, desc_en: e.target.value})} rows={3} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-amber-400 resize-none" /></div>
                </div>
              </div>
              <div className="p-5 border-t border-white/10 bg-[#0a0c10] rounded-b-3xl">
                <button onClick={handleSaveAcademic} disabled={isSaving} className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold transition-colors cursor-pointer">
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} সেভ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Training Modal --- */}
      <AnimatePresence>
        {trainingModal.show && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#050608]/90 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="w-full max-w-2xl bg-[#0a0c10] border border-amber-500/20 rounded-3xl shadow-2xl my-8">
              <div className="sticky top-0 bg-[#0a0c10] border-b border-white/10 p-5 flex items-center justify-between rounded-t-3xl z-10">
                <h3 className="text-lg font-bold text-white">{trainingModal.data ? 'ট্রেনিং তথ্য এডিট করুন' : 'নতুন ট্রেনিং যুক্ত করুন'}</h3>
                <button onClick={() => setTrainingModal({ show: false, data: null })} className="text-slate-400 hover:text-white p-1 cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">ইনস্টিটিউটের তথ্য</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs font-bold text-slate-400 mb-1.5">ইনস্টিটিউটের নাম (বাংলা)</label><input type="text" value={trainingForm.institution_bn} onChange={e => setTrainingForm({...trainingForm, institution_bn: e.target.value})} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm" /></div>
                    <div><label className="block text-xs font-bold text-slate-400 mb-1.5">ইনস্টিটিউটের নাম (ইংরেজি)</label><input type="text" value={trainingForm.institution_en} onChange={e => setTrainingForm({...trainingForm, institution_en: e.target.value})} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm" /></div>
                    <div><label className="block text-xs font-bold text-slate-400 mb-1.5">কোর্সের নাম</label><input type="text" value={trainingForm.course_name} onChange={e => setTrainingForm({...trainingForm, course_name: e.target.value})} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm" /></div>
                    <div><label className="block text-xs font-bold text-slate-400 mb-1.5">ব্যাচ</label><input type="text" value={trainingForm.batch} onChange={e => setTrainingForm({...trainingForm, batch: e.target.value})} className="w-full bg-[#050608] border border-white/10 rounded-xl p-3 text-white text-sm" /></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">৪টি প্রধান স্কিল/টপিক</h4>
                  {trainingForm.topics.map((topic, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-xl space-y-3 border border-white/5">
                      <p className="text-xs text-slate-400 font-bold">স্কিল {i + 1}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input type="text" placeholder="নাম (বাংলা)" value={topic.name_bn} onChange={e => updateTopic(i, 'name_bn', e.target.value)} className="w-full bg-[#050608] border border-white/10 rounded-lg p-2.5 text-white text-sm" />
                        <input type="text" placeholder="নাম (ইংরেজি)" value={topic.name_en} onChange={e => updateTopic(i, 'name_en', e.target.value)} className="w-full bg-[#050608] border border-white/10 rounded-lg p-2.5 text-white text-sm" />
                        <input type="text" placeholder="সফটওয়্যার/টুলসের নাম" value={topic.tools} onChange={e => updateTopic(i, 'tools', e.target.value)} className="w-full bg-[#050608] border border-white/10 rounded-lg p-2.5 text-white text-sm sm:col-span-2" />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className="p-5 border-t border-white/10 bg-[#0a0c10] rounded-b-3xl">
                <button onClick={handleSaveTraining} disabled={isSaving} className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold transition-colors cursor-pointer">
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} সেভ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}