
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface Address {
  id: string;
  name: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone?: string;
  isDefault?: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  addresses?: Address[];
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
  completeOrder: () => void;
  
  // Auth actions
  login: (userData: User, token?: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setAuthLoading: (loading: boolean) => void;
  
  // Address actions
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  
  // Wishlist actions
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  
  // UI actions
  setSearchQuery: (query: string) => void;
  updateFilters: (filters: Partial<SearchFilters>) => void;
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
  persist(
    (set, get) => ({
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
      addToCart: (product, quantity = 1) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(item => item.id === product.id);
        
        let newCartItems: CartItem[];
        
        if (existingItem) {
          newCartItems = cartItems.map(item =>
            item.id === product.id
              ? { 
                  ...item, 
                  quantity: item.quantity + quantity, 
                  total: (item.quantity + quantity) * item.price 
                }
              : item
          );
        } else {
          const newItem: CartItem = {
            ...product,
            quantity,
            total: product.price * quantity
          };
          newCartItems = [...cartItems, newItem];
        }
        
        const newCount = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
        const newTotal = newCartItems.reduce((sum, item) => sum + item.total, 0);
        
        localStorage.setItem('lastCartActivity', Date.now().toString());
        
        set({
          cartItems: newCartItems,
          cartCount: newCount,
          cartTotal: newTotal
        });
      },
      
      removeFromCart: (productId) => {
        const { cartItems } = get();
        const newCartItems = cartItems.filter(item => item.id !== productId);
        const newCount = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
        const newTotal = newCartItems.reduce((sum, item) => sum + item.total, 0);
        
        localStorage.setItem('lastCartActivity', Date.now().toString());
        
        set({
          cartItems: newCartItems,
          cartCount: newCount,
          cartTotal: newTotal
        });
      },
      
      updateCartQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        
        const { cartItems } = get();
        const newCartItems = cartItems.map(item =>
          item.id === productId
            ? { ...item, quantity, total: quantity * item.price }
            : item
        );
        
        const newCount = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
        const newTotal = newCartItems.reduce((sum, item) => sum + item.total, 0);
        
        localStorage.setItem('lastCartActivity', Date.now().toString());
        
        set({
          cartItems: newCartItems,
          cartCount: newCount,
          cartTotal: newTotal
        });
      },
      
      clearCart: () => {
        set({ cartItems: [], cartCount: 0, cartTotal: 0 });
      },
      
      completeOrder: () => {
        set({ cartItems: [], cartCount: 0, cartTotal: 0 });
      },
      
      // Auth actions
      login: (userData, token) => {
        localStorage.setItem('lastCartActivity', Date.now().toString());
        set({
          auth: {
            user: userData,
            isLoggedIn: true,
            token: token || null,
            isLoading: false
          }
        });
      },
      
      logout: () => {
        set({
          auth: {
            user: null,
            isLoggedIn: false,
            token: null,
            isLoading: false
          }
        });
      },
      
      updateUser: (userData) => {
        const { auth } = get();
        if (auth.user) {
          set({
            auth: {
              ...auth,
              user: { ...auth.user, ...userData }
            }
          });
        }
      },
      
      setAuthLoading: (loading) => {
        const { auth } = get();
        set({
          auth: {
            ...auth,
            isLoading: loading
          }
        });
      },
      
      // Address actions
      addAddress: (addressData) => {
        const { auth } = get();
        if (!auth.user) return;
        
        const newAddress: Address = {
          ...addressData,
          id: Date.now().toString(),
        };
        
        const addresses = auth.user.addresses || [];
        const updatedAddresses = [...addresses, newAddress];
        
        set({
          auth: {
            ...auth,
            user: {
              ...auth.user,
              addresses: updatedAddresses
            }
          }
        });
      },
      
      updateAddress: (id, addressData) => {
        const { auth } = get();
        if (!auth.user || !auth.user.addresses) return;
        
        const updatedAddresses = auth.user.addresses.map(addr =>
          addr.id === id ? { ...addr, ...addressData } : addr
        );
        
        set({
          auth: {
            ...auth,
            user: {
              ...auth.user,
              addresses: updatedAddresses
            }
          }
        });
      },
      
      deleteAddress: (id) => {
        const { auth } = get();
        if (!auth.user || !auth.user.addresses) return;
        
        const updatedAddresses = auth.user.addresses.filter(addr => addr.id !== id);
        
        set({
          auth: {
            ...auth,
            user: {
              ...auth.user,
              addresses: updatedAddresses
            }
          }
        });
      },
      
      setDefaultAddress: (id) => {
        const { auth } = get();
        if (!auth.user || !auth.user.addresses) return;
        
        const updatedAddresses = auth.user.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === id
        }));
        
        set({
          auth: {
            ...auth,
            user: {
              ...auth.user,
              addresses: updatedAddresses
            }
          }
        });
      },

      // Wishlist actions
      addToWishlist: (product) => {
        const { wishlist } = get();
        if (!wishlist.find(item => item.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
        }
      },
      
      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter(item => item.id !== productId) });
      },
      
      // UI actions
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
      
      updateFilters: (newFilters) => {
        const { filters } = get();
        set({ filters: { ...filters, ...newFilters } });
      }
    }),
    {
      name: 'choco-artesanal-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        cartCount: state.cartCount,
        cartTotal: state.cartTotal,
        auth: state.auth,
        wishlist: state.wishlist,
        filters: state.filters
      })
    }
  )
);

// Selectors for better performance
export const useAuth = () => useStore(state => state.auth);
export const useCartItems = () => useStore(state => state.cartItems);
export const useCartCount = () => useStore(state => state.cartCount);
export const useCartTotal = () => useStore(state => state.cartTotal);
export const useWishlist = () => useStore(state => state.wishlist);
