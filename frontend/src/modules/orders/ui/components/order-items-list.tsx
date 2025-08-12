import { Archive, Package } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { formatCurrency } from '@/utils';

import type { OrderResponseData } from '../../api/types';

interface OrderItemsListProps {
  order: OrderResponseData;
}

export const OrderItemsList = ({ order }: OrderItemsListProps) => {
  const calculateLineTotal = (quantity: number, unitPrice: number) => {
    return quantity * unitPrice;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Package className="h-4 w-4" />
        Pozycje zamówienia ({order.items.length})
      </div>

      <div className="space-y-3">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-white rounded-lg border"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm">{item.product.title}</h4>
                {item.product.isArchived && (
                  <Badge variant="secondary" className="text-xs">
                    <Archive className="h-3 w-3 mr-1" />
                    Zarchiwizowany
                  </Badge>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {item.quantity} szt. × {formatCurrency(Number(item.unitPrice))}
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-green-600">
                {formatCurrency(calculateLineTotal(item.quantity, Number(item.unitPrice)))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {order.note && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm font-medium text-blue-800 mb-1">Notatka do zamówienia:</div>
          <div className="text-sm text-blue-700">{order.note}</div>
        </div>
      )}

      <div className="flex justify-end pt-3 border-t">
        <div className="text-right">
          <div className="text-sm text-gray-500">Suma zamówienia:</div>
          <div className="text-lg font-bold text-green-600">
            {formatCurrency(Number(order.totalAmount))}
          </div>
        </div>
      </div>
    </div>
  );
};
