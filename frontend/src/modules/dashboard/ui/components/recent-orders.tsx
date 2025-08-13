import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Receipt } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatCurrency } from '@/utils';

import type { RecentOrder } from '../../api/types';

interface RecentOrdersProps {
  orders: RecentOrder[] | null;
  isLoading: boolean;
}

export const RecentOrders = ({ orders, isLoading }: RecentOrdersProps) => {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-green-600" />
          Ostatnie zamówienia
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !orders ? (
          <RecentOrdersSkeleton />
        ) : orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Receipt className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>Brak ostatnich zamówień</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-medium text-sm text-gray-900">{order.orderNumber}</h4>
                  <p className="text-xs text-gray-500 mt-1 truncate">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm text-green-600">
                    {formatCurrency(order.amount)}
                  </div>
                  <p className="text-xs text-gray-500">
                    {format(order.date, 'dd.MM.yyyy', { locale: pl })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const RecentOrdersSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>
          <div className="text-right space-y-2">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-12 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};
