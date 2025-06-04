import React from 'react';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

interface PerformanceMonitorProviderProps {
  children: React.ReactNode;
  enableLogging?: boolean;
}

export const PerformanceMonitorProvider: React.FC<PerformanceMonitorProviderProps> = ({ 
  children, 
  enableLogging = false 
}) => {
  usePerformanceMonitoring({
    enableLogging,
    onMetric: (metric) => {
      // You can send metrics to analytics service here
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'performance_metric', {
          custom_parameter: metric.name,
          value: metric.value
        });
      }
    }
  });

  return <>{children}</>;
};

export default PerformanceMonitorProvider;
