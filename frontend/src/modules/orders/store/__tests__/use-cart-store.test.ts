import { act, renderHook } from '@testing-library/react';
import { toast } from 'sonner';

import { type CartItem, useCartStore } from '../use-cart-store';

vi.mock('sonner');
const mockedToast = vi.mocked(toast);

const createCartItem = (overrides: Partial<CartItem> = {}): Omit<CartItem, 'quantity'> => ({
  id: 'test-product-1',
  title: 'Test Product',
  price: '10.00',
  stockQuantity: 5,
  imageUrl: 'https://example.com/image.jpg',
  ...overrides,
});

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
    vi.clearAllMocks();
  });

  describe('addItem', () => {
    it('should add new item to empty cart', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem();

      act(() => {
        const wasAdded = result.current.addItem(item, 2);
        expect(wasAdded).toBe(true);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual({
        ...item,
        quantity: 2,
      });
    });

    it('should add to existing item quantity', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem();

      act(() => {
        result.current.addItem(item, 1);
        result.current.addItem(item, 2);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(3);
    });

    it('should not exceed stock quantity when adding', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem({ stockQuantity: 3 });

      act(() => {
        result.current.addItem(item, 5);
      });

      expect(result.current.items[0].quantity).toBe(3);
    });

    it('should show warning when trying to add more than stock', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem({ stockQuantity: 2 });

      act(() => {
        result.current.addItem(item, 2);
        const wasAdded = result.current.addItem(item, 1);
        expect(wasAdded).toBe(false);
      });

      expect(mockedToast.warning).toHaveBeenCalledWith('Maksymalna ilość', {
        description: 'Nie można dodać więcej tego produktu',
      });
    });

    it('should handle zero stock quantity', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem({ stockQuantity: 0 });

      act(() => {
        const wasAdded = result.current.addItem(item, 1);
        expect(wasAdded).toBe(false);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(0);
    });

    it('should default to quantity 1 when not specified', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem();

      act(() => {
        result.current.addItem(item);
      });

      expect(result.current.items[0].quantity).toBe(1);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem();

      act(() => {
        result.current.addItem(item, 1);
        result.current.updateQuantity('test-product-1', 3);
      });

      expect(result.current.items[0].quantity).toBe(3);
    });

    it('should not exceed stock quantity when updating', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem({ stockQuantity: 4 });

      act(() => {
        result.current.addItem(item, 1);
        result.current.updateQuantity('test-product-1', 10);
      });

      expect(result.current.items[0].quantity).toBe(4);
    });

    it('should remove item when quantity is 0 or negative', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem();

      act(() => {
        result.current.addItem(item, 2);
        result.current.updateQuantity('test-product-1', 0);
      });

      expect(result.current.items).toHaveLength(0);

      act(() => {
        result.current.addItem(item, 2);
        result.current.updateQuantity('test-product-1', -1);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should do nothing for non-existent item', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.updateQuantity('non-existent', 5);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCartStore());
      const item1 = createCartItem({ id: 'item-1' });
      const item2 = createCartItem({ id: 'item-2' });

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
        result.current.removeItem('item-1');
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe('item-2');
    });

    it('should do nothing for non-existent item', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem();

      act(() => {
        result.current.addItem(item);
        result.current.removeItem('non-existent');
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const { result } = renderHook(() => useCartStore());
      const item1 = createCartItem({ id: 'item-1' });
      const item2 = createCartItem({ id: 'item-2' });

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('getTotalPrice', () => {
    it('should calculate total price correctly', () => {
      const { result } = renderHook(() => useCartStore());
      const item1 = createCartItem({ id: 'item-1', price: '10.50' });
      const item2 = createCartItem({ id: 'item-2', price: '5.25' });

      act(() => {
        result.current.addItem(item1, 2); // 2 × 10.50 = 21.00
        result.current.addItem(item2, 3); // 3 × 5.25 = 15.75
      });

      expect(result.current.getTotalPrice()).toBe(36.75);
    });

    it('should return 0 for empty cart', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getTotalPrice()).toBe(0);
    });

    it('should handle price as string', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem({ price: '15.99' });

      act(() => {
        result.current.addItem(item, 1);
      });

      expect(result.current.getTotalPrice()).toBe(15.99);
    });
  });

  describe('getTotalItems', () => {
    it('should calculate total items count correctly', () => {
      const { result } = renderHook(() => useCartStore());
      const item1 = createCartItem({ id: 'item-1' });
      const item2 = createCartItem({ id: 'item-2' });

      act(() => {
        result.current.addItem(item1, 3);
        result.current.addItem(item2, 2);
      });

      expect(result.current.getTotalItems()).toBe(5);
    });

    it('should return 0 for empty cart', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getTotalItems()).toBe(0);
    });
  });

  describe('syncWithProduct', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem({
        id: 'sync-item',
        title: 'Original Title',
        price: '10.00',
        stockQuantity: 5,
      });

      act(() => {
        result.current.addItem(item, 3);
      });
    });

    it('should update price and show notification', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.syncWithProduct('sync-item', { price: '15.00' });
      });

      expect(result.current.items[0].price).toBe('15.00');
      expect(mockedToast.success).toHaveBeenCalledWith('Produkt zaktualizowany', {
        description: 'Cena produktu "Original Title" została zaktualizowana',
      });
    });

    it('should update stock quantity and adjust item quantity if needed', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.syncWithProduct('sync-item', { stockQuantity: 2 });
      });

      expect(result.current.items[0].stockQuantity).toBe(2);
      expect(result.current.items[0].quantity).toBe(2);
      expect(mockedToast.success).toHaveBeenCalledWith('Produkt zaktualizowany', {
        description: 'Ilość produktu "Original Title" została dostosowana do dostępnego stanu',
      });
    });

    it('should update title without notification', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.syncWithProduct('sync-item', { title: 'New Title' });
      });

      expect(result.current.items[0].title).toBe('New Title');
      expect(mockedToast.success).not.toHaveBeenCalled();
    });

    it('should not notify when values are the same', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.syncWithProduct('sync-item', {
          price: '10.00',
          stockQuantity: 5,
        });
      });

      expect(mockedToast.success).not.toHaveBeenCalled();
    });

    it('should do nothing for non-existent item', () => {
      const { result } = renderHook(() => useCartStore());
      const originalItemsLength = result.current.items.length;

      act(() => {
        result.current.syncWithProduct('non-existent', { price: '20.00' });
      });

      expect(result.current.items).toHaveLength(originalItemsLength);
      expect(mockedToast.success).not.toHaveBeenCalled();
    });

    it('should update multiple properties at once', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.syncWithProduct('sync-item', {
          price: '12.00',
          stockQuantity: 10,
          title: 'Updated Title',
        });
      });

      const item = result.current.items[0];
      expect(item.price).toBe('12.00');
      expect(item.stockQuantity).toBe(10);
      expect(item.title).toBe('Updated Title');
      expect(item.quantity).toBe(3);
    });
  });

  describe('removeArchivedItems', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useCartStore());
      const item1 = createCartItem({ id: 'item-1', title: 'Product 1' });
      const item2 = createCartItem({ id: 'item-2', title: 'Product 2' });
      const item3 = createCartItem({ id: 'item-3', title: 'Product 3' });

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
        result.current.addItem(item3);
      });
    });

    it('should remove archived items and show notification', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.removeArchivedItems(['item-1', 'item-3']);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe('item-2');
      expect(mockedToast.warning).toHaveBeenCalledWith(
        'Następujące produkty zostały zarchiwizowane: Product 1, Product 3',
        {
          description: 'Produkty zostały usunięte z koszyka',
        },
      );
    });

    it('should do nothing when no archived items are in cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.removeArchivedItems(['non-existent-1', 'non-existent-2']);
      });

      expect(result.current.items).toHaveLength(3);
      expect(mockedToast.warning).not.toHaveBeenCalled();
    });

    it('should handle empty archived list', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.removeArchivedItems([]);
      });

      expect(result.current.items).toHaveLength(3);
      expect(mockedToast.warning).not.toHaveBeenCalled();
    });

    it('should handle partial matches', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.removeArchivedItems(['item-2', 'non-existent']);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items.map((item) => item.id)).toEqual(['item-1', 'item-3']);
      expect(mockedToast.warning).toHaveBeenCalledWith(
        'Następujące produkty zostały zarchiwizowane: Product 2',
        {
          description: 'Produkty zostały usunięte z koszyka',
        },
      );
    });
  });

  describe('edge cases', () => {
    it('should handle concurrent operations correctly', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem({ stockQuantity: 10 });

      act(() => {
        // Simulate concurrent operations
        result.current.addItem(item, 3);
        result.current.updateQuantity('test-product-1', 5);
        result.current.syncWithProduct('test-product-1', { stockQuantity: 4 });
      });

      expect(result.current.items[0].quantity).toBe(4);
      expect(result.current.items[0].stockQuantity).toBe(4);
    });

    it('should handle invalid price strings gracefully', () => {
      const { result } = renderHook(() => useCartStore());
      const item = createCartItem({ price: 'invalid-price' });

      act(() => {
        result.current.addItem(item, 2);
      });

      expect(result.current.getTotalPrice()).toBeNaN();
    });

    it('should maintain state consistency after multiple operations', () => {
      const { result } = renderHook(() => useCartStore());
      const item1 = createCartItem({ id: 'item-1', price: '10.00' });
      const item2 = createCartItem({ id: 'item-2', price: '20.00' });

      act(() => {
        result.current.addItem(item1, 2);
        result.current.addItem(item2, 1);
        result.current.updateQuantity('item-1', 3);
        result.current.removeItem('item-2');
        result.current.addItem(item2, 2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.getTotalPrice()).toBe(70);
      expect(result.current.getTotalItems()).toBe(5);
    });
  });
});
