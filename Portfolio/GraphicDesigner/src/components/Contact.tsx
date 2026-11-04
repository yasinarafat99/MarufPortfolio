import { useState } from 'react';
import { Mail, MessageCircle, Copy, Check, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { profileData } from '../data/portfolioData';

// Custom Facebook and Instagram icons for branding
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

interface ContactProps {
  lang: 'en' | 'bn';
}

export default function Contact({ lang = 'en' }: ContactProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const contactCards = [
    {
      id: 'email',
      name: lang === 'bn' ? 'ইমেইল এড্রেস' : 'Email Address',
      handle: profileData.email,
      desc:
        lang === 'bn'
          ? 'অফিসিয়াল ইনকোয়ারি ও সরাসরি জিমেইল পাঠান'
          : 'Official inquiries & send direct Gmail',
      icon: Mail,
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      glowColor:
        'shadow-[0_0_25px_rgba(245,158,11,0.18)] hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]',
      bgGlow: 'bg-amber-500/15',
      actionText: lang === 'bn' ? 'জিমেইল পাঠান' : 'Send via Gmail',
      actionUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}&su=Project%20Inquiry%20for%20${encodeURIComponent(profileData.nameEn)}`,
      altUrl: `mailto:${profileData.email}?subject=Project%20Inquiry%20for%20${encodeURIComponent(profileData.nameEn)}`,
      altText: lang === 'bn' ? 'মেইল অ্যাপে খুলুন' : 'Open in Mail App',
      hasCopy: true,
    },
    {
      id: 'whatsapp',
      name: lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp',
      handle: '01309465316',
      desc:
        lang === 'bn'
          ? 'দ্রুততম মেসেজ ও আর্জেন্ট যোগাযোগ'
          : 'Fastest response for direct chats',
      icon: MessageCircle,
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      glowColor:
        'shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:shadow-[0_0_35px_rgba(16,185,129,0.3)]',
      bgGlow: 'bg-emerald-500/10',
      actionText: lang === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'Chat on WhatsApp',
      actionUrl:
        'https://wa.me/8801309465316?text=Hello%20Noman,%20I%20would%20like%20to%20discuss%20a%20project!',
      hasCopy: false,
    },
    {
      id: 'facebook',
      name: lang === 'bn' ? 'ফেসবুক' : 'Facebook',
      handle: 'ifran.hossain.392',
      desc:
        lang === 'bn'
          ? 'কমিউনিটি আপডেট ও সোশ্যাল কানেকশন'
          : 'Connect on Facebook profile',
      icon: FacebookIcon,
      accentColor: 'text-blue-400',
      borderColor: 'border-blue-500/40 hover:border-blue-400',
      glowColor:
        'shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:shadow-[0_0_35px_rgba(59,130,246,0.3)]',
      bgGlow: 'bg-blue-500/10',
      actionText: lang === 'bn' ? 'ফেসবুক প্রোফাইল' : 'Visit Facebook',
      actionUrl: 'https://www.facebook.com/ifran.hossain.392',
      hasCopy: false,
    },
    {
      id: 'instagram',
      name: lang === 'bn' ? 'ইনস্টাগ্রাম' : 'Instagram',
      handle: '@nomanhossain392',
      desc:
        lang === 'bn'
          ? 'ভিজ্যুয়াল আর্টওয়ার্ক ও মোশন স্ন্যাপশট'
          : 'Visual reels & design carousels',
      icon: InstagramIcon,
      accentColor: 'text-pink-400',
      borderColor: 'border-pink-500/40 hover:border-pink-400',
      glowColor:
        'shadow-[0_0_25px_rgba(236,72,153,0.15)] hover:shadow-[0_0_35px_rgba(236,72,153,0.3)]',
      bgGlow: 'bg-pink-500/10',
      actionText: lang === 'bn' ? 'ইনস্টাগ্রাম পেজ' : 'Visit Instagram',
      actionUrl: 'https://www.instagram.com/nomanhossain392/?hl=en#',
      hasCopy: false,
    },
  ];

  return (
    <section
      id="contact"
      className="py-10 sm:py-16 md:py-24 bg-[#050608]/95 backdrop-blur-[2px] relative border-t border-amber-500/20"
    >
      {/* Golden background blurs */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 md:mb-14 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#08090d]/90 border border-amber-500/40 text-amber-400 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:scale-105 transition-transform duration-300 cursor-default">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'bn' ? 'কানেক্ট ও যোগাযোগ' : 'CONNECT & COLLABORATE'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {lang === 'bn' ? (
              <>
                চলুন তৈরি করি <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_28px_rgba(245,158,11,0.5)]">অসাধারণ কিছু</span>
              </>
            ) : (
              <>
                Let's Create Something <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_28px_rgba(245,158,11,0.5)]">Extraordinary</span>
              </>
            )}
          </h2>
        </div>

        {/* 4 Cards Grid: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#090b0f]/95 border ${card.borderColor} ${card.glowColor} transition-all duration-300 backdrop-blur-xl flex flex-col justify-between group hover:-translate-y-1.5 hover:scale-[1.03] cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                    <div
                      className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl ${card.bgGlow} border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-115 transition-transform duration-300`}
                    >
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.accentColor}`} />
                    </div>

                    {card.hasCopy && (
                      <button
                        onClick={handleCopyEmail}
                        className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 text-slate-400 hover:text-amber-300 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                        title={lang === 'bn' ? 'ইমেইল কপি করুন' : 'Copy Email'}
                      >
                        {copiedEmail ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  <h3 className="text-xs sm:text-base font-bold text-white mb-0.5 sm:mb-1 group-hover:text-amber-300 transition-colors line-clamp-1">{card.name}</h3>
                  {card.id === 'email' ? (
                    <a
                      href={card.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] sm:text-xs font-mono font-medium text-amber-300 hover:text-amber-200 underline decoration-amber-500/40 underline-offset-2 truncate mb-1 sm:mb-2 block transition-colors"
                      title={lang === 'bn' ? 'জিমেইলে খুলুন' : 'Open in Gmail'}
                    >
                      {card.handle}
                    </a>
                  ) : (
                    <p className="text-[10px] sm:text-xs font-mono font-medium text-slate-300 truncate mb-1 sm:mb-2">
                      {card.handle}
                    </p>
                  )}
                  <p className="text-[10px] sm:text-xs text-slate-400 leading-snug mb-3 sm:mb-6 line-clamp-2">{card.desc}</p>
                </div>

                <div>
                  <a
                    href={card.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold text-center block transition-all border border-amber-500/20 bg-white/5 hover:bg-amber-500/15 text-white ${card.accentColor} group-hover:border-current hover:scale-105 active:scale-95`}
                  >
                    <span className="inline-flex items-center justify-center gap-1 sm:gap-1.5">
                      {card.actionText}
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-70" />
                    </span>
                  </a>

                  {card.altUrl && (
                    <a
                      href={card.altUrl}
                      className="mt-1 sm:mt-2 text-[9px] sm:text-[11px] text-slate-400 hover:text-amber-300 text-center block transition-all hover:scale-105 truncate"
                    >
                      {card.altText}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#090b0f]/95 border border-amber-500/35 shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:scale-[1.01] transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              {lang === 'bn'
                ? 'ঢাকায় অবস্থান • বিশ্বব্যাপী কাজ'
                : 'Based in Dhaka • Available Worldwide'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {lang === 'bn'
                ? 'বাংলাদেশে ও গ্লোবালি রিমোটলি যেকোনো ভিডিও এডিটিং ও ভিজ্যুয়াল ডিজাইনের কাজের জন্য উপলব্ধ।'
                : 'Based in Dhaka, Bangladesh — Available worldwide for remote video editing and graphic design collaborations.'}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 font-semibold hover:scale-105 transition-transform duration-200 cursor-default">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lang === 'bn' ? 'নতুন প্রজেক্টে এভেইলেবল' : 'Available for Projects'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-slate-700 text-slate-300 hover:scale-105 transition-transform duration-200 cursor-default">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'bn' ? 'গড় রেসপন্স: ২ ঘণ্টার মধ্যে' : 'Response: Within 2 Hours'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 pt-2 md:pt-0 w-full sm:w-auto">
            <a
              href="https://wa.me/8801309465316?text=Hello%20Noman,%20let's%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে লিখুন' : 'Chat on WhatsApp'}</span>
            </a>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}&su=Project%20Discussion`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 cursor-pointer border border-amber-200"
            >
              <Mail className="w-4 h-4" />
              <span>{lang === 'bn' ? 'সরাসরি জিমেইল করুন' : 'Send via Gmail'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
