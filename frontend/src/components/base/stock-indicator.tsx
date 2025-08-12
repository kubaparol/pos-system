'use client';

import { cn } from '@/utils';

interface StockIndicatorProps {
  stockQuantity: number;
  className?: string;
}

export const StockIndicator = ({ stockQuantity, className }: StockIndicatorProps) => {
  const getStockLevel = (stock: number) => {
    if (stock === 0) return 'out';
    if (stock <= 5) return 'low';
    if (stock <= 15) return 'medium';
    return 'high';
  };

  const stockLevel = getStockLevel(stockQuantity);

  const getStockConfig = (level: string) => {
    switch (level) {
      case 'out':
        return {
          bars: 0,
          color: 'bg-gray-300',
          label: 'Brak',
          textColor: 'text-gray-500',
        };
      case 'low':
        return {
          bars: 1,
          color: 'bg-red-500',
          label: 'Niska',
          textColor: 'text-red-600',
        };
      case 'medium':
        return {
          bars: 2,
          color: 'bg-orange-500',
          label: 'Średnia',
          textColor: 'text-orange-600',
        };
      case 'high':
        return {
          bars: 3,
          color: 'bg-green-500',
          label: 'Wysoka',
          textColor: 'text-green-600',
        };
      default:
        return {
          bars: 0,
          color: 'bg-gray-300',
          label: 'Brak',
          textColor: 'text-gray-500',
        };
    }
  };

  const config = getStockConfig(stockLevel);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Stock bars indicator */}
      <div className="flex items-end gap-0.5 h-4">
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className={cn(
              'w-1 rounded-sm transform -skew-x-12 transition-colors',
              bar <= config.bars ? config.color : 'bg-gray-200',
              bar === 1 && 'h-2',
              bar === 2 && 'h-3',
              bar === 3 && 'h-4',
            )}
          />
        ))}
      </div>

      {/* Stock text */}
      <div className="flex flex-col">
        <span className={cn('text-xs font-medium', config.textColor)}>{config.label}</span>
        <span className="text-xs text-gray-500">{stockQuantity} szt.</span>
      </div>
    </div>
  );
};
