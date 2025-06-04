
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import StickyHeader from "@/components/StickyHeader";

// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner size="lg" text="Cargando página..." />}>
    {children}
  </Suspense>
);

const App = () => {
  useEffect(() => {
    // Unregister service worker in development
    if ('serviceWorker' in navigator && import.meta.env.DEV) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister().then(() => {
            console.log('SW unregistered for development');
          });
        }
      });
    }
    
    // Register service worker only in production
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Preconnect to external domains for better performance
    const preconnectLinks = [
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnectLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
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
              <BrowserRouter>
                <StickyHeader />
                <div className="pt-20"> {/* Add padding to account for sticky header */}
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
                    <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
                    <Route path="/product-detail" element={<PageWrapper><ProductDetail /></PageWrapper>} />
                    <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                    <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                    <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
                    <Route path="/stories" element={<PageWrapper><Stories /></PageWrapper>} />
                    <Route path="/story/:id" element={<PageWrapper><StoryDetail /></PageWrapper>} />
                    
                    {/* Auth routes (redirect if already logged in) */}
                    <Route 
                      path="/login" 
                      element={
                        <ProtectedRoute requireAuth={false}>
                          <PageWrapper><Login /></PageWrapper>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/register" 
                      element={
                        <ProtectedRoute requireAuth={false}>
                          <PageWrapper><Register /></PageWrapper>
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Semi-protected routes (can be used without auth but enhanced with auth) */}
                    <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
                    <Route path="/wishlist" element={<PageWrapper><Wishlist /></PageWrapper>} />
                    
                    {/* Protected routes (require authentication) */}
                    <Route 
                      path="/profile" 
                      element={
                        <ProtectedRoute>
                          <PageWrapper><Profile /></PageWrapper>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/checkout" 
                      element={
                        <ProtectedRoute>
                          <PageWrapper><Checkout /></PageWrapper>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/order-confirmation" 
                      element={
                        <ProtectedRoute>
                          <PageWrapper><OrderConfirmation /></PageWrapper>
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Catch-all route */}
                    <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
                  </Routes>
                </div>
              </BrowserRouter>
            </div>
          </ErrorBoundary>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
