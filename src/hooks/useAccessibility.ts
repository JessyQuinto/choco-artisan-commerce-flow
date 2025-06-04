// Accessibility Enhancement Utilities
// Provides comprehensive accessibility features and improvements

import { useEffect, useCallback, useState } from 'react';

interface A11yConfig {
  enableHighContrast?: boolean;
  enableLargeText?: boolean;
  enableMotionReduction?: boolean;
  enableScreenReaderMode?: boolean;
  enableKeyboardNavigation?: boolean;
}

// Custom hook for accessibility features
export function useAccessibility(config: A11yConfig = {}) {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isMotionReduced, setIsMotionReduced] = useState(false);
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false);

  useEffect(() => {
    // Check user preferences on mount
    const checkUserPreferences = () => {
      // High contrast
      if (window.matchMedia('(prefers-contrast: high)').matches) {
        setIsHighContrast(true);
      }

      // Reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsMotionReduced(true);
      }

      // Check for screen reader
      const isScreenReader = window.navigator.userAgent.includes('NVDA') ||
                           window.navigator.userAgent.includes('JAWS') ||
                           window.speechSynthesis?.getVoices().length > 0;
      setIsScreenReaderActive(isScreenReader);
    };

    checkUserPreferences();

    // Listen for preference changes
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleContrastChange = (e: MediaQueryListEvent) => setIsHighContrast(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setIsMotionReduced(e.matches);

    contrastQuery.addEventListener('change', handleContrastChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      contrastQuery.removeEventListener('change', handleContrastChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Apply accessibility classes to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (isHighContrast || config.enableHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (isLargeText || config.enableLargeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    if (isMotionReduced || config.enableMotionReduction) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    if (isScreenReaderActive || config.enableScreenReaderMode) {
      root.classList.add('screen-reader-mode');
    } else {
      root.classList.remove('screen-reader-mode');
    }
  }, [isHighContrast, isLargeText, isMotionReduced, isScreenReaderActive, config]);

  const toggleHighContrast = useCallback(() => {
    setIsHighContrast(prev => !prev);
    localStorage.setItem('a11y-high-contrast', String(!isHighContrast));
  }, [isHighContrast]);

  const toggleLargeText = useCallback(() => {
    setIsLargeText(prev => !prev);
    localStorage.setItem('a11y-large-text', String(!isLargeText));
  }, [isLargeText]);

  const toggleMotionReduction = useCallback(() => {
    setIsMotionReduced(prev => !prev);
    localStorage.setItem('a11y-motion-reduced', String(!isMotionReduced));
  }, [isMotionReduced]);

  return {
    isHighContrast,
    isLargeText,
    isMotionReduced,
    isScreenReaderActive,
    toggleHighContrast,
    toggleLargeText,
    toggleMotionReduction
  };
}

// Custom hook for keyboard navigation
export function useKeyboardNavigation() {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    let keyboardTimeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab, Arrow keys, Enter, Space indicate keyboard usage
      if (['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
        setIsKeyboardUser(true);
        document.body.classList.add('keyboard-user');
        
        // Clear existing timeout
        clearTimeout(keyboardTimeout);
        
        // Remove keyboard user class after 3 seconds of no keyboard activity
        keyboardTimeout = setTimeout(() => {
          setIsKeyboardUser(false);
          document.body.classList.remove('keyboard-user');
        }, 3000);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
      document.body.classList.remove('keyboard-user');
      clearTimeout(keyboardTimeout);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      clearTimeout(keyboardTimeout);
    };
  }, []);

  return { isKeyboardUser };
}

// Custom hook for focus management
export function useFocusManagement() {
  const trapFocus = useCallback((element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  const focusFirst = useCallback((container: HTMLElement) => {
    const firstFocusable = container.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }, []);

  return { trapFocus, focusFirst };
}

// Custom hook for screen reader announcements
export function useScreenReader() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  const announcePageChange = useCallback((pageName: string) => {
    announce(`Navegando a ${pageName}`, 'assertive');
  }, [announce]);

  const announceError = useCallback((error: string) => {
    announce(`Error: ${error}`, 'assertive');
  }, [announce]);

  const announceSuccess = useCallback((message: string) => {
    announce(`Éxito: ${message}`, 'polite');
  }, [announce]);

  return {
    announce,
    announcePageChange,
    announceError,
    announceSuccess
  };
}

// Custom hook for color contrast validation
export function useColorContrast() {
  const checkContrast = useCallback((foreground: string, background: string): number => {
    // Convert colors to RGB values
    const getRGB = (color: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b };
    };

    // Calculate relative luminance
    const getLuminance = (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const fg = getRGB(foreground);
    const bg = getRGB(background);
    
    const fgLuminance = getLuminance(fg.r, fg.g, fg.b);
    const bgLuminance = getLuminance(bg.r, bg.g, bg.b);
    
    const lighter = Math.max(fgLuminance, bgLuminance);
    const darker = Math.min(fgLuminance, bgLuminance);
    
    return (lighter + 0.05) / (darker + 0.05);
  }, []);

  const isAccessible = useCallback((foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
    const contrast = checkContrast(foreground, background);
    return level === 'AA' ? contrast >= 4.5 : contrast >= 7;
  }, [checkContrast]);

  return { checkContrast, isAccessible };
}

// Utility functions for ARIA attributes
export const getAriaProps = (element: {
  label?: string;
  describedBy?: string;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  live?: 'off' | 'polite' | 'assertive';
}) => {
  const props: Record<string, any> = {};

  if (element.label) props['aria-label'] = element.label;
  if (element.describedBy) props['aria-describedby'] = element.describedBy;
  if (element.expanded !== undefined) props['aria-expanded'] = element.expanded;
  if (element.selected !== undefined) props['aria-selected'] = element.selected;
  if (element.disabled) props['aria-disabled'] = true;
  if (element.required) props['aria-required'] = true;
  if (element.invalid) props['aria-invalid'] = true;
  if (element.live) props['aria-live'] = element.live;

  return props;
};

// Skip link component helper
export const createSkipLink = (targetId: string, text: string = 'Saltar al contenido principal') => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50';
  
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return skipLink;
};

// Text size utilities
export const adjustTextSize = (increase: boolean = true) => {
  const root = document.documentElement;
  const currentSize = parseFloat(getComputedStyle(root).fontSize);
  const newSize = increase ? currentSize * 1.1 : currentSize * 0.9;
  
  // Limit between 12px and 24px
  const clampedSize = Math.max(12, Math.min(24, newSize));
  root.style.fontSize = `${clampedSize}px`;
  
  localStorage.setItem('a11y-font-size', String(clampedSize));
};

// Initialize accessibility features on app load
export const initializeA11y = () => {
  // Load saved preferences
  const savedFontSize = localStorage.getItem('a11y-font-size');
  if (savedFontSize) {
    document.documentElement.style.fontSize = `${savedFontSize}px`;
  }

  const savedHighContrast = localStorage.getItem('a11y-high-contrast') === 'true';
  if (savedHighContrast) {
    document.documentElement.classList.add('high-contrast');
  }

  const savedLargeText = localStorage.getItem('a11y-large-text') === 'true';
  if (savedLargeText) {
    document.documentElement.classList.add('large-text');
  }

  const savedMotionReduced = localStorage.getItem('a11y-motion-reduced') === 'true';
  if (savedMotionReduced) {
    document.documentElement.classList.add('reduce-motion');
  }

  // Add skip links
  const mainContent = document.getElementById('main') || document.querySelector('main');
  if (mainContent && !mainContent.id) {
    mainContent.id = 'main-content';
  }

  if (mainContent && !document.querySelector('.skip-link')) {
    const skipLink = createSkipLink('main-content');
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
};
