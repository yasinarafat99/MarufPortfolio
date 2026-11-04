import { useState, useEffect } from 'react';
import BackgroundGrid from './components/BackgroundGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Expertise from './components/Expertise';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { profileData } from './data/portfolioData';

export default function App() {
  const [lang, setLang] = useState<'en' | 'bn'>(() => {
    const saved = localStorage.getItem('noman_portfolio_lang');
    return saved === 'bn' ? 'bn' : 'en';
  });

  const [avatarUrl] = useState(() => {
    const saved = localStorage.getItem('noman_avatar_url');
    if (!saved || saved.includes('images.unsplash.com') || saved.includes('farabi-avatar')) {
      return profileData.defaultAvatar;
    }
    return saved;
  });

  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'bn' : 'en';
    setLang(nextLang);
    localStorage.setItem('noman_portfolio_lang', nextLang);
    document.documentElement.lang = nextLang;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#050608] text-slate-100 selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      {/* Background Animated Golden Micro-Grid */}
      <BackgroundGrid />

      {/* Navigation Header */}
      <Navbar lang={lang} onToggleLang={toggleLang} />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
        <Hero lang={lang} avatarUrl={avatarUrl} />
        <Portfolio lang={lang} />
        <Expertise lang={lang} />
        <Education lang={lang} />
        <Contact lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
