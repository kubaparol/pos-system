import { Package, Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { useOrdersQuery } from '../../api/orders.query';
import { OrderRow } from './order-row';

export const OrdersList = () => {
  const [searchParams] = useSearchParams();

  const ordersParams = {
    q: searchParams.get('q') || undefined,
    dateFrom: searchParams.get('dateFrom') || undefined,
    dateTo: searchParams.get('dateTo') || undefined,
    amountMin: searchParams.get('amountMin') || undefined,
    amountMax: searchParams.get('amountMax') || undefined,
  };

  const { data, isLoading } = useOrdersQuery(ordersParams);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const hasActiveFilters = Boolean(
    ordersParams.q ||
      ordersParams.dateFrom ||
      ordersParams.dateTo ||
      ordersParams.amountMin ||
      ordersParams.amountMax,
  );

  if (data?.data.data.length === 0) {
    return <EmptyState hasFilters={hasActiveFilters} />;
  }

  return (
    <div className="space-y-3">
      {data?.data.data.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border rounded-lg bg-white p-4">
          <div className="hidden md:grid md:grid-cols-5 md:gap-4 md:items-center">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-8 animate-pulse" />
          </div>
          <div className="md:hidden space-y-3">
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

const EmptyState = ({ hasFilters }: { hasFilters: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {hasFilters ? (
        <>
          <Search className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Brak wyników</h3>
          <p className="text-gray-500 mb-4">
            Nie znaleziono zamówień spełniających kryteria wyszukiwania
          </p>
          <p className="text-sm text-gray-400">
            Spróbuj zmienić filtry lub wyczyść wszystkie filtry
          </p>
        </>
      ) : (
        <>
          <Package className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Brak zamówień</h3>
          <p className="text-gray-500 mb-4">Nie ma jeszcze żadnych zamówień w systemie</p>
        </>
      )}
    </div>
  );
};
