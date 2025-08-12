import { OrdersFilters } from '../components/orders-filters';
import { OrdersList } from '../components/orders-list';

export const OrdersView = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <OrdersFilters />

      <OrdersList />
    </div>
  );
};
