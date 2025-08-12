import { Package, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { formatCurrency } from '@/utils';

import { useCartStore } from '../../store/use-cart-store';
import { CartItem } from './cart-item';

export const CartPanel = () => {
  const { items, getTotalPrice, getTotalItems } = useCartStore();

  const [showOrderForm, setShowOrderForm] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <Card className="h-fit">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Pusty koszyk</h3>
              <p className="text-sm text-gray-500">Dodaj produkty do koszyka, aby kontynuować</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showOrderForm) {
    return <p>OrderForm</p>;
    // return <OrderForm onBack={() => setShowOrderForm(false)} onSuccess={() => setShowOrderForm(false)} />
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Koszyk ({totalItems})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Suma:</span>
            <span className="text-green-600">{formatCurrency(totalPrice)}</span>
          </div>
        </div>

        <Button onClick={() => setShowOrderForm(true)} className="w-full" size="lg">
          Finalizuj zamówienie
        </Button>
      </CardContent>
    </Card>
  );
};
