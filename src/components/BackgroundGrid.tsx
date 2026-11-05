export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050608]" aria-hidden="true">
      {/* Golden ambient gradient lighting */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#f59e0b]/15 via-amber-600/8 to-transparent rounded-full blur-[140px]" />
      <div className="absolute top-[35%] right-[-5%] w-[600px] h-[600px] bg-[#eab308]/10 rounded-full blur-[160px]" />
      <div className="absolute top-[70%] left-[-5%] w-[650px] h-[650px] bg-[#d97706]/8 rounded-full blur-[170px]" />

      <svg
        className="absolute inset-0 w-full h-full opacity-90"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, rgba(0,0,0,0.4) 75%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, rgba(0,0,0,0.4) 75%, transparent 100%)',
        }}
      >
        <defs>
          <pattern id="aesthetic-micro-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(245, 158, 11, 0.08)" strokeWidth="1" />
            <circle cx="48" cy="48" r="1" fill="rgba(245, 158, 11, 0.28)" />
          </pattern>
          <pattern id="aesthetic-macro-grid" width="192" height="192" patternUnits="userSpaceOnUse">
            <path d="M 192 0 L 0 0 0 192" fill="none" stroke="rgba(245, 158, 11, 0.16)" strokeWidth="1.2" />
            <path d="M 186 192 L 198 192 M 192 186 L 192 198" fill="none" stroke="rgba(251, 191, 36, 0.55)" strokeWidth="1.5" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#aesthetic-micro-grid)" />
        <rect width="100%" height="100%" fill="url(#aesthetic-macro-grid)" />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, transparent 45%, rgba(5, 6, 8, 0.75) 100%)',
        }}
      />
    </div>
  );
}
