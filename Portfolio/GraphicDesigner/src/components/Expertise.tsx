import { useState } from 'react';
import {
  Film,
  Palette,
  Compass,
  FileText,
  Mic,
  Users,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';

interface ExpertiseProps {
  lang: 'en' | 'bn';
}

interface ExpertiseItem {
  id: string;
  number: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  icon: typeof Film;
  tools: string[];
  toolsBn: string[];
  highlights: string[];
  highlightsBn: string[];
}

export default function Expertise({ lang = 'en' }: ExpertiseProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const expertiseItems: ExpertiseItem[] = [
    {
      id: 'video-editing',
      number: '01',
      title: 'VIDEO EDITING',
      titleBn: 'ভিডিও এডিটিং',
      description:
        'Professional video editing, dynamic pacing, cinematic color grading, sound design, and motion graphics for YouTube, ads, reels, and commercial productions.',
      descriptionBn:
        'প্রফেশনাল ভিডিও এডিটিং, ডায়নামিক স্টোরিটেলিং পেসিং, সিনেমাটিক কালার গ্রেডিং, সাউন্ড ডিজাইন এবং মোশন গ্রাফিক্স — ইউটিউব, কমার্শিয়াল অ্যাড ও রিলসের জন্য।',
      icon: Film,
      tools: ['Premiere Pro', 'After Effects'],
      toolsBn: ['প্রিমিয়ার প্রো', 'আফটার ইফেক্টস'],
      highlights: [
        'Story-driven narrative pacing & seamless cuts',
        'Cinematic LUTs & studio color grading',
        'Audio SFX design, mixing & synchronization',
        'Motion graphics, subtitles & visual effects',
      ],
      highlightsBn: [
        'স্টোরি-ড্রাইভেন পেসিং ও নিখুঁত সিনক্রোনাইজেশন',
        'সিনেমাটিক কালার গ্রেডিং ও লাইটিং অ্যাডজাস্টমেন্ট',
        'অ্যাডভান্সড সাউন্ড ডিজাইন ও অডিও মিক্সিং',
        'মোশন গ্রাফিক্স, টাইপোগ্রাফি ও ভিজ্যুয়াল এফএক্স',
      ],
    },
    {
      id: 'graphic-design',
      number: '02',
      title: 'GRAPHIC DESIGN',
      titleBn: 'গ্রাফিক ডিজাইন',
      description:
        'High-converting social media creatives, viral YouTube thumbnails, Islamic book covers, commercial ad banners, and complete visual branding.',
      descriptionBn:
        'উচ্চ কনভার্সন সোশ্যাল মিডিয়া অ্যাড, আকর্ষণীয় ভাইরাল ইউটিউব থাম্বনেইল, ইসলামিক বুক কভার ও পোস্টার, এবং প্রফেশনাল ব্র্যান্ড ভিজ্যুয়াল ডিজাইন।',
      icon: Palette,
      tools: ['Photoshop', 'Illustrator', 'Canva Pro'],
      toolsBn: ['ফটোশপ', 'ইলাস্ট্রেটর', 'ক্যানভা প্রো'],
      highlights: [
        'High-CTR YouTube thumbnail composition',
        'Social media advertising banners & posters',
        'Editorial book cover art & packaging',
        'Vector branding, logos & typography layout',
      ],
      highlightsBn: [
        'উচ্চ সিটিআর (CTR) ইউটিউব থাম্বনেইল ডিজাইন',
        'সোশ্যাল মিডিয়া কমার্শিয়াল ব্যানার ও পোস্টার',
        'বুক কভার ও পাবলিকেশন আর্টওয়ার্ক',
        'ভেক্টর ব্র্যান্ডিং ও কাস্টম টাইপোগ্রাফি বিন্যাস',
      ],
    },
    {
      id: 'creative-visualization',
      number: '03',
      title: 'CREATIVE VISUALIZATION',
      titleBn: 'ক্রিয়েটিভ ভিজ্যুয়ালাইজেশন',
      description:
        'Translating complex or abstract ideas into powerful visual concepts, moodboards, color aesthetics, and compelling scene compositions.',
      descriptionBn:
        'যেকোনো আইডিয়া বা ভাবনাকে রূপান্তর করা শক্তিশালী ভিজ্যুয়াল কনসেপ্টে — মুডবোর্ড, কালার থিম এবং শৈল্পিক কম্পোজিশনের মাধ্যমে।',
      icon: Compass,
      tools: ['Concept Art', 'Moodboards', 'Storyboarding'],
      toolsBn: ['কনসেপ্ট আর্ট', 'মুডবোর্ড', 'স্টোরিবোর্ডিং'],
      highlights: [
        'Visual moodboard curation & aesthetic balance',
        'Color psychology & brand lighting themes',
        'Scene composition & cinematic camera angles',
        'Concept refinement from rough idea to final art',
      ],
      highlightsBn: [
        'ভিজ্যুয়াল মুডবোর্ড তৈরি ও স্টাইল সামঞ্জস্য',
        'কালার সাইকোলজি ও নান্দনিক লাইটিং থিম',
        'সিন কম্পোজিশন ও ড্রামাটিক ভিজ্যুয়াল আর্ট',
        'আইডিয়া থেকে চূড়ান্ত নান্দনিক রূপ প্রদান',
      ],
    },
    {
      id: 'script-writing',
      number: '04',
      title: 'SCRIPT WRITING',
      titleBn: 'স্ক্রিপ্ট রাইটিং',
      description:
        'Hook-first video scripts, storytelling architecture, engaging promotional copy, voiceover pacing, and audience retention engineering.',
      descriptionBn:
        'দর্শকের চোখ আটকে ফেলার মতো ০-৩ সেকেন্ডের হুক, আকর্ষণীয় গল্পনির্ভর ভিডিও স্ক্রিপ্ট, প্রমোশনাল কনটেন্ট এবং নিখুঁত ভয়েস-ওভার স্ক্রিপ্ট রচনা।',
      icon: FileText,
      tools: ['Story Framework', 'Creative Hooks', 'Script Structure'],
      toolsBn: ['স্টোরি ফ্রেমওয়ার্ক', 'ক্রিয়েটিভ হুকস', 'স্ক্রিপ্ট স্ট্রাকচার'],
      highlights: [
        '0-3 second viral hook construction',
        'Audience retention & emotional narrative flow',
        'Voiceover timing, tone, and pacing cues',
        'High-converting call-to-action scripts',
      ],
      highlightsBn: [
        '০-৩ সেকেন্ডে মনোযোগ ধরে রাখার উপযোগী হুক',
        'অডিয়েন্স রিটেনশন ও ইমোশনাল স্টোরিটেলিং',
        'ভয়েস-ওভার টাইমিং ও টোন নির্দেশনা',
        'কার্যকর কল-টু-অ্যাকশন কনভার্সন অপটিমাইজেশন',
      ],
    },
    {
      id: 'public-speaking',
      number: '05',
      title: 'PUBLIC SPEAKING',
      titleBn: 'পাবলিক স্পিকিং',
      description:
        'Confident stage presence, persuasive articulation, impactful visual presentations, and meaningful audience connection.',
      descriptionBn:
        'আত্মবিশ্বাসী স্টেজ উপস্থাপনা, সুসংগঠিত বক্তব্য উপস্থাপন, আকর্ষণীয় স্লাইড ডেক এবং শ্রোতাদের সঙ্গে হৃদয়গ্রাহী সংযোগ স্থাপন।',
      icon: Mic,
      tools: ['Presentation', 'Audience Retention', 'Public Delivery'],
      toolsBn: ['প্রেজেন্টেশন', 'অডিয়েন্স রিটেনশন', 'পাবলিক ডেলিভারি'],
      highlights: [
        'Dynamic stage presence & body language',
        'Active audience interaction & question handling',
        'Structured storytelling in live workshops',
        'Clear voice modulation & delivery pacing',
      ],
      highlightsBn: [
        'আত্মবিশ্বাসী স্টেজ প্রেজেন্স ও শারীরিক ভাষা',
        'শ্রোতাদের সাথে তাৎক্ষণিক যোগাযোগ ও প্রশ্নোত্তর',
        'লাইভ কর্মশালায় কাঠামোবদ্ধ গল্পকথন',
        'স্পষ্ট কণ্ঠস্বর ও কার্যকর বাকভঙ্গি',
      ],
    },
    {
      id: 'leadership',
      number: '06',
      title: 'LEADERSHIP',
      titleBn: 'লিডারশিপ',
      description:
        'Creative team coordination, workflow optimization, quality direction, sprint management, and achieving project milestones efficiently.',
      descriptionBn:
        'ক্রিয়েটিভ টিম সমন্বয়, মসৃণ ওয়ার্কফ্লো নিশ্চিতকরণ, শৈল্পিক কোয়ালিটি ডিরেকশন এবং নির্দিষ্ট সময়ের মধ্যে বড় প্রজেক্ট সফলভাবে সম্পাদন।',
      icon: Users,
      tools: ['Creative Direction', 'Team Workflow', 'Project Management'],
      toolsBn: ['ক্রিয়েটিভ ডিরেকশন', 'টিম ওয়ার্কফ্লো', 'প্রজেক্ট ম্যানেজমেন্ট'],
      highlights: [
        'Creative quality assurance & vision alignment',
        'Post-production pipeline & deadline management',
        'Mentoring young video editors & designers',
        'Collaborative sprint execution under pressure',
      ],
      highlightsBn: [
        'ক্রিয়েটিভ কোয়ালিটি নিশ্চিতকরণ ও ভিশন বাস্তবায়ন',
        'পোস্ট-প্রোডাকশন পাইপলাইন ও ডেডলাইন ম্যানেজমেন্ট',
        'জুনিয়র এডিটর ও ডিজাইনারদের দিকনির্দেশনা ও মেন্টরিং',
        'টিমওয়ার্কের মাধ্যমে যেকোনো চ্যালেঞ্জিং প্রজেক্ট ডেলিভারি',
      ],
    },
  ];

  return (
    <section
      id="expertise"
      className="py-10 sm:py-16 md:py-20 bg-[#050608]/90 backdrop-blur-[2px] text-slate-100 relative overflow-hidden border-t border-amber-500/20"
    >
      {/* Golden background radial lights */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#08090d]/90 border border-amber-500/40 text-amber-400 text-[11px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:scale-105 transition-transform duration-300 cursor-default">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span>{lang === 'bn' ? 'কোর এক্সপার্টিজ অ্যান্ড স্কিলস' : 'CORE EXPERTISE & SKILLS'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            {lang === 'bn' ? (
              <>
                আমার <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_28px_rgba(245,158,11,0.5)]">কোর এক্সপার্টিজ অ্যান্ড স্কিলস</span>
              </>
            ) : (
              <>
                Core Expertise & <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_28px_rgba(245,158,11,0.5)]">Skills</span>
              </>
            )}
          </h2>
        </div>

        {/* Skills Grid: 2 columns on mobile with enhanced big visual icons and interactive expand on click */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5 items-start">
          {expertiseItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedId === item.id;
            const displayedTools = lang === 'bn' ? item.toolsBn : item.tools;
            const displayedHighlights = lang === 'bn' ? item.highlightsBn : item.highlights;

            return (
              <div
                key={item.id}
                onClick={() => toggleExpand(item.id)}
                className={`p-3.5 sm:p-5 md:p-6 rounded-2xl bg-[#090b0f]/95 transition-all duration-300 backdrop-blur-xl group flex flex-col justify-between shadow-[0_0_20px_rgba(245,158,11,0.08)] cursor-pointer select-none ${
                  isExpanded
                    ? 'border-2 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.45)] bg-[#0d0f15]'
                    : 'border border-amber-500/35 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Top Bar: Big visual Icon + Index Tag */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    {/* Big glowing visual icon badge */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/25 via-yellow-500/15 to-transparent border border-amber-500/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-108 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-amber-400 stroke-[2.2]" />
                    </div>

                    <span className="text-[10px] sm:text-xs font-mono font-black text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/25 shrink-0 shadow-sm">
                      #{item.number}
                    </span>
                  </div>

                  {/* Main Title: Big, bold & clean */}
                  <h3 className="text-sm sm:text-lg md:text-xl font-black text-white group-hover:text-amber-300 transition-colors tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-2.5">
                    {lang === 'bn' ? item.titleBn : item.title}
                  </h3>

                  {/* Tools / Software Badges: Prominently visible in default view */}
                  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-3">
                    <Layers className="w-3 h-3 text-amber-400 shrink-0 hidden sm:inline-block" />
                    {displayedTools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-[10px] sm:text-xs font-semibold text-amber-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Expanded View Content: Shown only when clicked */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-amber-500/30 space-y-3 animate-fadeIn">
                      {/* Full description */}
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                        {lang === 'bn' ? item.descriptionBn : item.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider block">
                          {lang === 'bn' ? 'মূল দক্ষতাসমূহ:' : 'Key Competencies:'}
                        </span>
                        {displayedHighlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-300 leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom interactive tap hint toggle - now clean white */}
                <div className="pt-2 sm:pt-3 mt-1 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
                  <span className="text-white">
                    {isExpanded
                      ? lang === 'bn'
                        ? 'সংক্ষেপ করুন'
                        : 'Show less'
                      : lang === 'bn'
                      ? 'বিস্তারিত দেখতে ট্যাপ করুন'
                      : 'Tap for full details'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-white animate-bounce" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
