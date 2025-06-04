
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';

const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, []);

  return (
    <div className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out',
      isVisible ? 'translate-y-0' : '-translate-y-full'
    )}>
      <Header />
    </div>
  );
};

export default StickyHeader;
