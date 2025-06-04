// Performance Analysis and Monitoring System
export interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  tti: number; // Time to Interactive
  renderTime: number;
  memoryUsage?: number;
  networkSpeed?: string;
  deviceType?: string;
}

export interface ComponentPerformance {
  name: string;
  renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
  memoryLeaks: boolean;
  rerenderReasons: string[];
}

class PerformanceAnalyzer {
  private static instance: PerformanceAnalyzer;
  private metrics: PerformanceMetrics[] = [];
  private componentMetrics: Map<string, ComponentPerformance> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();
  private isMonitoring = false;

  static getInstance(): PerformanceAnalyzer {
    if (!PerformanceAnalyzer.instance) {
      PerformanceAnalyzer.instance = new PerformanceAnalyzer();
    }
    return PerformanceAnalyzer.instance;
  }

  startMonitoring(): void {
    if (this.isMonitoring) return;
    this.isMonitoring = true;

    // Monitor Core Web Vitals
    this.observeWebVitals();
    
    // Monitor Navigation Timing
    this.observeNavigation();
    
    // Monitor Resource Loading
    this.observeResources();
    
    // Monitor Long Tasks
    this.observeLongTasks();
    
    // Monitor Memory Usage
    this.observeMemory();
  }

  stopMonitoring(): void {
    this.isMonitoring = false;
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }

  private observeWebVitals(): void {
    // LCP Observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      this.updateMetric('lcp', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.set('lcp', lcpObserver);

    // FID Observer
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        this.updateMetric('fid', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
    this.observers.set('fid', fidObserver);

    // CLS Observer
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          this.updateMetric('cls', clsValue);
        }
      });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    this.observers.set('cls', clsObserver);
  }

  private observeNavigation(): void {
    const navObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        const navEntry = entry as PerformanceNavigationTiming;
        this.updateMetric('ttfb', navEntry.responseStart - navEntry.fetchStart);
        this.updateMetric('fcp', navEntry.loadEventEnd - navEntry.fetchStart);
      });
    });
    navObserver.observe({ entryTypes: ['navigation'] });
    this.observers.set('navigation', navObserver);
  }

  private observeResources(): void {
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        const resourceEntry = entry as PerformanceResourceTiming;
        if (resourceEntry.initiatorType === 'img' || resourceEntry.initiatorType === 'script') {
          // Track critical resource loading times
          console.log(`Resource ${entry.name} took ${entry.duration}ms`);
        }
      });
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
    this.observers.set('resource', resourceObserver);
  }

  private observeLongTasks(): void {
    const longTaskObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.warn(`Long task detected: ${entry.duration}ms`);
        // Track components that might be causing long tasks
      });
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });
    this.observers.set('longtask', longTaskObserver);
  }

  private observeMemory(): void {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        this.updateMetric('memoryUsage', memory.usedJSHeapSize);
      }, 5000);
    }
  }

  private updateMetric(key: keyof PerformanceMetrics, value: number): void {
    const currentMetrics = this.getCurrentMetrics();
    currentMetrics[key] = value;
  }

  private getCurrentMetrics(): PerformanceMetrics {
    if (this.metrics.length === 0) {
      this.metrics.push({
        lcp: 0,
        fid: 0,
        cls: 0,
        fcp: 0,
        ttfb: 0,
        tti: 0,
        renderTime: 0,
      });
    }
    return this.metrics[this.metrics.length - 1];
  }

  // Component-specific performance tracking
  trackComponentRender(componentName: string, renderTime: number, rerenderReason?: string): void {
    const existing = this.componentMetrics.get(componentName);
    
    if (existing) {
      existing.renderCount++;
      existing.lastRenderTime = renderTime;
      existing.averageRenderTime = (existing.averageRenderTime + renderTime) / 2;
      if (rerenderReason) {
        existing.rerenderReasons.push(rerenderReason);
      }
    } else {
      this.componentMetrics.set(componentName, {
        name: componentName,
        renderCount: 1,
        averageRenderTime: renderTime,
        lastRenderTime: renderTime,
        memoryLeaks: false,
        rerenderReasons: rerenderReason ? [rerenderReason] : [],
      });
    }
  }

  // Get performance score (0-100)
  getPerformanceScore(): number {
    const metrics = this.getCurrentMetrics();
    
    // Weight-based scoring system
    const lcpScore = this.scoreLCP(metrics.lcp);
    const fidScore = this.scoreFID(metrics.fid);
    const clsScore = this.scoreCLS(metrics.cls);
    const fcpScore = this.scoreFCP(metrics.fcp);
    
    return Math.round((lcpScore * 0.3 + fidScore * 0.3 + clsScore * 0.2 + fcpScore * 0.2));
  }

  private scoreLCP(lcp: number): number {
    if (lcp <= 2500) return 100;
    if (lcp <= 4000) return 75;
    return 50;
  }

  private scoreFID(fid: number): number {
    if (fid <= 100) return 100;
    if (fid <= 300) return 75;
    return 50;
  }

  private scoreCLS(cls: number): number {
    if (cls <= 0.1) return 100;
    if (cls <= 0.25) return 75;
    return 50;
  }

  private scoreFCP(fcp: number): number {
    if (fcp <= 1800) return 100;
    if (fcp <= 3000) return 75;
    return 50;
  }

  // Generate performance report
  generateReport(): {
    metrics: PerformanceMetrics;
    score: number;
    components: ComponentPerformance[];
    recommendations: string[];
  } {
    const metrics = this.getCurrentMetrics();
    const score = this.getPerformanceScore();
    const components = Array.from(this.componentMetrics.values());
    const recommendations = this.generateRecommendations(metrics, components);

    return {
      metrics,
      score,
      components,
      recommendations,
    };
  }

  private generateRecommendations(metrics: PerformanceMetrics, components: ComponentPerformance[]): string[] {
    const recommendations: string[] = [];

    if (metrics.lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint by reducing server response times and optimizing critical resources');
    }

    if (metrics.fid > 100) {
      recommendations.push('Reduce First Input Delay by breaking up long tasks and using web workers for heavy computations');
    }

    if (metrics.cls > 0.1) {
      recommendations.push('Minimize layout shifts by setting dimensions on images and avoiding dynamic content injection');
    }

    const heavyComponents = components.filter(c => c.averageRenderTime > 16);
    if (heavyComponents.length > 0) {
      recommendations.push(`Optimize heavy components: ${heavyComponents.map(c => c.name).join(', ')}`);
    }

    const frequentRerenderers = components.filter(c => c.renderCount > 10);
    if (frequentRerenderers.length > 0) {
      recommendations.push(`Reduce unnecessary rerenders in: ${frequentRerenderers.map(c => c.name).join(', ')}`);
    }

    return recommendations;
  }

  // Export data for external analysis
  exportData(): string {
    return JSON.stringify({
      metrics: this.metrics,
      components: Array.from(this.componentMetrics.entries()),
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }, null, 2);
  }

  // Clear all collected data
  clearData(): void {
    this.metrics = [];
    this.componentMetrics.clear();
  }
}

export default PerformanceAnalyzer;

// React Hook for easy component integration
import { useEffect, useRef } from 'react';

export function usePerformanceTracking(componentName: string) {
  const startTime = useRef<number>(0);
  const analyzer = useRef<PerformanceAnalyzer>(PerformanceAnalyzer.getInstance());

  useEffect(() => {
    startTime.current = performance.now();
    
    return () => {
      const renderTime = performance.now() - startTime.current;
      analyzer.current.trackComponentRender(componentName, renderTime);
    };
  });

  const trackRerender = (reason: string) => {
    const renderTime = performance.now() - startTime.current;
    analyzer.current.trackComponentRender(componentName, renderTime, reason);
    startTime.current = performance.now();
  };

  return { trackRerender };
}

// Performance monitoring dashboard hook
export function usePerformanceMonitor() {
  const analyzer = useRef<PerformanceAnalyzer>(PerformanceAnalyzer.getInstance());

  useEffect(() => {
    analyzer.current.startMonitoring();
    
    return () => {
      analyzer.current.stopMonitoring();
    };
  }, []);

  const getReport = () => analyzer.current.generateReport();
  const getScore = () => analyzer.current.getPerformanceScore();
  const exportData = () => analyzer.current.exportData();
  const clearData = () => analyzer.current.clearData();

  return {
    getReport,
    getScore,
    exportData,
    clearData,
  };
}
