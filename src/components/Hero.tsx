// src/components/Hero.tsx
import { useState, useEffect } from 'react';
import { Play, Sparkles, Film, Wand2, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

interface HeroProps {
  lang: 'en' | 'bn';
  avatarUrl: string;
  profile: any;
}

export default function Hero({ lang = 'en', avatarUrl, profile }: HeroProps) {
  const [cvUrl, setCvUrl] = useState<string>('');
  
  const firstName = profile.nameEn?.split(' ')[0] || 'VIDEO EDITOR &';
  const lastName = profile.nameEn?.split(' ')[1] || ' VISUAL DESIGNER';

  const heroImage = avatarUrl || '/noman-hero.png';

  // Fetch CV URL from settings table
  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('settings').select('cv_url').eq('id', 1).single();
      if (data && data.cv_url) setCvUrl(data.cv_url);
    };
    fetchSettings();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[85vh] sm:min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-5 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/15 via-yellow-600/8 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-5 left-5 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-center my-auto">
        
        {/* Mobile View */}
        <div className="lg:hidden flex flex-col items-center text-center max-w-xl mx-auto my-auto py-2">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0c10]/95 border border-amber-500/40 text-slate-200 text-xs font-semibold tracking-wider uppercase backdrop-blur-xl shadow-[0_0_16px_rgba(245,158,11,0.25)] mb-3 hover:scale-105 transition-transform duration-300 cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            </span>
            <span className="text-white font-bold">
              {lang === 'bn' ? 'ক্রিয়েটিভ ভিজ্যুয়ালাইজার' : 'Creative Visualizer'}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 font-bold">
              {lang === 'bn' ? 'ভিডিও এডিটর' : 'Video Editor'}
            </span>
          </motion.div>

          {/* Mobile Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl font-black tracking-tight uppercase leading-[0.95] mb-3 text-center select-none"
          >
            <span className="block text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              {firstName}
            </span>
            <span className="block bg-gradient-to-r from-[#ffd700] via-[#f59e0b] to-[#d97706] bg-clip-text text-transparent drop-shadow-[0_4px_32px_rgba(245,158,11,0.6)]">
              {lastName}
            </span>
          </motion.h1>

          {/* Mobile Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-end justify-center my-2 select-none w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[380px] h-[370px] xs:h-[400px] sm:h-[450px]"
          >
            <div className="absolute bottom-0 w-[270px] xs:w-[290px] sm:w-[325px] h-[270px] xs:h-[290px] sm:h-[315px] flex items-center justify-center pointer-events-none z-0">
              <div className="absolute -inset-3 sm:-inset-4 rounded-2xl sm:rounded-3xl bg-amber-500/22 blur-[26px] pointer-events-none" />
              <div
                className="w-[420px] h-[420px] rounded-full animate-spin-linear opacity-90 blur-[28px]"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, transparent 240deg, rgba(245,158,11,0.06) 260deg, rgba(245,158,11,0.3) 290deg, #f59e0b 325deg, #fbbf24 345deg, #ffd700 354deg, #ffffff 360deg)',
                }}
              />
            </div>

            <div className="absolute bottom-0 w-[270px] xs:w-[290px] sm:w-[325px] h-[270px] xs:h-[290px] sm:h-[315px] rounded-2xl sm:rounded-3xl p-[2px] shadow-[0_0_35px_rgba(245,158,11,0.25)] backdrop-blur-2xl overflow-hidden pointer-events-none z-10">
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-amber-500/40 pointer-events-none z-10" />
              <div className="absolute inset-[-100%] flex items-center justify-center pointer-events-none z-0">
                <div
                  className="w-[200%] h-[200%] animate-spin-linear"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, transparent 240deg, rgba(245,158,11,0.1) 265deg, rgba(245,158,11,0.45) 300deg, #f59e0b 330deg, #ffd700 352deg, #ffffff 360deg)',
                  }}
                />
              </div>
              <div className="relative w-full h-full rounded-[14px] sm:rounded-[22px] bg-gradient-to-b from-[#141724]/98 via-[#0b0d14]/98 to-[#050608] overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                  <div
                    className="w-[200%] h-full animate-cc-sweep"
                    style={{
                      background: 'linear-gradient(110deg, transparent 25%, rgba(245,158,11,0.03) 38%, rgba(254,240,138,0.16) 48%, rgba(255,255,255,0.22) 50%, rgba(254,240,138,0.16) 52%, rgba(245,158,11,0.03) 62%, transparent 75%)',
                    }}
                  />
                </div>
                <div className="absolute inset-2 rounded-xl sm:rounded-2xl border border-amber-500/25 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/85 to-transparent pointer-events-none z-10" />
              </div>
            </div>

            <div className="absolute bottom-0 w-[270px] xs:w-[290px] sm:w-[325px] h-full rounded-b-2xl sm:rounded-b-3xl overflow-hidden pointer-events-none z-20 flex items-end justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-[320px] xs:w-[340px] sm:w-[380px] h-full flex items-end justify-center flex-shrink-0 pointer-events-none"
              >
                <img
                  src={heroImage}
                  alt={profile.nameEn}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = 'true';
                      target.src = '/fallback-avatar.png'; // Updated to a local fallback
                    }
                  }}
                  className="w-auto h-full max-h-none object-contain object-bottom select-none pointer-events-none"
                  style={{
                    filter: `drop-shadow(0 0 4px rgba(245, 175, 25, 0.95)) drop-shadow(0 0 14px rgba(234, 179, 8, 0.75)) drop-shadow(0 0 28px rgba(217, 119, 6, 0.45)) contrast(106%) brightness(103%)`,
                  }}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center mt-3 sm:mt-4 space-y-3.5 z-20"
          >
            <p className="text-sm sm:text-base font-bold text-slate-300 leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-sm px-2 text-center">
              {lang === 'bn' ? (
                <>কাঁচা মুহূর্তগুলোকে রূপ দিই <span className="text-amber-400">চিরন্তন গল্পে</span></>
              ) : (
                <>Cutting Raw Moments into <span className="text-amber-400">Timeless Stories</span></>
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 px-3 relative z-20 w-full max-w-sm mx-auto">
              <a href="#portfolio" className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-white font-black text-xs sm:text-sm tracking-wide shadow-[0_4px_22px_rgba(245,158,11,0.55)] active:scale-95 transition-all duration-300 cursor-pointer border border-amber-200/90 text-center">
                <Play className="w-4 h-4 fill-white text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
                <span className="text-white font-black drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{lang === 'bn' ? 'প্রজেক্ট' : 'Projects'}</span>
              </a>
              <a href="#contact" className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white font-black text-xs sm:text-sm tracking-wide shadow-[0_4px_22px_rgba(245,158,11,0.55)] active:scale-95 transition-all duration-300 cursor-pointer border border-amber-200/90 text-center">
                <Sparkles className="w-4 h-4 text-white fill-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
                <span className="text-white font-black drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{lang === 'bn' ? 'কন্টাক্ট মি' : 'Contact Me'}</span>
              </a>
              
              {/* Updated Mobile View CV Button */}
              <a
                href={cvUrl || '#'}
                target={cvUrl ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide shadow-md active:scale-95 transition-all duration-300 cursor-pointer ${cvUrl ? 'bg-[#0a0c12]/95 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-[#0a0c12]/50 text-slate-500 border border-slate-700 cursor-not-allowed'}`}
              >
                <Eye className="w-4 h-4" />
                <span>{lang === 'bn' ? 'সিভি দেখুন (PDF)' : 'View CV (PDF)'}</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-7 text-left"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0a0c10]/95 border border-amber-500/40 text-slate-200 text-xs font-semibold tracking-wider uppercase backdrop-blur-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] w-fit hover:scale-105 transition-transform duration-300 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              </span>
              <span className="text-white font-bold tracking-wider">{lang === 'bn' ? 'ক্রিয়েটিভ ভিজ্যুয়ালাইজার' : 'Creative Visualizer'}</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400 font-bold tracking-wider">{lang === 'bn' ? 'ভিডিও এডিটর' : 'Video Editor'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-black tracking-tight leading-[0.93] uppercase select-none">
              <span className="block text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">{firstName}</span>
              <span className="block bg-gradient-to-r from-[#ffd700] via-[#f59e0b] to-[#d97706] bg-clip-text text-transparent drop-shadow-[0_4px_35px_rgba(245,158,11,0.55)]">{lastName}</span>
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-white tracking-tight leading-snug drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] max-w-xl">
              {lang === 'bn' ? (
                <>কাঁচা মুহূর্তগুলোকে রূপ দিই <span className="text-amber-400">চিরন্তন গল্পে</span></>
              ) : (
                <>Cutting Raw Moments into <span className="text-amber-400">Timeless Stories</span></>
              )}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {lang === 'bn' ? profile.bio : profile.bioEn}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a href="#portfolio" className="inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-white font-black text-sm tracking-wide shadow-[0_4px_25px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-amber-200/90">
                <Play className="w-4 h-4 fill-white text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
                <span className="text-white font-black drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{lang === 'bn' ? 'প্রজেক্ট' : 'Projects'}</span>
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white font-black text-sm tracking-wide shadow-[0_4px_25px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-amber-200/90">
                <Sparkles className="w-4 h-4 text-white fill-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
                <span className="text-white font-black drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{lang === 'bn' ? 'কন্টাক্ট মি' : 'Contact Me'}</span>
              </a>
              
              {/* Updated Desktop View CV Button */}
              <a
                href={cvUrl || '#'}
                target={cvUrl ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-black text-sm tracking-wide border-2 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${cvUrl ? 'bg-[#0a0c12]/95 hover:bg-amber-500/20 text-amber-300 hover:text-white border-amber-500/50 hover:border-amber-400 shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(245,158,11,0.2)]' : 'bg-[#0a0c12]/50 text-slate-500 border-slate-700 cursor-not-allowed'}`}
              >
                <Eye className="w-4 h-4" />
                <span>{lang === 'bn' ? 'সিভি দেখুন' : 'View CV'}</span>
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-[360px] sm:w-[400px] lg:w-[420px] h-[520px] sm:h-[550px] lg:h-[570px] flex items-end justify-center select-none group cursor-pointer">
              <div className="absolute bottom-0 w-[330px] sm:w-[360px] lg:w-[380px] h-[345px] sm:h-[370px] lg:h-[385px] flex items-center justify-center pointer-events-none z-0">
                <div className="absolute -inset-4 sm:-inset-5 rounded-3xl bg-amber-500/22 blur-[30px] pointer-events-none" />
                <div className="absolute w-[440px] h-[440px] rounded-full bg-amber-500/15 blur-[45px] pointer-events-none" />
                <div
                  className="w-[560px] h-[560px] rounded-full animate-spin-linear opacity-95 blur-[34px]"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, transparent 240deg, rgba(245,158,11,0.06) 260deg, rgba(245,158,11,0.3) 290deg, #f59e0b 325deg, #fbbf24 345deg, #ffd700 354deg, #ffffff 360deg)',
                  }}
                />
              </div>

              <div className="absolute bottom-0 w-[330px] sm:w-[360px] lg:w-[380px] h-[345px] sm:h-[370px] lg:h-[385px] rounded-3xl p-[2.5px] shadow-[0_0_40px_rgba(245,158,11,0.3)] backdrop-blur-2xl overflow-hidden pointer-events-none z-10">
                <div className="absolute inset-0 rounded-3xl border border-amber-500/40 pointer-events-none z-10" />
                <div className="absolute inset-[-100%] flex items-center justify-center pointer-events-none z-0">
                  <div
                    className="w-[200%] h-[200%] animate-spin-linear"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0deg, transparent 240deg, rgba(245,158,11,0.1) 265deg, rgba(245,158,11,0.45) 300deg, #f59e0b 330deg, #ffd700 352deg, #ffffff 360deg)',
                    }}
                  />
                </div>
                <div className="relative w-full h-full rounded-[21px] bg-gradient-to-b from-[#141724]/98 via-[#0b0d14]/98 to-[#050608] overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    <div
                      className="w-[200%] h-full animate-cc-sweep"
                      style={{
                        background: 'linear-gradient(110deg, transparent 25%, rgba(245,158,11,0.03) 38%, rgba(254,240,138,0.16) 48%, rgba(255,255,255,0.22) 50%, rgba(254,240,138,0.16) 52%, rgba(245,158,11,0.03) 62%, transparent 75%)',
                      }}
                    />
                  </div>
                  <div className="absolute inset-2.5 rounded-2xl border border-amber-500/25 pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/85 to-transparent pointer-events-none z-10" />
                </div>
              </div>

              <div className="absolute top-24 -left-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0c10]/95 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)] backdrop-blur-md hover:scale-110 transition-transform duration-300 cursor-default">
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>Video Editor</span>
              </div>

              <div className="absolute bottom-20 -right-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0c10]/95 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)] backdrop-blur-md hover:scale-110 transition-transform duration-300 cursor-default">
                <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Motion & Visuals</span>
              </div>

              <div className="absolute bottom-0 w-[330px] sm:w-[360px] lg:w-[380px] h-full rounded-b-3xl overflow-hidden pointer-events-none z-20 flex items-end justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 25 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-[380px] sm:w-[420px] lg:w-[440px] h-full flex items-end justify-center flex-shrink-0 pointer-events-none"
                >
                  <img
                    src={heroImage}
                    alt={profile.nameEn}
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallback) {
                        target.dataset.fallback = 'true';
                        target.src = '/fallback-avatar.png'; // Updated to a local fallback
                      }
                    }}
                    className="w-auto h-full max-h-none object-contain object-bottom select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{
                      filter: `drop-shadow(0 0 4px rgba(245, 175, 25, 0.95)) drop-shadow(0 0 14px rgba(234, 179, 8, 0.8)) drop-shadow(0 0 32px rgba(217, 119, 6, 0.45)) contrast(106%) brightness(103%)`,
                    }}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}