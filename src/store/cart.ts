import { create } from "zustand";
import type { CartItem } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  updateReservation: (variantId: string, expiresAt: string | null) => void;
  totalPrice: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.variantId === item.variantId);
      if (existing) return state;
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),
  removeItem: (variantId) =>
    set((state) => ({
      items: state.items.filter((i) => i.variantId !== variantId),
    })),
  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  updateReservation: (variantId, expiresAt) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.variantId === variantId ? { ...i, reservedUntil: expiresAt } : i
      ),
    })),
  totalPrice: () => get().items.reduce((sum, i) => sum + i.price, 0),
  itemCount: () => get().items.length,
}));
