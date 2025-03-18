
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, Address } from './types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item => 
              item.product.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },
      
      removeItem: (productId: string) => {
        const { items } = get();
        set({ items: items.filter(item => item.product.id !== productId) });
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set({
          items: items.map(item => 
            item.product.id === productId 
              ? { ...item, quantity }
              : item
          )
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      subtotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);

interface CheckoutState {
  shippingAddress: Address | null;
  setShippingAddress: (address: Address) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  shippingMethod: 'standard' | 'express';
  setShippingMethod: (method: 'standard' | 'express') => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      shippingAddress: null,
      setShippingAddress: (address) => set({ shippingAddress: address }),
      orderNotes: '',
      setOrderNotes: (notes) => set({ orderNotes: notes }),
      shippingMethod: 'standard',
      setShippingMethod: (method) => set({ shippingMethod: method }),
      reset: () => set({ 
        shippingAddress: null, 
        orderNotes: '', 
        shippingMethod: 'standard' 
      })
    }),
    {
      name: 'checkout-storage'
    }
  )
);
