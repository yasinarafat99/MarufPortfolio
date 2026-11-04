import { GraduationCap, Award, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

interface EducationProps {
  lang: 'en' | 'bn';
}

export default function Education({ lang = 'en' }: EducationProps) {
  const academicItems = [
    {
      degree: lang === 'bn' ? 'দাওরায়ে হাদিস' : 'Dawra-e Hadith (Masters Equivalent)',
      year: '2026',
      status: lang === 'bn' ? 'সমাপ্তি / প্রত্যাশিত' : 'Final Year / Completed',
      icon: Award,
      desc:
        lang === 'bn'
          ? 'ইসলামিক স্টাডিজ ও হাদিস শাস্ত্রের সর্বোচ্চ স্তর।'
          : 'Highest academic qualification in Islamic Studies & Hadith literature.',
    },
    {
      degree: lang === 'bn' ? 'এইচএসসি (HSC)' : 'Higher Secondary Certificate (HSC)',
      year: lang === 'bn' ? 'অধ্যয়নরত' : 'Ongoing',
      status: lang === 'bn' ? 'অধ্যয়নরত' : 'Currently Studying',
      icon: GraduationCap,
      desc:
        lang === 'bn'
          ? 'উচ্চ মাধ্যমিক শিক্ষাক্রম চলমান।'
          : 'Pursuing higher secondary educational curriculum.',
    },
    {
      degree: lang === 'bn' ? 'এসএসসি (SSC)' : 'Secondary School Certificate (SSC)',
      year: '2026',
      status: lang === 'bn' ? 'পরীক্ষার্থী / সমাপ্তি' : 'Batch 2026',
      icon: GraduationCap,
      desc:
        lang === 'bn'
          ? 'মাধ্যমিক স্কুল সার্টিফিকেট পরীক্ষা।'
          : 'Secondary School Certificate examination curriculum.',
    },
    {
      degree: lang === 'bn' ? 'হিফজুল কুরআন' : "Hifzul Qur'an",
      year: '2014',
      status: lang === 'bn' ? 'সম্পন্ন' : 'Completed',
      icon: BookOpen,
      desc:
        lang === 'bn'
          ? 'সম্পূর্ণ পবিত্র কুরআন মুখস্থকরণ সম্পন্ন।'
          : "Successful memorization of the entire Holy Qur'an.",
    },
  ];

  const trainingInstitute = {
    institution:
      lang === 'bn'
        ? 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট'
        : 'As-Sunnah Skill Development Institute',
    courseName: 'SBMC (Small Business Management Course)',
    batch: 'Batch 36',
    topics: [
      {
        name: lang === 'bn' ? 'ভিডিও এডিটিং' : 'Video Editing',
        tools: 'Premiere Pro & After Effects',
      },
      {
        name: lang === 'bn' ? 'গ্রাফিক ডিজাইন' : 'Graphic Design',
        tools: 'Photoshop, Illustrator & Canva Pro',
      },
      {
        name: lang === 'bn' ? 'মেটা মার্কেটিং' : 'Meta Marketing',
        tools: 'Facebook & Instagram Ads Strategy',
      },
      {
        name: lang === 'bn' ? 'জেনারেটিভ এআই টুলস' : 'Generative AI Tools',
        tools: 'Prompt Engineering, AI Visuals & Workflows',
      },
    ],
  };

  return (
    <section id="education" className="py-10 sm:py-16 md:py-24 relative overflow-hidden bg-[#050608]/95 border-t border-amber-500/20">
      {/* Golden background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#08090d]/90 border border-amber-500/40 text-amber-400 text-[11px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-xl shadow-[0_0_20px_rgba(245,158,11,0.25)] mb-2.5 sm:mb-4 hover:scale-105 transition-transform duration-300 cursor-default">
            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>
              {lang === 'bn' ? 'শিক্ষাগত যোগ্যতা ও প্রশিক্ষণ' : 'Education & Professional Training'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            {lang === 'bn' ? (
              <>
                আমার এডুকেশন ও{' '}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_28px_rgba(245,158,11,0.5)]">
                  ক্রিয়েটিভ লার্নিং
                </span>
              </>
            ) : (
              <>
                My Education &{' '}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_28px_rgba(245,158,11,0.5)]">
                  Creative Learning
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Content Grid: Academic Timeline (Left) & Professional Institute Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
          {/* Academic Qualifications List */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{lang === 'bn' ? 'একাডেমিক যোগ্যতা' : 'Academic Qualifications'}</span>
            </h3>

            {academicItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#090b0f]/95 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:scale-[1.025] hover:-translate-y-1 backdrop-blur-xl group flex items-start gap-3 sm:gap-4 cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center shrink-0 group-hover:scale-115 transition-transform duration-300 text-amber-400">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-0.5 sm:mb-1">
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.degree}
                      </h4>
                      <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-[#14161f] border border-amber-500/30 text-amber-300 shrink-0 group-hover:scale-105 transition-transform duration-200">
                        {item.year}
                      </span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-400 mb-0.5 sm:mb-1">{item.desc}</p>
                    <span className="text-[10px] sm:text-[11px] font-medium text-emerald-400">
                      • {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Professional Institute Highlight Card */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{lang === 'bn' ? 'প্রফেশনাল স্কিল ট্রেনিং' : 'Professional Skill Training'}</span>
            </h3>

            <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#090b0f]/95 border border-amber-500/40 hover:border-amber-400 transition-all duration-300 shadow-[0_0_35px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:scale-[1.015] flex-1 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-amber-500/20">
                  <div>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-400 font-semibold block">
                      {lang === 'bn' ? 'স্কিল ট্রেনিং ইনস্টিটিউট' : 'Skill Training Institution'}
                    </span>
                    <h4 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight mt-0.5">
                      {trainingInstitute.institution}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] sm:text-xs font-bold hover:scale-105 transition-transform duration-200">
                      {trainingInstitute.courseName}
                    </span>
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#181a24] border border-slate-700 text-slate-300 text-[10px] sm:text-xs font-semibold hover:scale-105 transition-transform duration-200">
                      {trainingInstitute.batch}
                    </span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    {lang === 'bn' ? 'প্রশিক্ষণপ্রাপ্ত বিশেষ দক্ষতাসমূহ:' : 'Core Competencies Acquired:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    {trainingInstitute.topics.map((t, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 sm:p-3 rounded-xl bg-[#10121a]/80 border border-amber-500/20 hover:border-amber-400 hover:bg-[#161924] hover:scale-105 transition-all duration-200 cursor-default group"
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0 group-hover:scale-115 transition-transform duration-200" />
                          <span className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{t.name}</span>
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5 sm:mt-1 pl-5 sm:pl-6">
                          {t.tools}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-amber-500/20 flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
                <span className="flex items-center gap-1 sm:gap-1.5 text-slate-300 hover:scale-105 transition-transform duration-200 cursor-default">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                  {lang === 'bn' ? 'হ্যান্ডস-অন রিয়েল প্রজেক্ট' : 'Hands-on Real Projects'}
                </span>
                <span className="text-amber-300 font-semibold hover:scale-105 transition-transform duration-200 cursor-default">
                  {lang === 'bn' ? 'সার্টিফাইড স্কিলড' : 'Industry Ready'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
