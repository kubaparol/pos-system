import { ShoppingCart, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { formatCurrency } from '@/utils';

import { type CartItem as CartItemType, useCartStore } from '../../store/use-cart-store';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 0) return;
    if (newQuantity > item.stockQuantity) return;
    updateQuantity(item.id, newQuantity);
  };

  const itemTotal = Number(item.price) * item.quantity;

  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{item.title}</h4>
        <p className="text-sm text-gray-500">{formatCurrency(Number(item.price))}</p>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Button
              title="Zmniejsz ilość"
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="h-8 w-8 p-0"
            >
              -
            </Button>
            <Input
              type="number"
              min="1"
              max={item.stockQuantity}
              value={item.quantity}
              onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
              className="h-8 w-16 text-center"
            />
            <Button
              title="Zwiększ ilość"
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= item.stockQuantity}
              className="h-8 w-8 p-0"
            >
              +
            </Button>
          </div>

          <Button
            title="Usuń produkt"
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm font-medium text-green-600 mt-1">{formatCurrency(itemTotal)}</p>
      </div>
    </div>
  );
};
