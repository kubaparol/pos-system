import { AlertTriangle, Package } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatNumber } from '@/utils';

import type { StockAlert } from '../../api/types';

interface StockAlertsProps {
  alerts: StockAlert[] | null;
  isLoading: boolean;
}

export const StockAlerts = ({ alerts, isLoading }: StockAlertsProps) => {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          Alerty magazynowe
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !alerts ? (
          <StockAlertsSkeleton />
        ) : alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <p className="text-green-600 font-medium">Wszystkie produkty dostępne</p>
            <p className="text-xs text-gray-500 mt-1">Brak alertów magazynowych</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                title={alert.name}
                className="flex items-center justify-between p-3 gap-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-medium text-sm text-gray-900 truncate">{alert.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Stan: {formatNumber(alert.currentStock)} szt.
                  </p>
                </div>
                <Badge variant={getStockStatusVariant(alert.status)} className="text-xs">
                  {getStockStatusText(alert.status)}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const StockAlertsSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
        </div>
      ))}
    </div>
  );
};

const getStockStatusText = (status: 'out_of_stock' | 'low_stock'): string => {
  switch (status) {
    case 'out_of_stock':
      return 'Brak towaru';
    case 'low_stock':
      return 'Niski stan';
    default:
      return 'Dostępny';
  }
};

const getStockStatusVariant = (
  status: 'out_of_stock' | 'low_stock',
): 'destructive' | 'secondary' | 'outline' => {
  switch (status) {
    case 'out_of_stock':
      return 'destructive';
    case 'low_stock':
      return 'outline';
    default:
      return 'secondary';
  }
};
