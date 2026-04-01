'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/components/ui/utils';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  width?: number;
  className?: string;
}

function optimizedSrc(src: string, width: number): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

export function ImageWithFallback({ src, alt, width = 640, className }: ImageWithFallbackProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  const imgUrl = src ? optimizedSrc(src, width) : '';

  useEffect(() => {
    if (!src) {
      setState('error');
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setState('loading');

          const img = new window.Image();
          img.src = imgUrl;
          img
            .decode()
            .then(() => setState('ready'))
            .catch(() => setState('error'));
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src, imgUrl]);

  if (state === 'error' || !src) {
    return (
      <div
        ref={containerRef}
        className={cn(
          'absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground',
          className
        )}
      >
        <ImageOff className="h-8 w-8 opacity-40" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      {(state === 'idle' || state === 'loading') && (
        <div className="absolute inset-0 animate-shimmer bg-muted" />
      )}
      {state === 'ready' && (
        <img
          src={imgUrl}
          alt={alt}
          className={cn('absolute inset-0 w-full h-full object-cover fade-in', className)}
        />
      )}
    </div>
  );
}
