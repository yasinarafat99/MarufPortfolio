// src/components/Portfolio.tsx
import { useState, useEffect } from 'react';
import { Play, Sparkles, Video, Palette, ChevronDown, ChevronUp, Layers, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import OptimizedImage from './OptimizedImage';
import VideoModal from './VideoModal';
import DesignModal from './DesignModal';

interface PortfolioProps {
  lang: 'en' | 'bn';
}

export default function Portfolio({ lang = 'en' }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'design'>('all');
  
  // Supabase থেকে আনা ডাইনামিক ডেটার স্টেট
  const [videoProjects, setVideoProjects] = useState<any[]>([]);
  const [graphicDesigns, setGraphicDesigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<any | null>(null);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);

  const [showAllDesigns, setShowAllDesigns] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  // Supabase থেকে ডেটা ফেচ করা
  useEffect(() => {
    const fetchPortfolioData = async () => {
      setIsLoading(true);
      const [videoRes, designRes] = await Promise.all([
        supabase.from('videos').select('*').order('created_at', { ascending: false }),
        supabase.from('designs').select('*').order('created_at', { ascending: false })
      ]);
      
      if (videoRes.data) setVideoProjects(videoRes.data);
      if (designRes.data) setGraphicDesigns(designRes.data);
      setIsLoading(false);
    };

    fetchPortfolioData();
  }, []);

  // Modal Open থাকলে ব্যাকগ্রাউন্ড স্ক্রল লক করা (UX Fix)
  useEffect(() => {
    if (isVideoModalOpen || isDesignModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVideoModalOpen, isDesignModalOpen]);

  const displayedVideos = videoProjects;
  const displayedDesigns = showAllDesigns ? graphicDesigns : graphicDesigns.slice(0, 6);
  const remainingDesigns = graphicDesigns.length - 6;

  const handleOpenVideo = (project: any) => {
    const idx = videoProjects.findIndex((p) => p.id === project.id);
    setSelectedVideoIndex(idx >= 0 ? idx : 0);
    setSelectedVideo(project);
    setIsVideoModalOpen(true);
  };

  const handleNextVideo = () => {
    if (videoProjects.length === 0) return;
    const nextIdx = (selectedVideoIndex + 1) % videoProjects.length;
    setSelectedVideoIndex(nextIdx);
    setSelectedVideo(videoProjects[nextIdx]);
  };

  const handlePrevVideo = () => {
    if (videoProjects.length === 0) return;
    const prevIdx = (selectedVideoIndex - 1 + videoProjects.length) % videoProjects.length;
    setSelectedVideoIndex(prevIdx);
    setSelectedVideo(videoProjects[prevIdx]);
  };

  const handleOpenDesign = (project: any) => {
    setSelectedDesign(project);
    setIsDesignModalOpen(true);
  };

  // স্কেলিটন লোডার (ডেটা আসার আগে দেখাবে)
  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 bg-[#050608] relative border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex justify-center">
           <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-24 bg-[#050608] relative border-t border-amber-500/20">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-14 space-y-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            {lang === 'bn' ? 'প্রজেক্ট' : 'Projects'}
          </h2>

          <div className="inline-flex p-1 sm:p-1.5 rounded-full bg-[#080a0e] border border-amber-500/40 backdrop-blur-xl shadow-[0_0_25px_rgba(245,158,11,0.2)] mx-auto mt-2 max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black shadow-[0_0_24px_rgba(245,158,11,0.65)] border border-amber-300'
                  : 'text-slate-300 hover:text-amber-200 hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{lang === 'bn' ? 'অল' : 'All'}</span>
              <span className={`px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'all' ? 'bg-black/30 text-slate-950' : 'bg-black/60 text-amber-400'
              }`}>
                {videoProjects.length + graphicDesigns.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black shadow-[0_0_24px_rgba(245,158,11,0.65)] border border-amber-300'
                  : 'text-slate-300 hover:text-amber-200 hover:bg-white/5'
              }`}
            >
              <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{lang === 'bn' ? 'ভিডিও এডিটিং' : 'Video Editing'}</span>
              <span className={`px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'video' ? 'bg-black/30 text-slate-950' : 'bg-black/60 text-amber-400'
              }`}>
                {videoProjects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('design')}
              className={`flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                activeTab === 'design'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black shadow-[0_0_24px_rgba(245,158,11,0.65)] border border-amber-300'
                  : 'text-slate-300 hover:text-amber-200 hover:bg-white/5'
              }`}
            >
              <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{lang === 'bn' ? 'গ্রাফিক ডিজাইন' : 'Graphic Design'}</span>
              <span className={`px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'design' ? 'bg-black/30 text-slate-950' : 'bg-black/60 text-amber-400'
              }`}>
                {graphicDesigns.length}
              </span>
            </button>
          </div>
        </div>

        {/* Video Projects Grid */}
        {(activeTab === 'all' || activeTab === 'video') && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5 md:gap-7 max-w-[350px] sm:max-w-none mx-auto">
              {displayedVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleOpenVideo(video)}
                  className="group rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#090b0f]/95 border border-amber-500/30 hover:border-amber-400 overflow-hidden transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:-translate-y-1.5 hover:scale-[1.025] cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <OptimizedImage src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" containerClassName="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-7 h-7 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.9)] group-hover:scale-115 transition-all duration-300 border border-amber-200">
                        <Play className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-slate-950 ml-0.5" />
                      </div>
                    </div>
                    <div className="sm:hidden absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/50 text-amber-300 text-[8.5px] font-bold shadow-sm pointer-events-none">
                      {lang === 'bn' ? (video.category_label_bn || video.category_label) : video.category_label}
                    </div>
                  </div>

                  <div className="p-1.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
                    <div className="hidden sm:block">
                      <h3 className="text-xs sm:text-base md:text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                        {lang === 'bn' ? (video.title_bn || video.title) : video.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5 sm:pt-3 sm:border-t sm:border-amber-500/20 mt-0 sm:mt-3 overflow-hidden">
                      <Layers className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
                      {video.tools_used && (Array.isArray(video.tools_used) ? video.tools_used : typeof video.tools_used === 'string' ? video.tools_used.split(',') : []).map((tool: string, idx: number) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-black/70 border border-amber-500/20 hover:border-amber-400 hover:text-amber-300 transition-all duration-200 text-[9px] sm:text-[10px] text-slate-300 font-medium whitespace-nowrap cursor-default select-none">
                          {tool.trim()}
                        </span>
                      ))}
                      {(!video.tools_used || video.tools_used.length === 0) && (
                        <span className="text-[10px] text-slate-500">কোনো টুল যুক্ত করা হয়নি</span>
                      )}
                    </div>

                  </div>
                </div>
              ))}
              {videoProjects.length === 0 && <div className="col-span-full text-center py-10 text-slate-400">এখনো কোনো ভিডিও যুক্ত করা হয়নি।</div>}
            </div>
          </div>
        )}

        {/* Divider header between Videos and Graphic Designs in 'all' tab */}
        {activeTab === 'all' && graphicDesigns.length > 0 && (
          <div className="flex items-center gap-3 pt-10 sm:pt-14 pb-4 animate-in fade-in duration-500">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080a0e] border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>{lang === 'bn' ? 'গ্রাফিক ডিজাইন প্রজেক্ট' : 'Graphic Design Projects'}</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          </div>
        )}

        {/* Graphic Design Projects Grid */}
        {(activeTab === 'all' || activeTab === 'design') && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 md:gap-7">
              {displayedDesigns.map((design) => (
                <div
                  key={design.id}
                  onClick={() => handleOpenDesign(design)}
                  className="group rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#090b0f]/95 border border-amber-500/30 hover:border-amber-400 overflow-hidden transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:-translate-y-1.5 hover:scale-[1.025] cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-black/80">
                    <OptimizedImage src={design.image} alt={design.title} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" containerClassName="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-[11px] sm:text-xs shadow-[0_0_25px_rgba(245,158,11,0.9)] transform group-hover:scale-110 transition-transform duration-300">
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        <span>{lang === 'bn' ? 'বড় করে দেখুন' : 'View Full'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
  <div>
    <h3 className="text-xs sm:text-base md:text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
      {lang === 'bn' ? (design.title_bn || design.title) : design.title}
    </h3>
  </div>

  {/* Dynamic Tools Tags for Graphic Design */}
  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-2 sm:pt-3 border-t border-amber-500/20 mt-2">
    <Layers className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
    
    {design.tools_used && (Array.isArray(design.tools_used) ? design.tools_used : typeof design.tools_used === 'string' ? design.tools_used.split(',') : []).map((tool: string, idx: number) => (
      <span
        key={idx}
        className="px-1.5 py-0.5 rounded bg-black/70 border border-amber-500/20 hover:border-amber-400 hover:text-amber-300 hover:bg-black/95 hover:scale-110 transition-all duration-200 text-[9px] sm:text-[10px] text-slate-300 font-medium cursor-default select-none"
      >
        {tool.trim()}
      </span>
    ))}
    
    {(!design.tools_used || design.tools_used.length === 0) && (
       <span className="text-[10px] text-slate-500">কোনো টুল যুক্ত করা হয়নি</span>
    )}
  </div>
</div>

                </div>
              ))}
              {graphicDesigns.length === 0 && <div className="col-span-full text-center py-10 text-slate-400">এখনো কোনো ডিজাইন যুক্ত করা হয়নি।</div>}
            </div>

            {/* Load more toggle button */}
            {graphicDesigns.length > 6 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowAllDesigns(!showAllDesigns)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0a0c10] hover:bg-amber-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_24px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
                >
                  {showAllDesigns ? (
                    <>
                      <span>{lang === 'bn' ? 'সংকুচিত করুন' : 'Show Less'}</span>
                      <ChevronUp className="w-4 h-4 text-amber-400" />
                    </>
                  ) : (
                    <>
                      <span>
                        {lang === 'bn'
                          ? `আরও ${remainingDesigns}টি ডিজাইন প্রজেক্ট দেখুন`
                          : `View ${remainingDesigns} More Design Projects`}
                      </span>
                      <ChevronDown className="w-4 h-4 text-amber-400" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Layer Fixed z-index [9999] Video & Design Modals */}
      <VideoModal
        project={selectedVideo}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onNext={handleNextVideo}
        onPrev={handlePrevVideo}
        currentIndex={selectedVideoIndex}
        totalProjects={videoProjects.length}
        lang={lang}
      />
      <DesignModal
        project={selectedDesign}
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
        lang={lang}
      />
    </section>
  );
}