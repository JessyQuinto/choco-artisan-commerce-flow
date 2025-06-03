
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

interface User {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface Store {
  // Cart state
  cartItems: CartItem[];
  cartCount: number;
  
  // User state
  user: User | null;
  isLoggedIn: boolean;
  
  // Wishlist state
  wishlist: Product[];
  
  // UI state
  searchQuery: string;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  // User actions
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  
  // Wishlist actions
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  
  // UI actions
  setSearchQuery: (query: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Initial state
      cartItems: [],
      cartCount: 0,
      user: null,
      isLoggedIn: false,
      wishlist: [],
      searchQuery: '',
      
      // Cart actions
      addToCart: (product, quantity = 1) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(item => item.id === product.id);
        
        let newCartItems: CartItem[];
        
        if (existingItem) {
          newCartItems = cartItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.price }
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
        
        set({
          cartItems: newCartItems,
          cartCount: newCartItems.reduce((sum, item) => sum + item.quantity, 0)
        });
      },
      
      removeFromCart: (productId) => {
        const { cartItems } = get();
        const newCartItems = cartItems.filter(item => item.id !== productId);
        
        set({
          cartItems: newCartItems,
          cartCount: newCartItems.reduce((sum, item) => sum + item.quantity, 0)
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
        
        set({
          cartItems: newCartItems,
          cartCount: newCartItems.reduce((sum, item) => sum + item.quantity, 0)
        });
      },
      
      clearCart: () => {
        set({ cartItems: [], cartCount: 0 });
      },
      
      // User actions
      login: (userData) => {
        set({ user: userData, isLoggedIn: true });
      },
      
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      
      updateUser: (userData) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userData } });
        }
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
      
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some(item => item.id === productId);
      },
      
      // UI actions
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      }
    }),
    {
      name: 'choco-artesanal-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        cartCount: state.cartCount,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        wishlist: state.wishlist
      })
    }
  )
);
