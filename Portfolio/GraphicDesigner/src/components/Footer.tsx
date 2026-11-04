import { ArrowUp, Download, Sparkles, Youtube, Linkedin } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { profileData } from '../data/portfolioData';
import { downloadCv } from '../utils/downloadCv';

// Custom Facebook and Instagram icons for footer
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

interface FooterProps {
  lang: 'en' | 'bn';
}

export default function Footer({ lang = 'en' }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030406]/95 backdrop-blur-md border-t border-amber-500/25 py-12 text-slate-400 text-xs relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Title */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <BrandLogo size="md" />
            <div>
              <span className="text-base font-bold text-white block">
                {lang === 'bn' ? profileData.name : profileData.nameEn}
              </span>
              <span className="text-xs text-amber-400 font-medium tracking-wider uppercase">
                {lang === 'bn' ? 'ভিজ্যুয়ালাইজার ও ভিডিও এডিটর' : 'VISUALIZER & VIDEO EDITOR'}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-slate-300 font-medium">
            <a href="#home" className="hover:text-amber-400 hover:scale-105 transition-all duration-200">
              {lang === 'bn' ? 'হোম' : 'Home'}
            </a>
            <a href="#portfolio" className="hover:text-amber-400 hover:scale-105 transition-all duration-200">
              {lang === 'bn' ? 'প্রজেক্ট' : 'Projects'}
            </a>
            <a href="#expertise" className="hover:text-amber-400 hover:scale-105 transition-all duration-200">
              {lang === 'bn' ? 'কোর এক্সপার্টিজ অ্যান্ড স্কিলস' : 'Core Expertise & Skills'}
            </a>
            <a href="#education" className="hover:text-amber-400 hover:scale-105 transition-all duration-200">
              {lang === 'bn' ? 'এডুকেশন' : 'Education'}
            </a>
            <a href="#contact" className="hover:text-amber-400 hover:scale-105 transition-all duration-200">
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </a>

            <button
              onClick={downloadCv}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-200 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'সিভি ডাউনলোড' : 'Download CV'}</span>
            </button>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-2.5">
            <a
              href={profileData.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 hover:scale-115 active:scale-95 transition-all duration-200 border border-amber-500/35 hover:border-amber-400 shadow-sm"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>

            <a
              href={profileData.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 hover:scale-115 active:scale-95 transition-all duration-200 border border-amber-500/35 hover:border-amber-400 shadow-sm"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>

            <a
              href={profileData.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 hover:scale-115 active:scale-95 transition-all duration-200 border border-amber-500/35 hover:border-amber-400 shadow-sm"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 hover:scale-115 active:scale-95 transition-all duration-200 border border-amber-500/35 hover:border-amber-400 shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              id="back-to-top-btn"
              className="p-2 rounded-full bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-slate-300 hover:scale-110 active:scale-95 transition-all duration-200 border border-amber-500/35 hover:border-amber-400 ml-2 cursor-pointer shadow-sm"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="border-t border-amber-500/15 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2 text-center sm:text-left">
          <p>© 2026 {profileData.nameEn} | All Right Reserved.</p>
          <p className="flex items-center gap-1 justify-center">
            <span>Crafting visual stories that connect, convert & elevate brands</span>
            <Sparkles className="w-3 h-3 text-amber-400 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
