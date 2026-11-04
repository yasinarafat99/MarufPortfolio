import { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Image as ImageIcon,
  Layers,
  Eye,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { GraphicDesignProject } from '../data/portfolioData';

interface DesignModalProps {
  project: GraphicDesignProject | null;
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'bn';
}

export default function DesignModal({ project, isOpen, onClose, lang }: DesignModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Reset zoom when project changes or modal opens
  useEffect(() => {
    setZoomLevel(1);
    setIsFullscreen(false);
  }, [project, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, isFullscreen]);

  if (!isOpen || !project) return null;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.35, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.75));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  return (
    <>
      {/* 1. Immersive Edge-to-Edge Fullscreen Lightbox */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex flex-col justify-between overflow-hidden animate-fadeIn"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-black/80 border-b border-amber-500/20 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <ImageIcon className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base tracking-wide">
                  {lang === 'bn' ? project.titleBn : project.title}
                </h3>
                <p className="text-amber-400 text-xs font-medium">
                  {lang === 'bn' ? 'সম্পূর্ণ স্ক্রিন ভিউ (১০০% পরিপূর্ণ)' : 'Full Scale View (100% Complete)'}
                </p>
              </div>
            </div>

            {/* Lightbox Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-lg bg-white/10 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer"
                title={lang === 'bn' ? 'ছোট করুন' : 'Zoom Out'}
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="px-2 py-1 text-xs font-mono font-bold text-amber-300 bg-black/60 rounded border border-amber-500/20">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                className="p-2 rounded-lg bg-white/10 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer"
                title={lang === 'bn' ? 'বড় করুন' : 'Zoom In'}
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={handleResetZoom}
                className="p-2 rounded-lg bg-white/10 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer hidden sm:inline-flex"
                title={lang === 'bn' ? 'রিসেট' : 'Reset'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer"
                title={lang === 'bn' ? 'নতুন ট্যাবে খুলুন' : 'Open Raw in New Tab'}
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 transition-colors cursor-pointer ml-1 sm:ml-2"
                title={lang === 'bn' ? 'ফুলস্ক্রিন বন্ধ করুন' : 'Exit Fullscreen'}
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fullscreen Canvas */}
          <div
            className="flex-1 w-full h-full overflow-auto flex items-center justify-center p-2 sm:p-6"
            onClick={() => setIsFullscreen(false)}
          >
            <div
              className="transition-transform duration-200 ease-out max-h-full max-w-full flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={project.image}
                alt={project.title}
                className="max-h-[88vh] max-w-[95vw] object-contain rounded-lg drop-shadow-[0_10px_50px_rgba(0,0,0,0.95)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Bottom Hint */}
          <div className="py-2.5 text-center bg-black/80 border-t border-white/5 text-[11px] text-slate-400">
            {lang === 'bn'
              ? 'স্ক্রিনে ক্লিক করে বা ESC চেপে বন্ধ করুন • জুম করতে বাটনগুলো ব্যবহার করুন'
              : 'Click anywhere or press ESC to exit • Use zoom buttons to inspect details'}
          </div>
        </div>
      )}

      {/* 2. Main Design Modal Window */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/92 backdrop-blur-md transition-opacity duration-300"
          onClick={onClose}
        />

        {/* Modal Container: Spacious Max-6XL with Split Desktop Layout */}
        <div
          className="relative z-10 w-full max-w-5xl lg:max-w-6xl bg-[#090b0f] border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.25)] overflow-hidden my-auto max-h-[94vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-amber-500/20 bg-[#07080c] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="p-1.5 sm:p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  {lang === 'bn' ? project.categoryLabelBn : project.categoryLabel}
                </span>
                <h3 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight line-clamp-1">
                  {lang === 'bn' ? project.titleBn : project.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                title={lang === 'bn' ? 'ফুলস্ক্রিনে বড় করে দেখুন' : 'View Full Screen'}
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'bn' ? 'পূর্ণাঙ্গ বড় ভিউ' : 'Full Screen'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-white border border-slate-700 hover:border-amber-400 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Body: Desktop side-by-side (huge image + info) */}
          <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
            {/* Left Stage: Huge Image Canvas (Complete & Large) */}
            <div className="relative flex-1 bg-[#040507] flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 min-h-[380px] sm:min-h-[460px] lg:min-h-[620px] max-h-[68vh] lg:max-h-[82vh] overflow-hidden group select-none">
              {/* Subtle background radial ambient glow */}
              <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

              {/* The Complete Uncut Image */}
              <div
                onClick={() => setIsFullscreen(true)}
                className="relative w-full h-full flex items-center justify-center cursor-zoom-in"
                title={lang === 'bn' ? 'ক্লিক করে ফুলস্ক্রিন বড় করুন' : 'Click to view full screen'}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-h-[60vh] sm:max-h-[62vh] lg:max-h-[76vh] w-auto max-w-full object-contain rounded-xl drop-shadow-[0_8px_35px_rgba(0,0,0,0.95)] transition-transform duration-300 group-hover:scale-[1.015]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = 'true';
                      target.src = 'https://i.postimg.cc/6qvx68XJ/Chat-GPT-Image-Sep-13-2026-06-02-22-PM.png';
                    }
                  }}
                />

                {/* Hover Badge on image */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.8)] opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 pointer-events-none">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {lang === 'bn' ? '🔍 সম্পূর্ণ বড় আকারে দেখতে ক্লিক করুন' : '🔍 Click to view full size'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Drawer: Project Info & Actions */}
            <div className="w-full lg:w-96 lg:max-w-md border-t lg:border-t-0 lg:border-l border-amber-500/20 bg-[#090b0f] p-4 sm:p-6 flex flex-col justify-between space-y-5 overflow-y-auto">
              <div className="space-y-5">
                {/* Full View CTA for Mobile/Desktop */}
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(245,158,11,0.45)] hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] transition-all duration-300 cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4 text-slate-950" />
                  <span>{lang === 'bn' ? 'সম্পূর্ণ পরিপূর্ণ বড় স্ক্রিনে দেখুন' : 'Open in Full Screen View'}</span>
                </button>

                {/* Metadata Badges */}
                {((project.client && project.client.trim() !== '') || project.dimensions) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {project.client && project.client.trim() !== '' && (
                      <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-semibold">
                        {lang === 'bn' ? (project.clientBn || project.client) : project.client}
                      </span>
                    )}
                    {project.dimensions && (
                      <span className="px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                        <Eye className="w-3 h-3 text-amber-400" />
                        {project.dimensions}
                      </span>
                    )}
                  </div>
                )}

                {/* Description */}
                {Boolean((lang === 'bn' ? project.descriptionBn : project.description)?.trim()) && (
                  <div>
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {lang === 'bn' ? 'ডিজাইন কনসেপ্ট' : 'Design Concept'}
                    </h4>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                      {lang === 'bn' ? project.descriptionBn : project.description}
                    </p>
                  </div>
                )}

                {/* Tools Used */}
                {project.toolsUsed && project.toolsUsed.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      {lang === 'bn' ? 'ব্যবহৃত সফটওয়্যার' : 'Software Used'}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
                      {lang === 'bn' ? 'ডিজাইন বৈশিষ্ট্যসমূহ' : 'Key Highlights'}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {(lang === 'bn' ? project.keyFeaturesBn : project.keyFeatures).map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-amber-500/20"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="text-xs text-slate-200">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Raw Image Link */}
              <div className="pt-4 border-t border-amber-500/20">
                <a
                  href={project.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-400/50 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'আসল ইমেজ ফাইলটি ওপেন করুন' : 'View Original High-Res File'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
