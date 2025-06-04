import { memo } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'product' | 'text' | 'avatar' | 'button';
  lines?: number;
  animated?: boolean;
}

const Skeleton = memo(({ 
  className, 
  variant = 'default', 
  lines = 1,
  animated = true 
}: SkeletonProps) => {
  const baseClasses = cn(
    'bg-gray-200 rounded',
    animated && 'animate-pulse',
    className
  );

  switch (variant) {
    case 'card':
      return (
        <div className={cn('p-4 border rounded-lg space-y-3', animated && 'animate-pulse')}>
          <div className="bg-gray-200 h-48 rounded" />
          <div className="space-y-2">
            <div className="bg-gray-200 h-4 rounded w-3/4" />
            <div className="bg-gray-200 h-4 rounded w-1/2" />
          </div>
          <div className="flex justify-between items-center">
            <div className="bg-gray-200 h-6 rounded w-20" />
            <div className="bg-gray-200 h-8 rounded w-16" />
          </div>
        </div>
      );

    case 'product':
      return (
        <div className={cn('bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm mx-auto', animated && 'animate-pulse')}>
          <div className="bg-gray-200 h-56" />
          <div className="p-4 space-y-3">
            <div className="bg-gray-200 h-4 rounded w-3/4" />
            <div className="bg-gray-200 h-3 rounded w-full" />
            <div className="bg-gray-200 h-3 rounded w-2/3" />
            <div className="bg-gray-200 h-3 rounded w-1/2" />
            <div className="flex justify-between items-center pt-2">
              <div className="bg-gray-200 h-6 rounded w-20" />
              <div className="bg-gray-200 h-8 rounded w-16" />
            </div>
          </div>
        </div>
      );

    case 'text':
      return (
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div 
              key={i}
              className={cn(
                baseClasses,
                'h-4',
                i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full'
              )}
            />
          ))}
        </div>
      );

    case 'avatar':
      return (
        <div className={cn(baseClasses, 'h-10 w-10 rounded-full')} />
      );

    case 'button':
      return (
        <div className={cn(baseClasses, 'h-10 w-24')} />
      );

    default:
      return <div className={baseClasses} />;
  }
});

Skeleton.displayName = 'Skeleton';

// Skeleton components for specific use cases
export const ProductGridSkeleton = memo(({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} variant="product" />
    ))}
  </div>
));

ProductGridSkeleton.displayName = 'ProductGridSkeleton';

export const HeaderSkeleton = memo(() => (
  <div className="bg-white shadow-sm animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="bg-gray-200 h-8 w-32 rounded" />
        <div className="hidden md:flex space-x-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-200 h-6 w-16 rounded" />
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 h-8 w-8 rounded-full" />
          <div className="bg-gray-200 h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  </div>
));

HeaderSkeleton.displayName = 'HeaderSkeleton';

export const CartSkeleton = memo(() => (
  <div className="space-y-4 animate-pulse">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
        <div className="bg-gray-200 h-16 w-16 rounded" />
        <div className="flex-1 space-y-2">
          <div className="bg-gray-200 h-4 w-3/4 rounded" />
          <div className="bg-gray-200 h-3 w-1/2 rounded" />
        </div>
        <div className="bg-gray-200 h-8 w-20 rounded" />
      </div>
    ))}
  </div>
));

CartSkeleton.displayName = 'CartSkeleton';

export default Skeleton;
