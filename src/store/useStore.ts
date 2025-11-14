import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, User } from '@/types';
import { trackProductAddedToCart } from '@/lib/rudderstack';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // User
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;

  // Pincode
  pincode: string;
  isPincodeServiceable: boolean;
  setPincode: (pincode: string, serviceable: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],

      addToCart: (item: CartItem) => {
        set((state) => {
          const existingItem = state.cart.find(
            (i) => i.product.id === item.product.id &&
                   i.size === item.size &&
                   i.color === item.color
          );

          // Track analytics
          trackProductAddedToCart({
            product_id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            category: item.product.category,
          });

          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.product.id === item.product.id &&
                i.size === item.size &&
                i.color === item.color
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { cart: [...state.cart, item] };
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },

      // User state
      user: null,

      setUser: (user: User | null) => {
        set({ user });
      },

      logout: () => {
        set({ user: null, cart: [] });
      },

      // Pincode state
      pincode: '',
      isPincodeServiceable: false,

      setPincode: (pincode: string, serviceable: boolean) => {
        set({ pincode, isPincodeServiceable: serviceable });
      },
    }),
    {
      name: 'ecom-storage',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        pincode: state.pincode,
        isPincodeServiceable: state.isPincodeServiceable,
      }),
    }
  )
);
