import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  artisan: string;
  origin: string;
  category?: string;
}

interface CartItem extends Product {
  quantity: number;
  total: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
  isLoading: boolean;
}

interface SearchFilters {
  category: string;
  priceRange: string;
  artisan: string;
  sortBy: string;
  search: string;
  inStock?: boolean;
  region?: string;
}

interface Store {
  // Cart state
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  
  // Auth state
  auth: AuthState;
  
  // Wishlist state
  wishlist: Product[];
  
  // UI state
  searchQuery: string;
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  
  // Auth actions
  login: (userData: User, token?: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setAuthLoading: (loading: boolean) => void;
  
  // Wishlist actions
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  
  // UI actions
  setSearchQuery: (query: string) => void;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Order actions
  completeOrder: () => void;
  
  // Utility actions
  clearUserData: () => void;
  getStorageStats: () => { cartItems: number; wishlistItems: number; };
}

const initialFilters: SearchFilters = {
  category: "all",
  priceRange: "all",
  artisan: "",
  sortBy: "name",
  search: "",
  inStock: true,
  region: "all"
};

export const useStore = create<Store>()(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        // Initial state
        cartItems: [],
        cartCount: 0,
        cartTotal: 0,
        auth: {
          user: null,
          isLoggedIn: false,
          token: null,
          isLoading: false
        },
        wishlist: [],
        searchQuery: '',
        filters: initialFilters,
        isLoading: false,
        error: null,
        
        // Cart actions
        addToCart: (product, quantity = 1) => set((state) => {
          const existingItem = state.cartItems.find(item => item.id === product.id);
          
          if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.total = existingItem.quantity * existingItem.price;
          } else {
            const newItem: CartItem = {
              ...product,
              quantity,
              total: product.price * quantity
            };
            state.cartItems.push(newItem);
          }
          
          state.cartCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
          state.cartTotal = state.cartItems.reduce((sum, item) => sum + item.total, 0);
        }),
        
        removeFromCart: (productId) => set((state) => {
          state.cartItems = state.cartItems.filter(item => item.id !== productId);
          state.cartCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
          state.cartTotal = state.cartItems.reduce((sum, item) => sum + item.total, 0);
        }),
        
        updateCartQuantity: (productId, quantity) => set((state) => {
          if (quantity < 1) return;
          
          const item = state.cartItems.find(item => item.id === productId);
          if (item) {
            item.quantity = quantity;
            item.total = quantity * item.price;
            state.cartCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
            state.cartTotal = state.cartItems.reduce((sum, item) => sum + item.total, 0);
          }
        }),
        
        clearCart: () => set((state) => {
          state.cartItems = [];
          state.cartCount = 0;
          state.cartTotal = 0;
        }),
        
        getCartTotal: () => {
          const { cartItems } = get();
          return cartItems.reduce((sum, item) => sum + item.total, 0);
        },
        
        // Auth actions
        login: (userData, token) => set((state) => {
          state.auth = {
            user: userData,
            isLoggedIn: true,
            token: token || null,
            isLoading: false
          };
        }),
        
        logout: () => set((state) => {
          state.auth = {
            user: null,
            isLoggedIn: false,
            token: null,
            isLoading: false
          };
        }),
        
        updateUser: (userData) => set((state) => {
          if (state.auth.user) {
            state.auth.user = { ...state.auth.user, ...userData };
          }
        }),
        
        setAuthLoading: (loading) => set((state) => {
          state.auth.isLoading = loading;
        }),
        
        // Wishlist actions
        addToWishlist: (product) => set((state) => {
          if (!state.wishlist.find(item => item.id === product.id)) {
            state.wishlist.push(product);
          }
        }),
        
        removeFromWishlist: (productId) => set((state) => {
          state.wishlist = state.wishlist.filter(item => item.id !== productId);
        }),
        
        isInWishlist: (productId) => {
          const { wishlist } = get();
          return wishlist.some(item => item.id === productId);
        },
        
        clearWishlist: () => set((state) => {
          state.wishlist = [];
        }),
        
        // UI actions
        setSearchQuery: (query) => set((state) => {
          state.searchQuery = query;
        }),
        
        updateFilters: (newFilters) => set((state) => {
          state.filters = { ...state.filters, ...newFilters };
        }),
        
        resetFilters: () => set((state) => {
          state.filters = initialFilters;
          state.searchQuery = '';
        }),
        
        setLoading: (loading) => set((state) => {
          state.isLoading = loading;
        }),
        
        setError: (error) => set((state) => {
          state.error = error;
        }),
        
        // Order actions
        completeOrder: () => set((state) => {
          state.cartItems = [];
          state.cartCount = 0;
          state.cartTotal = 0;
        }),
        
        // Utility actions
        clearUserData: () => set((state) => {
          state.auth = {
            user: null,
            isLoggedIn: false,
            token: null,
            isLoading: false
          };
          state.cartItems = [];
          state.cartCount = 0;
          state.cartTotal = 0;
          state.wishlist = [];
          state.searchQuery = '';
          state.filters = initialFilters;
          state.error = null;
        }),
        
        getStorageStats: () => {
          const { cartItems, wishlist } = get();
          return {
            cartItems: cartItems.length,
            wishlistItems: wishlist.length
          };
        }
      })),
      {
        name: 'choco-artesanal-store',
        partialize: (state) => ({
          cartItems: state.cartItems,
          cartCount: state.cartCount,
          cartTotal: state.cartTotal,
          auth: {
            user: state.auth.user,
            isLoggedIn: state.auth.isLoggedIn,
            token: state.auth.token,
            isLoading: false // Don't persist loading state
          },
          wishlist: state.wishlist,
          filters: state.filters
        })
      }
    )
  )
);

// Optimized selectors for better performance
export const useAuth = () => useStore(state => state.auth);
export const useIsLoggedIn = () => useStore(state => state.auth.isLoggedIn);
export const useUser = () => useStore(state => state.auth.user);

export const useCart = () => useStore(state => ({ 
  items: state.cartItems, 
  count: state.cartCount, 
  total: state.cartTotal 
}));
export const useCartItems = () => useStore(state => state.cartItems);
export const useCartCount = () => useStore(state => state.cartCount);
export const useCartTotal = () => useStore(state => state.cartTotal);

export const useWishlist = () => useStore(state => state.wishlist);
export const useIsInWishlist = (productId: number) => useStore(state => 
  state.wishlist.some(item => item.id === productId)
);

export const useFilters = () => useStore(state => state.filters);
export const useSearchQuery = () => useStore(state => state.searchQuery);

export const useUI = () => useStore(state => ({
  isLoading: state.isLoading,
  error: state.error
}));

// Action selectors
export const useCartActions = () => useStore(state => ({
  addToCart: state.addToCart,
  removeFromCart: state.removeFromCart,
  updateCartQuantity: state.updateCartQuantity,
  clearCart: state.clearCart
}));

export const useAuthActions = () => useStore(state => ({
  login: state.login,
  logout: state.logout,
  updateUser: state.updateUser,
  setAuthLoading: state.setAuthLoading
}));

export const useWishlistActions = () => useStore(state => ({
  addToWishlist: state.addToWishlist,
  removeFromWishlist: state.removeFromWishlist,
  clearWishlist: state.clearWishlist
}));
