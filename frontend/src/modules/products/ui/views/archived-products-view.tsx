import { PageHeader } from '@/components/base/page-header';

import { ProductFilters } from '../components/product-filters';
import { ProductGrid } from '../components/product-grid';

export const ArchivedProductsView = () => {
  return (
    <div className="flex-1 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Produkty archiwalne"
        description="Przeglądaj i zarządzaj produktami, które zostały zarchiwizowane. Możesz je przywrócić do aktywnego asortymentu w każdej chwili."
      />

      <div className="space-y-6">
        <ProductFilters />

        <ProductGrid archived />
      </div>
    </div>
  );
};
