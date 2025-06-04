
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  lines?: number;
  width?: string;
  height?: string;
}

const Skeleton = ({ 
  className, 
  variant = 'rectangular',
  lines = 1,
  width,
  height,
  ...props 
}: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) => {
  const baseClasses = "animate-pulse bg-muted";
  
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-md",
    card: "rounded-lg"
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variantClasses.text,
              i === lines - 1 ? "w-3/4" : "w-full"
            )}
            style={{ width: i === lines - 1 ? '75%' : width, height }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
      {...props}
    />
  );
};

export { Skeleton };
