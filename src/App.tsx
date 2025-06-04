
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingSpinner from "@/components/LoadingSpinner";

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
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="choco-artesanal-theme">
      <TooltipProvider>
        <ErrorBoundary>
          <div className="w-full">
            <Toaster />
            <Sonner />
            <BrowserRouter>
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
            </BrowserRouter>
          </div>
        </ErrorBoundary>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
