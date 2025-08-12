import { CartDrawer } from '@/modules/orders/ui/components/cart-drawer';
import { CartPanel } from '@/modules/orders/ui/components/cart-panel';

import { ProductFilters } from '../components/product-filters';
import { ProductGrid } from '../components/product-grid';

export const ProductsView = () => {
  return (
    <>
      <div className="flex gap-10 max-w-7xl mx-auto">
        <div className="flex-1 space-y-6">
          <ProductFilters />

          <ProductGrid />
        </div>

        {/* Desktop cart panel */}
        <div className="hidden xl:block w-90 sticky top-16 h-fit">
          <CartPanel />
        </div>
      </div>

      {/* Mobile cart drawer - pozycjonowany absolutnie */}
      <div className="xl:hidden fixed bottom-4 right-4 z-50">
        <CartDrawer />
      </div>
    </>
  );
};
