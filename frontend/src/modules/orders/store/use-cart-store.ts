import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  title: string;
  price: string;
  quantity: number;
  stockQuantity: number;
  imageUrl?: string | null;
};

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => boolean;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  syncWithProduct: (
    productId: string,
    updates: Partial<Pick<CartItem, 'price' | 'stockQuantity' | 'title'>>,
  ) => void;
  removeArchivedItems: (archivedProductIds: string[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem, quantity = 1) => {
        let wasAdded = false;

        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id);

          if (existingItem) {
            const newQuantity = Math.min(existingItem.quantity + quantity, newItem.stockQuantity);
            if (newQuantity === existingItem.quantity) {
              toast.warning('Maksymalna ilość', {
                description: 'Nie można dodać więcej tego produktu',
              });
              wasAdded = false;
              return state;
            }

            wasAdded = true;
            return {
              items: state.items.map((item) =>
                item.id === newItem.id ? { ...item, quantity: newQuantity } : item,
              ),
            };
          }

          const finalQuantity = Math.min(quantity, newItem.stockQuantity);
          wasAdded = finalQuantity > 0;
          return {
            items: [...state.items, { ...newItem, quantity: finalQuantity }],
          };
        });

        return wasAdded;
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.min(quantity, item.stockQuantity) }
              : item,
          ),
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      syncWithProduct: (productId, updates) => {
        set((state) => {
          const item = state.items.find((i) => i.id === productId);
          if (!item) return state;

          let shouldNotify = false;
          let notificationMessage = '';

          const updatedItem = { ...item };

          if (updates.price !== undefined && updates.price !== item.price) {
            updatedItem.price = updates.price;
            shouldNotify = true;
            notificationMessage = `Cena produktu "${item.title}" została zaktualizowana`;
          }

          if (updates.stockQuantity !== undefined && updates.stockQuantity !== item.stockQuantity) {
            updatedItem.stockQuantity = updates.stockQuantity;
            if (item.quantity > updates.stockQuantity) {
              updatedItem.quantity = updates.stockQuantity;
              shouldNotify = true;
              notificationMessage = `Ilość produktu "${item.title}" została dostosowana do dostępnego stanu`;
            }
          }

          if (updates.title !== undefined) {
            updatedItem.title = updates.title;
          }

          if (shouldNotify) {
            toast.success('Produkt zaktualizowany', {
              description: notificationMessage,
            });
          }

          return {
            items: state.items.map((i) => (i.id === productId ? updatedItem : i)),
          };
        });
      },

      removeArchivedItems: (archivedProductIds) => {
        const removedItems: string[] = [];

        set((state) => {
          const newItems = state.items.filter((item) => {
            if (archivedProductIds.includes(item.id)) {
              removedItems.push(item.title);
              return false;
            }
            return true;
          });

          return { items: newItems };
        });

        if (removedItems.length > 0) {
          toast.warning(`Następujące produkty zostały zarchiwizowane: ${removedItems.join(', ')}`, {
            description: 'Produkty zostały usunięte z koszyka',
          });
        }
      },
    }),
    {
      name: 'pos-system-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
