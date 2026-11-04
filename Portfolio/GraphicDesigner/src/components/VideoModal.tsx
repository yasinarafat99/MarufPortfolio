import { useEffect } from 'react';
import {
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Film,
  Monitor,
  Layers,
} from 'lucide-react';
import { VideoProject } from '../data/portfolioData';

interface VideoModalProps {
  project: VideoProject | null;
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

  if (!isOpen || !project) return null;

  const isVertical = project.aspectRatio === '9:16';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/92 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Floating 1-Click Round Back Button on Mobile (Fixed top-left for instant reach) */}
      <button
        onClick={onClose}
        id="video-modal-floating-back-btn"
        className="fixed top-3.5 left-3.5 z-50 sm:hidden w-11 h-11 rounded-full bg-[#090b0f]/95 hover:bg-amber-500 border-2 border-amber-400 text-amber-300 hover:text-black shadow-[0_0_25px_rgba(245,158,11,0.6)] flex items-center justify-center active:scale-90 transition-all cursor-pointer backdrop-blur-xl"
        title={lang === 'bn' ? 'ব্যাকে যান' : 'Back'}
        aria-label="Back"
      >
        <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Modal Container */}
      <div
        className="relative z-10 w-full max-w-4xl bg-[#090b0f] border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.25)] overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Round Back Button */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 sm:py-3.5 border-b border-amber-500/25 bg-[#07080c] shrink-0">
          {/* Left: Round Back Button + Title */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Prominent Round Back Button */}
            <button
              onClick={onClose}
              id="video-modal-header-back-btn"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-500/25 to-black/90 hover:from-amber-400 hover:to-amber-500 border-2 border-amber-400/80 hover:border-amber-300 text-amber-300 hover:text-black shadow-[0_0_15px_rgba(245,158,11,0.35)] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shrink-0"
              title={lang === 'bn' ? 'ব্যাকে যান (এক ক্লিকে)' : 'Go Back (One-click)'}
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  {lang === 'bn' ? project.categoryLabelBn : project.categoryLabel}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {currentIndex + 1} / {totalProjects}
                </span>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight truncate max-w-[200px] sm:max-w-md">
                {lang === 'bn' ? project.titleBn : project.title}
              </h3>
            </div>
          </div>

          {/* Right: Round Close Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-amber-500 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-black flex items-center justify-center transition-all hover:scale-110 active:scale-90 cursor-pointer shrink-0"
            title={lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Video Player Box with Left & Right Switch Buttons */}
        <div className="relative w-full shrink-0 overflow-hidden bg-black group">
          {/* Previous Video Switch Button (Left side of video) */}
          {onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              id="video-switch-prev-btn"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-black/85 hover:bg-amber-500 border-2 border-amber-500/60 hover:border-amber-300 text-amber-300 hover:text-slate-950 shadow-[0_0_25px_rgba(0,0,0,0.9),0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center transition-all duration-200 hover:scale-115 active:scale-90 cursor-pointer backdrop-blur-md"
              title={lang === 'bn' ? 'পূর্বের ভিডিও' : 'Previous Video'}
              aria-label="Previous Video"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>
          )}

          {/* Next Video Switch Button (Right side of video) */}
          {onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              id="video-switch-next-btn"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-black/85 hover:bg-amber-500 border-2 border-amber-500/60 hover:border-amber-300 text-amber-300 hover:text-slate-950 shadow-[0_0_25px_rgba(0,0,0,0.9),0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center transition-all duration-200 hover:scale-115 active:scale-90 cursor-pointer backdrop-blur-md"
              title={lang === 'bn' ? 'পরের ভিডিও' : 'Next Video'}
              aria-label="Next Video"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>
          )}

          {/* Video Player */}
          <div
            className={`w-full ${
              isVertical
                ? 'bg-black/95 flex justify-center py-2 sm:py-3'
                : 'aspect-video bg-black'
            }`}
          >
            <div
              className={
                isVertical
                  ? 'w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] shadow-2xl rounded-xl overflow-hidden border border-amber-500/20'
                  : 'w-full h-full'
              }
            >
              <iframe
                src={project.vimeoEmbedUrl}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Video Quick Navigation Bar directly under player */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2 bg-[#06070a] border-y border-amber-500/20 text-xs">
          <button
            onClick={onPrev}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1118] hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{lang === 'bn' ? 'পূর্বের ভিডিও' : 'Previous Video'}</span>
          </button>

          <span className="font-mono text-xs font-bold text-amber-400">
            {lang === 'bn' ? 'ভিডিও' : 'Video'} {currentIndex + 1} / {totalProjects}
          </span>

          <button
            onClick={onNext}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1118] hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold active:scale-95 transition-all cursor-pointer"
          >
            <span>{lang === 'bn' ? 'পরের ভিডিও' : 'Next Video'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Project Details Body (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-300 text-sm">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-semibold">
              Client: {project.client}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5">
              <Monitor className="w-3 h-3 text-amber-400" />
              {project.aspectRatio}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-xs font-medium">
              {project.views}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-xs font-medium">
              Duration: {project.duration}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              {lang === 'bn' ? 'প্রজেক্ট বিবরণ' : 'Project Overview'}
            </h4>
            <p className="text-slate-200 text-sm leading-relaxed">
              {lang === 'bn' ? project.descriptionBn : project.description}
            </p>
          </div>

          {/* Tools Used */}
          {project.toolsUsed && project.toolsUsed.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'bn' ? 'ব্যবহৃত টুলস ও সফটওয়্যার' : 'Tools & Software'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-black/60 border border-amber-500/30 text-white text-xs font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {((lang === 'bn' ? project.keyFeaturesBn : project.keyFeatures) || []).length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'bn' ? 'উল্লেখযোগ্য বৈশিষ্ট্যসমূহ' : 'Key Highlights'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(lang === 'bn' ? project.keyFeaturesBn : project.keyFeatures).map(
                  (feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-black/60 border border-amber-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs text-slate-200">{feat}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
