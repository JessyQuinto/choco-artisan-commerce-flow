
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const LazyImage = ({ src, alt, className, placeholder }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const defaultPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjRmMmYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM4ODZmNjMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DYXJnYW5kby4uLjwvdGV4dD48L3N2Zz4=";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        ref={imgRef}
        src={isInView ? src : (placeholder || defaultPlaceholder)}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-70"
        )}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-primary-background animate-pulse" />
      )}
    </div>
  );
};

export default LazyImage;
