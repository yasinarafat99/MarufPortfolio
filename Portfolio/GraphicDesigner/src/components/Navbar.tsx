import React, { useState, useEffect } from 'react';
import { Share2, Check, Download, MessageSquare, Menu, X, Globe } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { downloadCv } from '../utils/downloadCv';
import { profileData } from '../data/portfolioData';

interface NavbarProps {
  lang: 'en' | 'bn';
  onToggleLang?: () => void;
}

export default function Navbar({ lang = 'en', onToggleLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copiedLink, setCopiedLink] = useState(false);
  const [cvDownloaded, setCvDownloaded] = useState(false);

  const handleDownloadCv = () => {
    downloadCv();
    setCvDownloaded(true);
    setTimeout(() => setCvDownloaded(false), 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['home', 'portfolio', 'expertise', 'education', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'হোম', labelEn: 'Home', href: '#home' },
    { id: 'portfolio', label: 'প্রজেক্ট', labelEn: 'Projects', href: '#portfolio' },
    { id: 'expertise', label: 'কোর এক্সপার্টিজ অ্যান্ড স্কিলস', labelEn: 'Core Expertise & Skills', href: '#expertise' },
    { id: 'education', label: 'এডুকেশন', labelEn: 'Education', href: '#education' },
    { id: 'contact', label: 'যোগাযোগ', labelEn: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${profileData.nameEn} - Creative Visualizer & Video Editor`,
      text: `Explore ${profileData.nameEn}'s Video Editing and Digital Marketing Portfolio.`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050608]/92 backdrop-blur-md border-b border-amber-500/25 shadow-2xl shadow-black/80 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0 hover:scale-105 transition-transform duration-300"
            id="brand-logo-link"
          >
            <BrandLogo size="md" />
            <div className="text-left">
              <span className="text-base sm:text-lg font-black tracking-tight text-white block leading-tight group-hover:text-amber-300 transition-colors">
                {lang === 'bn' ? profileData.name : profileData.nameEn}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-amber-400 tracking-wider uppercase block">
                {lang === 'bn' ? 'ভিজ্যুয়ালাইজার ও ভিডিও এডিটর' : 'VISUALIZER & VIDEO EDITOR'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <nav
            className="hidden xl:flex items-center gap-1 bg-[#090b0f]/80 p-1.5 rounded-full border border-amber-500/35 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.12)]"
            id="desktop-nav-menu"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  id={`nav-link-${link.id}`}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 shadow-sm border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                      : 'text-slate-300 hover:text-amber-200 hover:bg-white/5'
                  }`}
                >
                  <span>{lang === 'bn' ? link.label : link.labelEn}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />}
                </a>
              );
            })}

            {/* Download CV button in menu */}
            <button
              onClick={handleDownloadCv}
              id="nav-download-cv-btn"
              className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 text-amber-400 hover:text-black hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-400 border border-amber-500/40 hover:border-amber-300 cursor-pointer ml-1 shadow-sm hover:scale-105 active:scale-95"
              title={lang === 'bn' ? 'সিভি ডাউনলোড করুন' : 'Download CV'}
            >
              {cvDownloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">{lang === 'bn' ? 'ডাউনলোড!' : 'Done!'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'bn' ? 'ডাউনলোড সিভি' : 'Download CV'}</span>
                </>
              )}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Language Toggle Button */}
            {onToggleLang && (
              <button
                onClick={onToggleLang}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-amber-500/15 text-slate-300 hover:text-amber-300 border border-amber-500/35 hover:border-amber-400 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold hover:scale-105 active:scale-95"
                title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
              </button>
            )}

            {/* Share button */}
            <button
              id="share-portfolio-btn"
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500/15 text-slate-300 hover:text-amber-300 border border-amber-500/35 hover:border-amber-400 transition-all cursor-pointer relative group shadow-sm hover:scale-110 active:scale-95"
              title={lang === 'bn' ? 'পোর্টফোলিও লিংক শেয়ার করুন' : 'Share Portfolio'}
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4 text-slate-300 group-hover:text-amber-300" />
              )}
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap shadow-lg">
                  {lang === 'bn' ? 'লিংক কপি হয়েছে!' : 'Link Copied!'}
                </span>
              )}
            </button>

            {/* Let's Talk CTA */}
            <a
              id="nav-contact-cta-btn"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-200/50"
            >
              <MessageSquare className="w-4 h-4 fill-black/20 text-black" />
              <span>{lang === 'bn' ? 'কথা বলুন' : "Let's Talk"}</span>
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex xl:hidden items-center gap-2">
            {onToggleLang && (
              <button
                onClick={onToggleLang}
                className="px-2.5 py-1.5 rounded-full bg-white/5 text-amber-300 hover:text-white border border-amber-500/35 text-xs font-bold"
              >
                {lang === 'bn' ? 'EN' : 'বাং'}
              </button>
            )}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/5 text-slate-200 hover:text-amber-300 border border-amber-500/35 hover:border-amber-400 focus:outline-none transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="xl:hidden mt-3 p-4 bg-[#08090d]/98 border border-amber-500/40 rounded-2xl backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.9),0_0_20px_rgba(245,158,11,0.2)] flex flex-col gap-1.5"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                id={`mobile-nav-${link.id}`}
                className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-300 hover:text-amber-200 hover:bg-white/5'
                }`}
              >
                <span>{lang === 'bn' ? link.label : link.labelEn}</span>
                {activeSection === link.id && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </a>
            ))}

            <div className="pt-3 border-t border-amber-500/25 flex flex-col gap-2">
              <button
                onClick={() => {
                  handleDownloadCv();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-slate-100 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 rounded-full shadow-md cursor-pointer"
              >
                {cvDownloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">{lang === 'bn' ? 'ডাউনলোড সম্পন্ন!' : 'Downloaded!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'bn' ? 'ডাউনলোড সিভি' : 'Download CV'}</span>
                  </>
                )}
              </button>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full shadow-lg shadow-amber-500/30"
              >
                <MessageSquare className="w-4 h-4 text-black" />
                <span>{lang === 'bn' ? 'কথা বলুন' : "Let's Talk"}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
