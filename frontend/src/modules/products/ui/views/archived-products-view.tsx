import { ProductFilters } from '../components/product-filters';
import { ProductGrid } from '../components/product-grid';

export const ArchivedProductsView = () => {
  return (
    <div className="flex-1 space-y-6 max-w-7xl mx-auto">
      <ProductFilters />

      <ProductGrid archived />
    </div>
  );
};
