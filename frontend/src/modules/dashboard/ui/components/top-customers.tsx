import { Crown, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatCurrency, formatNumber } from '@/utils';

import type { TopCustomer } from '../../api/types';

interface TopCustomersProps {
  customers: TopCustomer[] | null;
  isLoading: boolean;
}

export const TopCustomers = ({ customers, isLoading }: TopCustomersProps) => {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Najlepsi klienci
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !customers ? (
          <TopCustomersSkeleton />
        ) : customers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>Brak danych o klientach</p>
          </div>
        ) : (
          <div className="space-y-3">
            {customers.map((customer, index) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative">
                    <div className="h-8 w-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {customer.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    {index === 0 && (
                      <Crown className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-medium text-sm text-gray-900 truncate">{customer.name}</h4>
                    <p className="text-xs text-gray-500">
                      {formatNumber(customer.orderCount)}{' '}
                      {customer.orderCount === 1
                        ? 'zamówienie'
                        : customer.orderCount > 4
                          ? 'zamówień'
                          : 'zamówienia'}{' '}
                      • {formatCurrency(customer.totalSpent)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const TopCustomersSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
        </div>
      ))}
    </div>
  );
};
