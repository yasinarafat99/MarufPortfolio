// src/components/VideoModal.tsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Monitor,
  Layers,
} from 'lucide-react';

interface VideoModalProps {
  project: any | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentIndex?: number;
  totalProjects?: number;
  lang: 'en' | 'bn';
}

export default function VideoModal({
  project,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex = 0,
  totalProjects = 6,
  lang,
}: VideoModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !project || !mounted) return null;

  const getFeatures = (featuresData: any) => {
    if (!featuresData) return [];
    if (Array.isArray(featuresData)) return featuresData;
    if (typeof featuresData === 'string') return featuresData.split(',');
    return [];
  };

  const keyFeatures = lang === 'bn' ? getFeatures(project.key_features_bn) : getFeatures(project.key_features);
  const toolsUsed = getFeatures(project.tools_used);
  const isVertical = project.aspect_ratio === '9:16' || project.aspectRatio === '9:16';

  // চেক করা হচ্ছে যে প্রজেক্টের কোনো ডিটেইলস আছে কি না
  const hasDetails = project.client || project.aspect_ratio || project.aspectRatio || project.views || project.duration || project.description || project.descriptionBn || project.description_bn || toolsUsed.length > 0 || keyFeatures.length > 0;

  const modalContent = (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-2 sm:p-4 md:p-6" style={{ isolation: 'isolate' }}>
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/95 backdrop-blur-md transition-opacity duration-300 z-[-1]"
        onClick={onClose}
      />

      {/* Floating 1-Click Round Back Button on Mobile */}
      <button
        onClick={onClose}
        id="video-modal-floating-back-btn"
        className="fixed top-4 left-4 z-[1000000] sm:hidden w-11 h-11 rounded-full bg-[#090b0f]/95 hover:bg-amber-500 border-2 border-amber-400 text-amber-300 hover:text-black shadow-[0_0_25px_rgba(245,158,11,0.6)] flex items-center justify-center active:scale-90 transition-all cursor-pointer backdrop-blur-xl"
        title={lang === 'bn' ? 'ব্যাকে যান' : 'Back'}
      >
        <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Modal Container */}
      <div
        className="relative z-10 w-full max-w-4xl bg-[#090b0f] border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col max-h-[90dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header (Fixed at top) */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 sm:py-3.5 border-b border-amber-500/25 bg-[#07080c] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-500/25 to-black/90 hover:from-amber-400 hover:to-amber-500 border-2 border-amber-400/80 hover:border-amber-300 text-amber-300 hover:text-black shadow-[0_0_15px_rgba(245,158,11,0.35)] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shrink-0 hidden sm:flex"
              title={lang === 'bn' ? 'ব্যাকে যান' : 'Go Back'}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>

            <div className="min-w-0 pl-12 sm:pl-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  {lang === 'bn' ? (project.category_label_bn || project.categoryLabelBn) : (project.category_label || project.categoryLabel)}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {currentIndex + 1} / {totalProjects}
                </span>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight truncate max-w-[200px] sm:max-w-md">
                {lang === 'bn' ? (project.title_bn || project.titleBn || project.title) : project.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-amber-500 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-black flex items-center justify-center transition-all hover:scale-110 active:scale-90 cursor-pointer shrink-0"
            title={lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Inner Body (Fixes the cut-off issue) */}
        <div className="flex-1 overflow-y-auto flex flex-col min-h-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#050608] [&::-webkit-scrollbar-thumb]:bg-amber-500/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-amber-500/50">
          
          {/* Video Player Box */}
          <div className="relative w-full shrink-0 overflow-hidden bg-black group flex flex-col justify-center">
            {onPrev && (
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[50] w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-black/85 hover:bg-amber-500 border-2 border-amber-500/60 hover:border-amber-300 text-amber-300 hover:text-slate-950 shadow-[0_0_25px_rgba(0,0,0,0.9),0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center transition-all duration-200 hover:scale-115 active:scale-90 cursor-pointer backdrop-blur-md"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </button>
            )}

            {onNext && (
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[50] w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-black/85 hover:bg-amber-500 border-2 border-amber-500/60 hover:border-amber-300 text-amber-300 hover:text-slate-950 shadow-[0_0_25px_rgba(0,0,0,0.9),0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center transition-all duration-200 hover:scale-115 active:scale-90 cursor-pointer backdrop-blur-md"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </button>
            )}

            <div className={`w-full ${isVertical ? 'bg-black/95 flex justify-center items-center py-2 sm:py-4' : 'flex items-center justify-center bg-black'}`}>
              <div className={isVertical ? 'w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] shadow-2xl rounded-xl overflow-hidden border border-amber-500/20' : 'w-full aspect-video'}>
                <iframe
                  src={project.vimeo_embed_url || project.vimeoEmbedUrl}
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Navigation Bar under player */}
          <div className={`flex items-center justify-between px-3 sm:px-5 py-2.5 bg-[#06070a] border-t border-amber-500/20 text-xs shrink-0 ${!hasDetails ? 'pb-4 sm:pb-5' : 'border-b border-amber-500/20'}`}>
            <button onClick={onPrev} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1118] hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold active:scale-95 transition-all cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
              <span>{lang === 'bn' ? 'পূর্বের' : 'Prev'}</span>
            </button>
            <span className="font-mono text-xs font-bold text-amber-400">
              {currentIndex + 1} / {totalProjects}
            </span>
            <button onClick={onNext} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1118] hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold active:scale-95 transition-all cursor-pointer">
              <span>{lang === 'bn' ? 'পরের' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Project Details Body (Only shows if details exist) */}
          {hasDetails && (
            <div className="p-4 sm:p-6 space-y-5 text-slate-300 text-sm bg-[#090b0f] shrink-0">
              
              {(project.client || project.aspect_ratio || project.aspectRatio || project.views || project.duration) && (
                <div className="flex flex-wrap items-center gap-2">
                  {project.client && <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-semibold">Client: {project.client}</span>}
                  {(project.aspect_ratio || project.aspectRatio) && (
                    <span className="px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                      <Monitor className="w-3 h-3 text-amber-400" />
                      {project.aspect_ratio || project.aspectRatio}
                    </span>
                  )}
                </div>
              )}

              {(project.description || project.descriptionBn || project.description_bn) && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{lang === 'bn' ? 'প্রজেক্ট বিবরণ' : 'Project Overview'}</h4>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {lang === 'bn' ? (project.description_bn || project.descriptionBn || project.description) : project.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}