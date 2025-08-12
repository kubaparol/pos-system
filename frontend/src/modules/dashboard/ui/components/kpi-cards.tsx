import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatCurrency, formatNumber } from '@/utils';

import type { DashboardKpi } from '../../api/types';

interface KpiCardsProps {
  stats: DashboardKpi | null;
  isLoading: boolean;
}

export const KpiCards = ({ stats, isLoading }: KpiCardsProps) => {
  if (isLoading || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 w-full">
        <KpiCardSkeleton />
        <KpiCardSkeleton />
        <KpiCardSkeleton />
        <KpiCardSkeleton />
      </div>
    );
  }

  const kpiData = [
    {
      title: 'Łączny przychód',
      value: formatCurrency(stats.totalRevenue),
      description: 'Całkowita sprzedaż',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Łączne zamówienia',
      value: formatNumber(stats.totalOrders),
      description:
        stats.totalOrders === 1 ? 'zamówienie' : stats.totalOrders > 4 ? 'zamówień' : 'zamówienia',
      icon: ShoppingCart,
      color: 'text-blue-600',
    },
    {
      title: 'Średnia wartość',
      value: formatCurrency(stats.averageOrderValue),
      description: 'na zamówienie',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
    {
      title: 'Łączni klienci',
      value: formatNumber(stats.totalCustomers),
      description: 'klientów',
      icon: Users,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 w-full">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
            <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
            <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const KpiCardSkeleton = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse mb-1" />
        <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
      </CardContent>
    </Card>
  );
};
