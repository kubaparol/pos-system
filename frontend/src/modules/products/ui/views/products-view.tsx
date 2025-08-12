import { ProductFilters } from '../components/product-filters';
import { ProductGrid } from '../components/product-grid';

export const ProductsView = () => {
  return (
    <>
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <ProductFilters />

          <ProductGrid />
        </div>

        {/* Desktop cart panel */}
        {/* <div className="hidden lg:block w-80 sticky top-6 h-fit">
          <CartPanel />
        </div> */}
      </div>

      {/* Mobile cart drawer - pozycjonowany absolutnie */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">{/* <CartDrawer /> */}</div>
    </>
  );
};
