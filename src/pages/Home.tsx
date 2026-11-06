// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import BackgroundGrid from '../components/BackgroundGrid';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PortfolioSection from '../components/Portfolio';
import Expertise from '../components/Expertise';
// import Education from '../components/Education';
import Education, { AcademicItem, TrainingData } from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// আমাদের নতুন বানানো হুক ইম্পোর্ট করা হলো
import { useProfile } from '../hooks/useProfile';

export default function Home() {
  const { profile, isLoading } = useProfile(); // হুক থেকে ডেটা নেওয়া হচ্ছে

  const [lang, setLang] = useState<'en' | 'bn'>(() => {
    const saved = localStorage.getItem('noman_portfolio_lang');
    return saved === 'bn' ? 'bn' : 'en';
  });

  const [avatarUrl] = useState(() => {
    const saved = localStorage.getItem('noman_avatar_url');
    if (!saved || saved.includes('images.unsplash.com') || saved.includes('farabi-avatar')) {
      return profile.defaultAvatar;
    }
    return saved;
  });

  // এডুকেশন এবং ট্রেনিংয়ের ডেটা রাখার জন্য নতুন স্টেট
  const [academics, setAcademics] = useState<AcademicItem[]>([]);
  const [trainings, setTrainings] = useState<TrainingData[]>([]);


  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'bn' : 'en';
    setLang(nextLang);
    localStorage.setItem('noman_portfolio_lang', nextLang);
    document.documentElement.lang = nextLang;
  };



  // ফ্রন্টএন্ডে ডেটাবেসের প্রোফাইল রাখার স্টেট
  const [dbProfile, setDbProfile] = useState<any>(null);

  // Supabase থেকে profiles টেবিলের ডাটা লোড করা
  useEffect(() => {
    const fetchProfileData = async () => {
      const { data } = await supabase.from('profiles').select('*').maybeSingle();
      if (data) {
        setDbProfile(data);
      }
    };
    fetchProfileData();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);



  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const [academicRes, trainingRes] = await Promise.all([
            supabase.from('academic_items').select('*').order('id', { ascending: true }),
            
            // এখানে আগের limit(1).maybeSingle() মুছে দিয়ে শুধু order ব্যবহার করতে হবে
            supabase.from('training_data').select('*').order('id', { ascending: true }) 
          ]);

        if (academicRes.data) setAcademics(academicRes.data);
        if (trainingRes.data) setTrainings(trainingRes.data);
      } catch (error) {
        console.error("Education data fetch error:", error);
      }
    };

    fetchEducationData();
  }, []); // শুধু প্রথমবার লোড হওয়ার সময় কল হবে

  // ডাইনামিক ডেটা লোড হওয়ার সময় প্রফেশনাল স্কেলিটন লোডার দেখাবে
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050608] text-slate-100 relative overflow-hidden">
        {/* Navbar Skeleton */}
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 lg:px-8 animate-pulse bg-[#0a0c10]/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-800/60"></div>
            <div className="space-y-2 hidden sm:block">
              <div className="h-4 w-32 bg-slate-800/60 rounded"></div>
              <div className="h-2.5 w-24 bg-slate-800/60 rounded"></div>
            </div>
          </div>
          <div className="hidden xl:flex gap-3">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-16 h-8 bg-slate-800/60 rounded-full"></div>)}
          </div>
        </div>

        {/* Hero Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-pulse">
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
            <div className="w-32 h-8 bg-slate-800/60 rounded-full mx-auto lg:mx-0"></div>
            <div className="h-16 sm:h-24 bg-slate-800/60 rounded-xl w-3/4 mx-auto lg:mx-0"></div>
            <div className="h-8 sm:h-10 bg-slate-800/60 rounded-xl w-2/3 mx-auto lg:mx-0"></div>
            <div className="h-20 sm:h-24 bg-slate-800/60 rounded-xl w-full max-w-xl mx-auto lg:mx-0"></div>
            <div className="flex gap-4 pt-4 justify-center lg:justify-start">
              <div className="w-32 h-12 bg-slate-800/60 rounded-xl"></div>
              <div className="w-32 h-12 bg-slate-800/60 rounded-xl"></div>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[320px] sm:w-[380px] h-[450px] sm:h-[500px] bg-slate-800/40 rounded-3xl border border-slate-700/30"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050608] text-slate-100 selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      <BackgroundGrid />
      
      {/* profile ডেটা কম্পোনেন্টগুলোতে পাস করা হচ্ছে */}
      <Navbar lang={lang} onToggleLang={toggleLang} profile={profile} />
      
      <main id="main-content" className="relative z-10">
        <Hero lang={lang} avatarUrl={dbProfile?.avatar_url || ''} profile={dbProfile || profile} />
        <PortfolioSection lang={lang} />
        <Expertise lang={lang} />
        <Education lang={lang} academics={academics} trainings={trainings}/>
        <Contact lang={lang} profile={profile} />
      </main>

      <Footer lang={lang} profile={profile} />
    </div>
  );
}