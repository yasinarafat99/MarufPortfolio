interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function BrandLogo({ size = 'md', className = '' }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 sm:w-11 sm:h-11',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-b from-[#1a1e2d] to-[#0a0c12] border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] group-hover:border-amber-300 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-all duration-300 select-none shrink-0 overflow-hidden ${sizeClasses} ${className}`}
    >
      {/* Subtle Golden ambient ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/25 via-transparent to-yellow-300/35 pointer-events-none z-20" />

      {/* Profile Photo as Logo (Full round shape) */}
      <img
        src="/noman-hero.png"
        alt="Noman Hossain"
        className="w-full h-full object-cover object-top relative z-10 transition-transform duration-300 group-hover:scale-110"
        loading="eager"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.dataset.fallback) {
            target.dataset.fallback = 'true';
            target.src = 'https://i.postimg.cc/tC1c0nGd/Chat-GPT-Image-Sep-24-2026-02-04-11-PM.png';
          }
        }}
      />
    </div>
  );
}
