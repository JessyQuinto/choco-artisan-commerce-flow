
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import AccessibilityButton from "@/components/AccessibilityButton";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import SEOAnalyzer from "@/components/SEOAnalyzer";
import { pwaManager } from "@/utils/pwa";
import { initializeA11y } from "@/hooks/useAccessibility";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Search, 
  Activity, 
  Gauge, 
  Palette,
  Code,
  X
} from "lucide-react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Stories = lazy(() => import("./pages/Stories"));
const StoryDetail = lazy(() => import("./pages/StoryDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Development Toolbar Component
const DevelopmentToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSEOOpen, setIsSEOOpen] = useState(false);
  const isDevelopment = import.meta.env.DEV;

  if (!isDevelopment) return null;

  return (
    <>
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          variant="secondary"
          className="bg-black/80 text-white hover:bg-black/90 backdrop-blur-sm"
        >
          <Settings className="h-4 w-4 mr-2" />
          Dev Tools
        </Button>
        
        {isOpen && (
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border p-3 flex items-center gap-2">
            <Button
              onClick={() => setIsSEOOpen(true)}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              SEO
            </Button>
            
            <Button
              onClick={() => {
                const panel = document.querySelector('[data-accessibility-panel]');
                if (panel) {
                  (panel as HTMLElement).click();
                }
              }}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <Palette className="h-4 w-4" />
              A11y
            </Button>
            
            <Badge variant="secondary" className="text-xs">
              DEV MODE
            </Badge>
            
            <Button
              onClick={() => setIsOpen(false)}
              size="sm"
              variant="ghost"
              className="p-1"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
      
      <SEOAnalyzer isOpen={isSEOOpen} onClose={() => setIsSEOOpen(false)} />
    </>
  );
};

// Loading component wrapper
const PageLoader = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  }>
    {children}
  </Suspense>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

const App = () => {
  // Initialize performance monitoring
  usePerformanceMonitoring();
  
  // Initialize PWA and accessibility features
  useEffect(() => {
    // Initialize PWA manager
    pwaManager.init();
    
    // Initialize accessibility features
    initializeA11y();
    
    // Add main content ID for skip links
    const main = document.querySelector('main');
    if (main && !main.id) {
      main.id = 'main-content';
    }

    // Add performance monitoring meta tag
    const performanceHint = document.createElement('meta');
    performanceHint.name = 'performance-monitoring';
    performanceHint.content = 'enabled';
    document.head.appendChild(performanceHint);

    // Preconnect to important domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];
    
    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Add resource hints
    const resourceHints = [
      { rel: 'dns-prefetch', href: '//cdn.jsdelivr.net' },
      { rel: 'preload', href: '/fonts/main.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    ];
    
    resourceHints.forEach(hint => {
      const link = document.createElement('link');
      Object.entries(hint).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });
      document.head.appendChild(link);
    });
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="choco-artesanal-theme">
      <TooltipProvider>
        <ErrorBoundary>
          <div className="w-full">
            <Toaster />
            <Sonner />
            <AccessibilityButton />
            <PerformanceMonitor />
            <DevelopmentToolbar />
            
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<PageLoader><Index /></PageLoader>} />
                <Route path="/shop" element={<PageLoader><Shop /></PageLoader>} />
                <Route path="/product-detail" element={<PageLoader><ProductDetail /></PageLoader>} />
                <Route path="/product/:id" element={<PageLoader><ProductPage /></PageLoader>} />
                <Route path="/about" element={<PageLoader><About /></PageLoader>} />
                <Route path="/contact" element={<PageLoader><Contact /></PageLoader>} />
                <Route path="/terms" element={<PageLoader><Terms /></PageLoader>} />
                <Route path="/stories" element={<PageLoader><Stories /></PageLoader>} />
                <Route path="/story/:id" element={<PageLoader><StoryDetail /></PageLoader>} />
                
                {/* Auth routes (redirect if already logged in) */}
                <Route 
                  path="/login" 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <PageLoader><Login /></PageLoader>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <PageLoader><Register /></PageLoader>
                    </ProtectedRoute>
                  } 
                />
                
                {/* Semi-protected routes (can be used without auth but enhanced with auth) */}
                <Route path="/cart" element={<PageLoader><Cart /></PageLoader>} />
                <Route path="/wishlist" element={<PageLoader><Wishlist /></PageLoader>} />
                
                {/* Protected routes (require authentication) */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <PageLoader><Profile /></PageLoader>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <PageLoader><Checkout /></PageLoader>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/order-confirmation" 
                  element={
                    <ProtectedRoute>
                      <PageLoader><OrderConfirmation /></PageLoader>
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch-all route */}
                <Route path="*" element={<PageLoader><NotFound /></PageLoader>} />
              </Routes>
            </BrowserRouter>
          </div>
        </ErrorBoundary>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
