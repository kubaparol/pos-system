import { PageHeader } from '@/components/base/page-header';

import { OrdersFilters } from '../components/orders-filters';
import { OrdersList } from '../components/orders-list';

export const OrdersView = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Zamówienia"
        description="Przeglądaj wszystkie zamówienia złożone w Twoim sklepie. Filtruj według statusu, daty i klienta, aby łatwo zarządzać procesem sprzedaży."
      />

      <div className="space-y-6">
        <OrdersFilters />

        <OrdersList />
      </div>
    </div>
  );
};
