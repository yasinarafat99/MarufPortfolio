import { useState, useRef, useEffect } from 'react';

const preloadedImages = new Set<string>();

export function preloadImages(urls: string[]) {
  if (typeof window === 'undefined') return;
  const loadNext = (index: number) => {
    if (index >= urls.length) return;
    const url = urls[index];
    if (preloadedImages.has(url)) {
      loadNext(index + 1);
      return;
    }
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.src = url;
    img.onload = () => {
      preloadedImages.add(url);
      setTimeout(() => loadNext(index + 1), 50);
    };
    img.onerror = () => {
      loadNext(index + 1);
    };
  };

  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => loadNext(0));
  } else {
    setTimeout(() => loadNext(0), 200);
  }
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  fallbackTitle?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  referrerPolicy = 'no-referrer',
}: OptimizedImageProps) {
  const isCached = preloadedImages.has(src);
  const [loaded, setLoaded] = useState(isCached);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isCached) {
      setLoaded(true);
      return;
    }
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
      preloadedImages.add(src);
    }
  }, [src, isCached]);

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${containerClassName}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#ff5e28]/40 border-t-[#ff5e28] animate-spin" />
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy={referrerPolicy}
        onLoad={() => {
          setLoaded(true);
          preloadedImages.add(src);
        }}
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.dataset.fallback) {
            target.dataset.fallback = 'true';
            target.src = 'https://i.postimg.cc/6qvx68XJ/Chat-GPT-Image-Sep-13-2026-06-02-22-PM.png';
          } else {
            setError(true);
          }
        }}
      />
    </div>
  );
}
