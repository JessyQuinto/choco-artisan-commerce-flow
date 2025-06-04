#!/usr/bin/env node

/**
 * Comprehensive Testing Script for Performance & Feature Validation
 * This script tests all the implemented optimizations and features
 */

const fs = require('fs');
const path = require('path');

class FeatureValidator {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
    
    this.srcPath = path.join(__dirname, 'src');
    this.publicPath = path.join(__dirname, 'public');
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',    // Cyan
      success: '\x1b[32m', // Green
      warning: '\x1b[33m', // Yellow
      error: '\x1b[31m',   // Red
      reset: '\x1b[0m'     // Reset
    };
    
    console.log(`${colors[type]}${message}${colors.reset}`);
  }

  addResult(testName, passed, message, type = 'test') {
    this.results.tests.push({
      name: testName,
      passed,
      message,
      type
    });
    
    if (passed) {
      this.results.passed++;
      this.log(`✅ ${testName}: ${message}`, 'success');
    } else {
      if (type === 'warning') {
        this.results.warnings++;
        this.log(`⚠️  ${testName}: ${message}`, 'warning');
      } else {
        this.results.failed++;
        this.log(`❌ ${testName}: ${message}`, 'error');
      }
    }
  }

  fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  readFile(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      return null;
    }
  }

  containsCode(filePath, searchString) {
    const content = this.readFile(filePath);
    return content ? content.includes(searchString) : false;
  }

  // Test PWA Implementation
  testPWAFeatures() {
    this.log('\n🔍 Testing PWA Features...', 'info');
    
    // Test manifest.json exists and is valid
    const manifestPath = path.join(this.publicPath, 'manifest.json');
    if (this.fileExists(manifestPath)) {
      try {
        const manifest = JSON.parse(this.readFile(manifestPath));
        this.addResult(
          'PWA Manifest',
          manifest.name && manifest.start_url && manifest.display,
          'Valid manifest.json with required fields'
        );
      } catch (error) {
        this.addResult('PWA Manifest', false, 'Invalid JSON in manifest.json');
      }
    } else {
      this.addResult('PWA Manifest', false, 'manifest.json not found');
    }

    // Test service worker exists
    const swPath = path.join(this.publicPath, 'sw.js');
    if (this.fileExists(swPath)) {
      const swContent = this.readFile(swPath);
      const hasCache = swContent.includes('caches.open');
      const hasFetch = swContent.includes('fetch');
      const hasSync = swContent.includes('sync');
      
      this.addResult(
        'Service Worker',
        hasCache && hasFetch,
        `Service worker with caching: ${hasCache}, fetch handling: ${hasFetch}, background sync: ${hasSync}`
      );
    } else {
      this.addResult('Service Worker', false, 'sw.js not found');
    }

    // Test PWA utility exists
    const pwaUtilPath = path.join(this.srcPath, 'utils', 'pwa.ts');
    if (this.fileExists(pwaUtilPath)) {
      const hasInstallPrompt = this.containsCode(pwaUtilPath, 'promptInstall');
      const hasUpdateCheck = this.containsCode(pwaUtilPath, 'checkForUpdates');
      
      this.addResult(
        'PWA Manager',
        hasInstallPrompt && hasUpdateCheck,
        `Install prompt: ${hasInstallPrompt}, Update check: ${hasUpdateCheck}`
      );
    } else {
      this.addResult('PWA Manager', false, 'PWA utility not found');
    }
  }

  // Test Performance Monitoring
  testPerformanceFeatures() {
    this.log('\n⚡ Testing Performance Features...', 'info');
    
    // Test performance analyzer
    const perfAnalyzerPath = path.join(this.srcPath, 'utils', 'performanceAnalyzer.ts');
    if (this.fileExists(perfAnalyzerPath)) {
      const hasWebVitals = this.containsCode(perfAnalyzerPath, 'observeWebVitals');
      const hasComponentTracking = this.containsCode(perfAnalyzerPath, 'trackComponentRender');
      const hasScoring = this.containsCode(perfAnalyzerPath, 'getPerformanceScore');
      
      this.addResult(
        'Performance Analyzer',
        hasWebVitals && hasComponentTracking && hasScoring,
        `Web Vitals: ${hasWebVitals}, Component tracking: ${hasComponentTracking}, Scoring: ${hasScoring}`
      );
    } else {
      this.addResult('Performance Analyzer', false, 'Performance analyzer not found');
    }

    // Test performance dashboard
    const perfDashboardPath = path.join(this.srcPath, 'components', 'PerformanceDashboard.tsx');
    if (this.fileExists(perfDashboardPath)) {
      const hasMetrics = this.containsCode(perfDashboardPath, 'PerformanceMetrics');
      const hasExport = this.containsCode(perfDashboardPath, 'exportData');
      
      this.addResult(
        'Performance Dashboard',
        hasMetrics && hasExport,
        `Metrics display: ${hasMetrics}, Export functionality: ${hasExport}`
      );
    } else {
      this.addResult('Performance Dashboard', false, 'Performance dashboard not found');
    }

    // Test performance monitor component
    const perfMonitorPath = path.join(this.srcPath, 'components', 'PerformanceMonitor.tsx');
    if (this.fileExists(perfMonitorPath)) {
      const hasRealTimeUpdates = this.containsCode(perfMonitorPath, 'setInterval') || 
                                 this.containsCode(perfMonitorPath, 'useEffect');
      
      this.addResult(
        'Performance Monitor',
        hasRealTimeUpdates,
        `Real-time updates: ${hasRealTimeUpdates}`
      );
    } else {
      this.addResult('Performance Monitor', false, 'Performance monitor not found');
    }

    // Test component optimizations
    const headerPath = path.join(this.srcPath, 'components', 'Header.tsx');
    if (this.fileExists(headerPath)) {
      const hasMemo = this.containsCode(headerPath, 'React.memo') || this.containsCode(headerPath, 'memo');
      const hasCallback = this.containsCode(headerPath, 'useCallback');
      
      this.addResult(
        'Component Optimizations',
        hasMemo,
        `Header memoization: ${hasMemo}, Callbacks: ${hasCallback}`
      );
    }
  }

  // Test SEO Implementation
  testSEOFeatures() {
    this.log('\n🔍 Testing SEO Features...', 'info');
    
    // Test SEO utility
    const seoUtilPath = path.join(this.srcPath, 'utils', 'seo.ts');
    if (this.fileExists(seoUtilPath)) {
      const hasMetaTags = this.containsCode(seoUtilPath, 'updatePageSEO');
      const hasStructuredData = this.containsCode(seoUtilPath, 'structuredData');
      const hasOpenGraph = this.containsCode(seoUtilPath, 'openGraph');
      
      this.addResult(
        'SEO Utility',
        hasMetaTags && hasStructuredData,
        `Meta tags: ${hasMetaTags}, Structured data: ${hasStructuredData}, Open Graph: ${hasOpenGraph}`
      );
    } else {
      this.addResult('SEO Utility', false, 'SEO utility not found');
    }

    // Test SEO analyzer
    const seoAnalyzerPath = path.join(this.srcPath, 'components', 'SEOAnalyzer.tsx');
    if (this.fileExists(seoAnalyzerPath)) {
      const hasAnalysis = this.containsCode(seoAnalyzerPath, 'performAnalysis');
      const hasRecommendations = this.containsCode(seoAnalyzerPath, 'recommendations');
      
      this.addResult(
        'SEO Analyzer',
        hasAnalysis && hasRecommendations,
        `Analysis: ${hasAnalysis}, Recommendations: ${hasRecommendations}`
      );
    } else {
      this.addResult('SEO Analyzer', false, 'SEO analyzer not found');
    }

    // Test product page SEO implementation
    const productPagePath = path.join(this.srcPath, 'pages', 'ProductPage.tsx');
    if (this.fileExists(productPagePath)) {
      const hasSEOHook = this.containsCode(productPagePath, 'useSEO');
      const hasStructuredData = this.containsCode(productPagePath, 'structuredData') || 
                               this.containsCode(productPagePath, '@type');
      
      this.addResult(
        'Product Page SEO',
        hasSEOHook,
        `SEO hook usage: ${hasSEOHook}, Structured data: ${hasStructuredData}`
      );
    } else {
      this.addResult('Product Page SEO', false, 'Product page not found');
    }
  }

  // Test Accessibility Features
  testAccessibilityFeatures() {
    this.log('\n♿ Testing Accessibility Features...', 'info');
    
    // Test accessibility hooks
    const a11yHooksPath = path.join(this.srcPath, 'hooks', 'useAccessibility.ts');
    if (this.fileExists(a11yHooksPath)) {
      const hasPreferences = this.containsCode(a11yHooksPath, 'preferences');
      const hasKeyboardNav = this.containsCode(a11yHooksPath, 'keyboard');
      const hasContrastCheck = this.containsCode(a11yHooksPath, 'contrast');
      
      this.addResult(
        'Accessibility Hooks',
        hasPreferences && hasKeyboardNav,
        `Preferences: ${hasPreferences}, Keyboard nav: ${hasKeyboardNav}, Contrast: ${hasContrastCheck}`
      );
    } else {
      this.addResult('Accessibility Hooks', false, 'Accessibility hooks not found');
    }

    // Test accessibility panel
    const a11yPanelPath = path.join(this.srcPath, 'components', 'AccessibilityPanel.tsx');
    if (this.fileExists(a11yPanelPath)) {
      const hasSettings = this.containsCode(a11yPanelPath, 'highContrast') || 
                         this.containsCode(a11yPanelPath, 'largeText');
      
      this.addResult(
        'Accessibility Panel',
        hasSettings,
        `Settings controls: ${hasSettings}`
      );
    } else {
      this.addResult('Accessibility Panel', false, 'Accessibility panel not found');
    }

    // Test accessibility button
    const a11yButtonPath = path.join(this.srcPath, 'components', 'AccessibilityButton.tsx');
    if (this.fileExists(a11yButtonPath)) {
      const hasToggle = this.containsCode(a11yButtonPath, 'toggle') || 
                       this.containsCode(a11yButtonPath, 'onClick');
      
      this.addResult(
        'Accessibility Button',
        hasToggle,
        `Toggle functionality: ${hasToggle}`
      );
    } else {
      this.addResult('Accessibility Button', false, 'Accessibility button not found');
    }

    // Test Tailwind accessibility extensions
    const tailwindConfigPath = path.join(__dirname, 'tailwind.config.ts');
    if (this.fileExists(tailwindConfigPath)) {
      const hasA11yClasses = this.containsCode(tailwindConfigPath, 'sr-only') || 
                            this.containsCode(tailwindConfigPath, 'focus-visible');
      
      this.addResult(
        'Tailwind A11y Extensions',
        hasA11yClasses,
        `Accessibility classes: ${hasA11yClasses}`,
        hasA11yClasses ? 'test' : 'warning'
      );
    }
  }

  // Test App Integration
  testAppIntegration() {
    this.log('\n🔗 Testing App Integration...', 'info');
    
    const appPath = path.join(this.srcPath, 'App.tsx');
    if (this.fileExists(appPath)) {
      const hasPerformanceMonitor = this.containsCode(appPath, 'PerformanceMonitor');
      const hasAccessibility = this.containsCode(appPath, 'AccessibilityButton');
      const hasPWAInit = this.containsCode(appPath, 'pwaManager');
      const hasErrorBoundary = this.containsCode(appPath, 'ErrorBoundary');
      const hasLazyLoading = this.containsCode(appPath, 'lazy(');
      
      this.addResult(
        'App Integration',
        hasPerformanceMonitor && hasAccessibility && hasPWAInit,
        `Performance: ${hasPerformanceMonitor}, A11y: ${hasAccessibility}, PWA: ${hasPWAInit}, Error boundary: ${hasErrorBoundary}, Lazy loading: ${hasLazyLoading}`
      );
    } else {
      this.addResult('App Integration', false, 'App.tsx not found');
    }
  }

  // Test Build Configuration
  testBuildConfiguration() {
    this.log('\n⚙️  Testing Build Configuration...', 'info');
    
    // Test package.json dependencies
    const packagePath = path.join(__dirname, 'package.json');
    if (this.fileExists(packagePath)) {
      try {
        const pkg = JSON.parse(this.readFile(packagePath));
        const hasReactQuery = pkg.dependencies['@tanstack/react-query'];
        const hasRadixUI = Object.keys(pkg.dependencies).some(dep => dep.startsWith('@radix-ui'));
        const hasTailwind = pkg.devDependencies && pkg.devDependencies['tailwindcss'];
        
        this.addResult(
          'Dependencies',
          hasReactQuery && hasRadixUI,
          `React Query: ${hasReactQuery}, Radix UI: ${hasRadixUI}, Tailwind: ${hasTailwind}`
        );
      } catch (error) {
        this.addResult('Dependencies', false, 'Invalid package.json');
      }
    }

    // Test Vite configuration
    const viteConfigPath = path.join(__dirname, 'vite.config.ts');
    if (this.fileExists(viteConfigPath)) {
      const hasReactPlugin = this.containsCode(viteConfigPath, '@vitejs/plugin-react');
      
      this.addResult(
        'Vite Configuration',
        hasReactPlugin,
        `React plugin: ${hasReactPlugin}`,
        hasReactPlugin ? 'test' : 'warning'
      );
    }

    // Test TypeScript configuration
    const tsConfigPath = path.join(__dirname, 'tsconfig.json');
    if (this.fileExists(tsConfigPath)) {
      const hasPathMapping = this.containsCode(tsConfigPath, '@/*');
      
      this.addResult(
        'TypeScript Config',
        hasPathMapping,
        `Path mapping: ${hasPathMapping}`,
        hasPathMapping ? 'test' : 'warning'
      );
    }
  }

  // Generate test report
  generateReport() {
    this.log('\n📊 Test Report Summary', 'info');
    this.log('═'.repeat(50), 'info');
    
    const total = this.results.passed + this.results.failed + this.results.warnings;
    const passRate = total > 0 ? ((this.results.passed / total) * 100).toFixed(1) : 0;
    
    this.log(`Total Tests: ${total}`, 'info');
    this.log(`✅ Passed: ${this.results.passed}`, 'success');
    this.log(`❌ Failed: ${this.results.failed}`, 'error');
    this.log(`⚠️  Warnings: ${this.results.warnings}`, 'warning');
    this.log(`📈 Pass Rate: ${passRate}%`, 'info');
    
    // Detailed results
    if (this.results.failed > 0) {
      this.log('\n❌ Failed Tests:', 'error');
      this.results.tests
        .filter(test => !test.passed && test.type !== 'warning')
        .forEach(test => {
          this.log(`  • ${test.name}: ${test.message}`, 'error');
        });
    }
    
    if (this.results.warnings > 0) {
      this.log('\n⚠️  Warnings:', 'warning');
      this.results.tests
        .filter(test => test.type === 'warning')
        .forEach(test => {
          this.log(`  • ${test.name}: ${test.message}`, 'warning');
        });
    }

    // Recommendations
    this.log('\n💡 Recommendations:', 'info');
    if (this.results.failed === 0) {
      this.log('  • All core features are properly implemented!', 'success');
      this.log('  • Consider running performance benchmarks', 'info');
      this.log('  • Test accessibility with screen readers', 'info');
      this.log('  • Validate SEO with Google Search Console', 'info');
    } else {
      this.log('  • Fix failed tests before deployment', 'warning');
      this.log('  • Review implementation documentation', 'info');
      this.log('  • Test features manually in browser', 'info');
    }

    return {
      success: this.results.failed === 0,
      summary: this.results
    };
  }

  // Run all tests
  async runAllTests() {
    this.log('🚀 Starting Comprehensive Feature Validation...', 'info');
    this.log('Testing Chocó Artisan Commerce Flow Implementation\n', 'info');
    
    try {
      this.testPWAFeatures();
      this.testPerformanceFeatures();
      this.testSEOFeatures();
      this.testAccessibilityFeatures();
      this.testAppIntegration();
      this.testBuildConfiguration();
      
      const report = this.generateReport();
      
      // Write detailed report to file
      const reportPath = path.join(__dirname, 'validation-report.json');
      fs.writeFileSync(reportPath, JSON.stringify({
        timestamp: new Date().toISOString(),
        ...report
      }, null, 2));
      
      this.log(`\n📄 Detailed report saved to: ${reportPath}`, 'info');
      
      return report;
    } catch (error) {
      this.log(`\n💥 Test execution failed: ${error.message}`, 'error');
      return { success: false, error: error.message };
    }
  }
}

// Run tests if script is executed directly
if (require.main === module) {
  const validator = new FeatureValidator();
  validator.runAllTests().then(result => {
    process.exit(result.success ? 0 : 1);
  });
}

module.exports = FeatureValidator;
