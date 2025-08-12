import { Separator } from '@radix-ui/react-separator';
import { Package, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { useCartStore } from '../../store/use-cart-store';
import { CartItem } from './cart-item';

export const CartDrawer = () => {
  const { items, getTotalPrice, getTotalItems } = useCartStore();
  const [open, setOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  // const handleSuccess = () => {
  //   setShowOrderForm(false);
  //   setOpen(false);
  // };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Koszyk
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Koszyk ({totalItems})
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-4 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center space-y-4 py-8">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Pusty koszyk</h3>
                <p className="text-sm text-gray-500">Dodaj produkty do koszyka, aby kontynuować</p>
              </div>
            </div>
          ) : showOrderForm ? (
            <div>OrderForm</div>
          ) : (
            // <OrderForm onBack={() => setShowOrderForm(false)} onSuccess={handleSuccess} />
            <div className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Suma:</span>
                  <span className="text-green-600">{totalPrice.toFixed(2)} PLN</span>
                </div>
              </div>

              <Button onClick={() => setShowOrderForm(true)} className="w-full" size="lg">
                Finalizuj zamówienie
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
