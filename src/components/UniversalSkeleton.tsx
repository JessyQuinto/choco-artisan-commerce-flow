
import { cn } from '@/lib/utils';

interface SkeletonProps {
  variant?: 'card' | 'text' | 'avatar' | 'button' | 'image';
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

const UniversalSkeleton = ({ 
  variant = 'text', 
  width, 
  height, 
  className,
  count = 1 
}: SkeletonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'h-48 w-full rounded-xl';
      case 'text':
        return 'h-4 w-3/4 rounded';
      case 'avatar':
        return 'h-12 w-12 rounded-full';
      case 'button':
        return 'h-10 w-24 rounded-md';
      case 'image':
        return 'h-32 w-full rounded-lg';
      default:
        return 'h-4 w-full rounded';
    }
  };

  const skeletonClasses = cn(
    'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200',
    getVariantClasses(),
    className
  );

  const style = {
    ...(width && { width }),
    ...(height && { height })
  };

  if (count === 1) {
    return <div className={skeletonClasses} style={style} />;
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={skeletonClasses} style={style} />
      ))}
    </div>
  );
};

export default UniversalSkeleton;
