import { Package } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatCurrency, formatNumber } from '@/utils';

import type { TopProduct } from '../../api/types';

interface TopProductsProps {
  products: TopProduct[] | null;
  isLoading: boolean;
}

export const TopProducts = ({ products, isLoading }: TopProductsProps) => {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-600" />
          Najlepsze produkty
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !products ? (
          <TopProductsSkeleton />
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>Brak danych o produktach</p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 ">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                    <h4 className="font-medium text-sm text-gray-900 truncate">{product.name}</h4>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatNumber(product.quantitySold)} szt. •{' '}
                    {formatCurrency(product.totalRevenue)}
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

const TopProductsSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
      ))}
    </div>
  );
};
