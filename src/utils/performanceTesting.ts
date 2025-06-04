// Performance Testing Utilities
// Tools for measuring and validating performance improvements

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  bundleSize: number;
  memoryUsage: number;
  networkRequests: number;
  cacheHitRate: number;
}

interface PerformanceTestResult {
  url: string;
  timestamp: number;
  metrics: PerformanceMetrics;
  score: number;
  recommendations: string[];
}

class PerformanceTester {
  private observer: PerformanceObserver | null = null;
  private metrics: Partial<PerformanceMetrics> = {};

  async runPerformanceTest(): Promise<PerformanceTestResult> {
    console.log('🚀 Starting performance test...');
    
    // Collect Web Vitals
    await this.collectWebVitals();
    
    // Measure bundle size
    await this.measureBundleSize();
    
    // Check memory usage
    this.measureMemoryUsage();
    
    // Count network requests
    this.countNetworkRequests();
    
    // Calculate cache hit rate
    await this.calculateCacheHitRate();
    
    // Calculate overall score
    const score = this.calculatePerformanceScore();
    
    // Generate recommendations
    const recommendations = this.generateRecommendations();
    
    const result: PerformanceTestResult = {
      url: window.location.href,
      timestamp: Date.now(),
      metrics: this.metrics as PerformanceMetrics,
      score,
      recommendations
    };

    this.logResults(result);
    return result;
  }

  private async collectWebVitals(): Promise<void> {
    return new Promise((resolve) => {
      let resolveCount = 0;
      const expectedMetrics = 4; // FCP, LCP, FID, CLS

      const checkComplete = () => {
        resolveCount++;
        if (resolveCount >= expectedMetrics) {
          resolve();
        }
      };

      // FCP (First Contentful Paint)
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            checkComplete();
          }
        }
      });
      this.observer.observe({ type: 'paint', buffered: true });

      // LCP (Largest Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        checkComplete();
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      // FID (First Input Delay)
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.fid = (entry as any).processingStart - entry.startTime;
          checkComplete();
        }
      }).observe({ type: 'first-input', buffered: true });

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        this.metrics.cls = clsValue;
        checkComplete();
      }).observe({ type: 'layout-shift', buffered: true });

      // TTFB (Time to First Byte)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      }

      // Fallback timeout
      setTimeout(() => {
        console.warn('Performance metrics collection timed out');
        resolve();
      }, 5000);
    });
  }

  private async measureBundleSize(): Promise<void> {
    try {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      let totalSize = 0;

      for (const entry of entries) {
        if (entry.name.includes('.js') || entry.name.includes('.css')) {
          totalSize += entry.transferSize || 0;
        }
      }

      this.metrics.bundleSize = totalSize;
    } catch (error) {
      console.error('Failed to measure bundle size:', error);
      this.metrics.bundleSize = 0;
    }
  }

  private measureMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize;
    } else {
      this.metrics.memoryUsage = 0;
    }
  }

  private countNetworkRequests(): void {
    const entries = performance.getEntriesByType('resource');
    this.metrics.networkRequests = entries.length;
  }

  private async calculateCacheHitRate(): Promise<void> {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        let totalRequests = 0;
        let cachedRequests = 0;

        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName);
          const requests = await cache.keys();
          totalRequests += requests.length;
          cachedRequests += requests.length;
        }

        const resourceEntries = performance.getEntriesByType('resource');
        totalRequests += resourceEntries.length;

        this.metrics.cacheHitRate = totalRequests > 0 ? (cachedRequests / totalRequests) * 100 : 0;
      } catch (error) {
        console.error('Failed to calculate cache hit rate:', error);
        this.metrics.cacheHitRate = 0;
      }
    } else {
      this.metrics.cacheHitRate = 0;
    }
  }

  private calculatePerformanceScore(): number {
    const weights = {
      fcp: 20,
      lcp: 25,
      fid: 25,
      cls: 15,
      ttfb: 10,
      bundleSize: 5
    };

    let score = 0;

    // FCP scoring (0-2000ms = 100, 2000-4000ms = 50-100, >4000ms = 0-50)
    if (this.metrics.fcp! <= 2000) score += weights.fcp;
    else if (this.metrics.fcp! <= 4000) score += weights.fcp * (1 - (this.metrics.fcp! - 2000) / 2000);
    else score += weights.fcp * 0.5;

    // LCP scoring (0-2500ms = 100, 2500-4000ms = 50-100, >4000ms = 0-50)
    if (this.metrics.lcp! <= 2500) score += weights.lcp;
    else if (this.metrics.lcp! <= 4000) score += weights.lcp * (1 - (this.metrics.lcp! - 2500) / 1500);
    else score += weights.lcp * 0.5;

    // FID scoring (0-100ms = 100, 100-300ms = 50-100, >300ms = 0-50)
    if (this.metrics.fid! <= 100) score += weights.fid;
    else if (this.metrics.fid! <= 300) score += weights.fid * (1 - (this.metrics.fid! - 100) / 200);
    else score += weights.fid * 0.5;

    // CLS scoring (0-0.1 = 100, 0.1-0.25 = 50-100, >0.25 = 0-50)
    if (this.metrics.cls! <= 0.1) score += weights.cls;
    else if (this.metrics.cls! <= 0.25) score += weights.cls * (1 - (this.metrics.cls! - 0.1) / 0.15);
    else score += weights.cls * 0.5;

    // TTFB scoring (0-200ms = 100, 200-500ms = 50-100, >500ms = 0-50)
    if (this.metrics.ttfb! <= 200) score += weights.ttfb;
    else if (this.metrics.ttfb! <= 500) score += weights.ttfb * (1 - (this.metrics.ttfb! - 200) / 300);
    else score += weights.ttfb * 0.5;

    // Bundle size scoring (0-500KB = 100, 500KB-1MB = 50-100, >1MB = 0-50)
    const bundleSizeKB = this.metrics.bundleSize! / 1024;
    if (bundleSizeKB <= 500) score += weights.bundleSize;
    else if (bundleSizeKB <= 1024) score += weights.bundleSize * (1 - (bundleSizeKB - 500) / 524);
    else score += weights.bundleSize * 0.5;

    return Math.round(score);
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    if (this.metrics.fcp! > 2000) {
      recommendations.push('Optimize First Contentful Paint: Consider reducing render-blocking resources');
    }

    if (this.metrics.lcp! > 2500) {
      recommendations.push('Improve Largest Contentful Paint: Optimize images and critical resources');
    }

    if (this.metrics.fid! > 100) {
      recommendations.push('Reduce First Input Delay: Minimize JavaScript execution time');
    }

    if (this.metrics.cls! > 0.1) {
      recommendations.push('Fix Cumulative Layout Shift: Specify dimensions for images and ads');
    }

    if (this.metrics.ttfb! > 500) {
      recommendations.push('Improve server response time: Optimize backend performance');
    }

    if (this.metrics.bundleSize! > 1024 * 1024) {
      recommendations.push('Reduce bundle size: Implement code splitting and tree shaking');
    }

    if (this.metrics.cacheHitRate! < 50) {
      recommendations.push('Improve caching strategy: Implement better cache policies');
    }

    if (this.metrics.memoryUsage! > 50 * 1024 * 1024) {
      recommendations.push('Optimize memory usage: Check for memory leaks and optimize components');
    }

    if (recommendations.length === 0) {
      recommendations.push('Great job! Performance metrics are within optimal ranges');
    }

    return recommendations;
  }

  private logResults(result: PerformanceTestResult): void {
    console.group('🏆 Performance Test Results');
    console.log(`Overall Score: ${result.score}/100`);
    console.log('📊 Core Web Vitals:');
    console.log(`  FCP: ${Math.round(result.metrics.fcp)}ms`);
    console.log(`  LCP: ${Math.round(result.metrics.lcp)}ms`);
    console.log(`  FID: ${Math.round(result.metrics.fid)}ms`);
    console.log(`  CLS: ${result.metrics.cls.toFixed(3)}`);
    console.log('📈 Additional Metrics:');
    console.log(`  TTFB: ${Math.round(result.metrics.ttfb)}ms`);
    console.log(`  Bundle Size: ${(result.metrics.bundleSize / 1024).toFixed(1)}KB`);
    console.log(`  Memory Usage: ${(result.metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB`);
    console.log(`  Network Requests: ${result.metrics.networkRequests}`);
    console.log(`  Cache Hit Rate: ${result.metrics.cacheHitRate.toFixed(1)}%`);
    console.log('💡 Recommendations:');
    result.recommendations.forEach(rec => console.log(`  • ${rec}`));
    console.groupEnd();
  }

  cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Benchmark comparison utility
export class PerformanceBenchmark {
  private results: PerformanceTestResult[] = [];

  async addTestResult(name: string): Promise<PerformanceTestResult> {
    const tester = new PerformanceTester();
    const result = await tester.runPerformanceTest();
    result.url = name; // Use name instead of URL for benchmark identification
    this.results.push(result);
    tester.cleanup();
    return result;
  }

  compare(): void {
    if (this.results.length < 2) {
      console.warn('Need at least 2 test results to compare');
      return;
    }

    console.group('📊 Performance Comparison');
    
    const latest = this.results[this.results.length - 1];
    const previous = this.results[this.results.length - 2];

    const scoreImprovement = latest.score - previous.score;
    const fcpImprovement = previous.metrics.fcp - latest.metrics.fcp;
    const lcpImprovement = previous.metrics.lcp - latest.metrics.lcp;
    const fidImprovement = previous.metrics.fid - latest.metrics.fid;
    
    console.log(`Score: ${scoreImprovement > 0 ? '+' : ''}${scoreImprovement} points`);
    console.log(`FCP: ${fcpImprovement > 0 ? '+' : ''}${Math.round(fcpImprovement)}ms improvement`);
    console.log(`LCP: ${lcpImprovement > 0 ? '+' : ''}${Math.round(lcpImprovement)}ms improvement`);
    console.log(`FID: ${fidImprovement > 0 ? '+' : ''}${Math.round(fidImprovement)}ms improvement`);
    
    console.groupEnd();
  }

  exportResults(): string {
    return JSON.stringify(this.results, null, 2);
  }
}

// Global performance testing utilities
export const performanceTester = new PerformanceTester();
export const performanceBenchmark = new PerformanceBenchmark();

// Add to window for easy access in development
if (process.env.NODE_ENV === 'development') {
  (window as any).performanceTest = performanceTester;
  (window as any).performanceBenchmark = performanceBenchmark;
}

// Auto-test on page load in development
if (process.env.NODE_ENV === 'development') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceTester.runPerformanceTest();
    }, 2000); // Wait 2 seconds after load
  });
}
