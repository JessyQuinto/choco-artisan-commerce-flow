
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn = ({ children, delay = 0, duration = 300, className }: FadeInProps) => (
  <div
    className={cn("animate-in fade-in-0", className)}
    style={{
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
      animationFillMode: 'both'
    }}
  >
    {children}
  </div>
);

interface SlideInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const SlideIn = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className 
}: SlideInProps) => {
  const directionClasses = {
    up: "animate-in slide-in-from-bottom-4",
    down: "animate-in slide-in-from-top-4",
    left: "animate-in slide-in-from-right-4",
    right: "animate-in slide-in-from-left-4"
  };

  return (
    <div
      className={cn(directionClasses[direction], className)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: '400ms',
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  );
};

export const ScaleIn = ({ children, delay = 0, className }: FadeInProps) => (
  <div
    className={cn("animate-in zoom-in-95", className)}
    style={{
      animationDelay: `${delay}ms`,
      animationDuration: '200ms',
      animationFillMode: 'both'
    }}
  >
    {children}
  </div>
);
