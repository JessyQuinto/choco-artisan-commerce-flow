
import { cn } from "@/lib/utils";

interface InteractiveButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'hover' | 'press' | 'float';
}

export const InteractiveButton = ({ 
  children, 
  className, 
  onClick, 
  variant = 'hover' 
}: InteractiveButtonProps) => {
  const variants = {
    hover: "transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95",
    press: "transition-transform duration-100 active:scale-95",
    float: "transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 rounded",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

interface PulseLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PulseLoader = ({ size = 'md', className }: PulseLoaderProps) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-primary rounded-full animate-pulse",
            sizeClasses[size]
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );
};
