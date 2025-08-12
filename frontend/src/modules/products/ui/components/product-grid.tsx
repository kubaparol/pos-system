import { Package } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { useProductsQuery } from '../../api/products.query';
import { ProductCard, ProductCardSkeleton } from '../components/product-card';

interface ProductGridProps {
  archived?: boolean;
}

export const ProductGrid = ({ archived }: ProductGridProps) => {
  const [searchParams] = useSearchParams();

  const params = {
    q: searchParams.get('q') || undefined,
    category:
      searchParams.get('category') === 'all'
        ? undefined
        : searchParams.get('category') || undefined,
    archived: archived || undefined,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  ) as { q?: string; category?: string };

  const { data: productsData, isLoading } = useProductsQuery(
    Object.keys(filteredParams).length > 0 ? filteredParams : undefined,
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (productsData?.data.data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {productsData?.data.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <Package className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Brak produktów</h3>
      <p className="text-gray-500 mb-4">Nie znaleziono produktów spełniających kryteria</p>
    </div>
  );
};
