import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Archive, ChevronDown, ChevronRight, Phone, User } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { formatCurrency } from '@/utils';

import type { OrderResponseData } from '../../api/types';
import { OrderItemsList } from './order-items-list';

interface OrderRowProps {
  order: OrderResponseData;
}

export const OrderRow = ({ order }: OrderRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date: string) => {
    return format(date, 'dd.MM.yyyy HH:mm', { locale: pl });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };
  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
        <CollapsibleTrigger asChild>
          <div
            className="w-full p-4 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-expanded={isExpanded}
            aria-label={`Zamówienie #${order.orderNumber}, kliknij aby ${isExpanded ? 'zwinąć' : 'rozwinąć'} szczegóły`}
          >
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-5 md:gap-4 md:items-center">
              <div className="flex items-center gap-2">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <div>
                  <div className="font-semibold text-sm">#{order.orderNumber}</div>
                  <div className="text-xs text-gray-500">{formatDate(order.createdAt)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-medium text-sm">
                    {order.customer.firstName} {order.customer.lastName}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Phone className="h-3 w-3" />
                    {order.customer.phone}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-green-600">
                  {formatCurrency(Number(order.totalAmount))}
                </div>
                <div className="text-xs text-gray-500">
                  {order.items.length}{' '}
                  {order.items.length === 1
                    ? 'pozycja'
                    : order.items.length > 4
                      ? 'pozycji'
                      : 'pozycje'}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {order.items.some((item) => item.product.isArchived) && (
                  <Badge variant="secondary" className="text-xs">
                    <Archive className="h-3 w-3 mr-1" />
                    Archiwalne
                  </Badge>
                )}
                {order.note && (
                  <Badge variant="outline" className="text-xs">
                    Notatka
                  </Badge>
                )}
              </div>

              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <div>
                    <div className="font-semibold text-sm">{order.orderNumber}</div>
                    <div className="text-xs text-gray-500">{formatDate(order.createdAt)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">
                    {formatCurrency(Number(order.totalAmount))}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.items.length} {order.items.length === 1 ? 'pozycja' : 'pozycji'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-sm">
                      {order.customer.firstName} {order.customer.lastName}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Phone className="h-3 w-3" />
                      {order.customer.phone}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {order.items.some((item) => item.product.isArchived) && (
                    <Badge variant="secondary" className="text-xs">
                      <Archive className="h-3 w-3 mr-1" />
                      Archiwalne
                    </Badge>
                  )}
                  {order.note && (
                    <Badge variant="outline" className="text-xs">
                      Notatka
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t bg-gray-50 p-4">
            <OrderItemsList order={order} />
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
