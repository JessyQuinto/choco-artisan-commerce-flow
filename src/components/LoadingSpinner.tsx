
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner = ({ size = 'md', text = 'Cargando...', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-background ${className || ''}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className={`${sizeClasses[size]} border-4 border-primary/20 border-t-primary rounded-full animate-spin`}></div>
        <p className={`text-primary-secondary ${textSizeClasses[size]}`}>{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
