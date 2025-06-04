import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

interface UsePerformanceMonitoringOptions {
  onMetric?: (metric: { name: string; value: number; delta?: number }) => void;
  enableLogging?: boolean;
  reportInterval?: number;
}

export const usePerformanceMonitoring = ({
  onMetric,
  enableLogging = false,
  reportInterval = 5000
}: UsePerformanceMonitoringOptions = {}) => {
  const reportMetric = useCallback((name: string, value: number, delta?: number) => {
    const metric = { name, value, delta };
    
    if (enableLogging) {
      console.log(`Performance Metric - ${name}:`, metric);
    }
    
    onMetric?.(metric);
  }, [onMetric, enableLogging]);

  // Measure Web Vitals
  useEffect(() => {
    if (!('PerformanceObserver' in window)) return;

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          reportMetric('FCP', entry.startTime);
        }
      }
    });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      reportMetric('LCP', lastEntry.startTime);
    });

    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        reportMetric('FID', entry.processingStart - entry.startTime);
      }
    });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          reportMetric('CLS', clsValue);
        }
      }
    });

    try {
      fcpObserver.observe({ entryTypes: ['paint'] });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Performance monitoring not fully supported:', error);
    }

    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, [reportMetric]);

  // Monitor Memory Usage
  useEffect(() => {
    if (!('memory' in performance)) return;

    const measureMemory = () => {
      const memory = (performance as any).memory;
      if (memory) {
        reportMetric('Memory Used', memory.usedJSHeapSize);
        reportMetric('Memory Total', memory.totalJSHeapSize);
        reportMetric('Memory Limit', memory.jsHeapSizeLimit);
      }
    };

    measureMemory();
    const interval = setInterval(measureMemory, reportInterval);

    return () => clearInterval(interval);
  }, [reportMetric, reportInterval]);

  // Monitor Navigation Timing
  useEffect(() => {
    const measureNavigation = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        reportMetric('TTFB', navigation.responseStart - navigation.fetchStart);
        reportMetric('DOM Content Loaded', navigation.domContentLoadedEventEnd - navigation.navigationStart);
        reportMetric('Load Complete', navigation.loadEventEnd - navigation.navigationStart);
      }
    };

    // Delay to ensure navigation timing is available
    setTimeout(measureNavigation, 0);
  }, [reportMetric]);

  return {
    measureCustomMetric: (name: string, startTime: number) => {
      const endTime = performance.now();
      reportMetric(name, endTime - startTime);
    },
    markStart: (name: string) => {
      performance.mark(`${name}-start`);
    },
    markEnd: (name: string) => {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name, 'measure')[0];
      if (measure) {
        reportMetric(name, measure.duration);
      }
    }
  };
};

// Performance monitoring utility for components
export const createPerformanceMonitor = (enableLogging = false) => {
  return {
    onMetric: (metric: { name: string; value: number; delta?: number }) => {
      // You can send metrics to analytics service here
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'performance_metric', {
          custom_parameter: metric.name,
          value: metric.value
        });
      }
    },
    enableLogging
  };
};

// Hook for measuring component render time
export const useRenderTime = (componentName: string) => {
  const { markStart, markEnd } = usePerformanceMonitoring();

  useEffect(() => {
    markStart(componentName);
    return () => markEnd(componentName);
  }, [componentName, markStart, markEnd]);
};
