"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  key: string;
  productId: string;
  variant: string;
  storage?: string;
  qty: number;
}

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  addToCart: (productId: string, variant: string, storage: string | undefined, qty?: number) => void;
  removeFromCart: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  moveToCart: (productId: string, variant: string, storage?: string) => void;
}

function lineKey(productId: string, variant: string, storage?: string) {
  return [productId, variant, storage ?? ""].join("::");
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      addToCart: (productId, variant, storage, qty = 1) => {
        const key = lineKey(productId, variant, storage);
        set((state) => {
          const existing = state.cart.find((l) => l.key === key);
          if (existing) {
            return {
              cart: state.cart.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l)),
            };
          }
          return { cart: [...state.cart, { key, productId, variant, storage, qty }] };
        });
      },
      removeFromCart: (key) => set((state) => ({ cart: state.cart.filter((l) => l.key !== key) })),
      setQty: (key, qty) =>
        set((state) => ({
          cart: state.cart
            .map((l) => (l.key === key ? { ...l, qty: Math.max(1, qty) } : l))
            .filter((l) => l.qty > 0),
        })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),
      isWishlisted: (productId) => get().wishlist.includes(productId),
      moveToCart: (productId, variant, storage) => {
        get().addToCart(productId, variant, storage, 1);
        set((state) => ({ wishlist: state.wishlist.filter((id) => id !== productId) }));
      },
    }),
    { name: "nexa-store" }
  )
);
