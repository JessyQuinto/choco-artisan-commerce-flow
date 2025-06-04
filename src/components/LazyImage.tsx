
import { useState, useRef, useEffect, memo, useCallback } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto';
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = memo(({ 
  src, 
  alt, 
  className, 
  placeholder,
  width,
  height,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  aspectRatio = 'auto',
  quality = 80,
  onLoad,
  onError
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Modern image format detection
  const supportsWebP = useRef<boolean | null>(null);
  const supportsAVIF = useRef<boolean | null>(null);

  useEffect(() => {
    // Check WebP support
    if (supportsWebP.current === null) {
      const webp = new Image();
      webp.onload = webp.onerror = () => {
        supportsWebP.current = webp.height === 2;
      };
      webp.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    // Check AVIF support
    if (supportsAVIF.current === null) {
      const avif = new Image();
      avif.onload = avif.onerror = () => {
        supportsAVIF.current = avif.height === 2;
      };
      avif.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAOptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA==";
    }
  }, []);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setLoadingState('loading');
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Pre-load images 100px before they come into view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const createOptimizedUrls = useCallback((url: string) => {
    const baseUrl = url.split('.').slice(0, -1).join('.');
    const extension = url.split('.').pop();
    
    // Add quality parameter if it's a service that supports it
    const qualityParam = quality !== 80 ? `?q=${quality}` : '';
    
    return {
      avif: `${baseUrl}.avif${qualityParam}`,
      webp: `${baseUrl}.webp${qualityParam}`,
      original: `${url}${qualityParam}`
    };
  }, [quality]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
    setLoadingState('error');
    onError?.();
  }, [onError]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    setLoadingState('loaded');
    onLoad?.();
  }, [onLoad]);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'portrait': return 'aspect-[3/4]';
      case 'landscape': return 'aspect-[4/3]';
      default: return '';
    }
  };

  const defaultPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjRmMmYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM4ODZmNjMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DYXJnYW5kby4uLjwvdGV4dD48L3N2Zz4=";

  if (!isInView) {
    return (
      <div 
        ref={containerRef}
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200",
          getAspectRatioClass(),
          className
        )}
        style={{ width, height }}
      >
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-chocolate-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const urls = createOptimizedUrls(src);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden group",
        getAspectRatioClass(),
        className
      )}
    >
      <picture>
        {/* AVIF format for modern browsers */}
        <source 
          srcSet={urls.avif} 
          type="image/avif" 
          sizes={sizes}
        />
        {/* WebP format for broader support */}
        <source 
          srcSet={urls.webp} 
          type="image/webp" 
          sizes={sizes}
        />
        {/* Fallback to original format */}
        <img
          ref={imgRef}
          src={hasError ? (placeholder || defaultPlaceholder) : urls.original}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 ease-out",
            isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-105",
            hasError && "filter grayscale",
            "group-hover:scale-105 group-hover:brightness-110"
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width={width}
          height={height}
          sizes={sizes}
        />
      </picture>
      
      {/* Loading state overlay */}
      {loadingState === 'loading' && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-chocolate-200 border-t-chocolate-600 rounded-full animate-spin" />
              <span className="text-xs text-gray-500">Cargando...</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200">
          <div className="text-center px-4">
            <svg 
              className="w-8 h-8 text-gray-400 mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span className="text-xs text-gray-400 block">Error al cargar</span>
          </div>
        </div>
      )}

      {/* Success indicator for development */}
      {process.env.NODE_ENV === 'development' && isLoaded && !hasError && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            ✓ {loadingState}
          </div>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;
