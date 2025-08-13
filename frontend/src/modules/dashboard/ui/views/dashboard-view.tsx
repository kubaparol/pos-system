import { PageHeader } from '@/components/base/page-header';

import { useDashboardStatsQuery } from '../../api/stats.query';
import { KpiCards } from '../components/kpi-cards';
import { RecentOrders } from '../components/recent-orders';
import { StockAlerts } from '../components/stock-alerts';
import { TopCustomers } from '../components/top-customers';
import { TopProducts } from '../components/top-products';

export const DashboardView = () => {
  const { data, isLoading, error } = useDashboardStatsQuery({ limit: 5 });

  const dashboardData = data?.data?.data;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center py-8">
          <p className="text-red-600">Błąd podczas ładowania danych dashboardu</p>
          <p className="text-gray-500 text-sm mt-2">Spróbuj odświeżyć stronę</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="Dashboard"
        description="Przegląd najważniejszych wskaźników sprzedaży, najpopularniejszych produktów i ostatnich zamówień w Twoim sklepie."
      />

      <KpiCards stats={dashboardData?.kpi || null} isLoading={isLoading} />

      <div className="grid gap-6 lg:grid-cols-2">
        <TopProducts products={dashboardData?.topProducts || null} isLoading={isLoading} />
        <StockAlerts alerts={dashboardData?.stockAlerts || null} isLoading={isLoading} />
        <TopCustomers customers={dashboardData?.topCustomers || null} isLoading={isLoading} />
        <RecentOrders orders={dashboardData?.recentOrders || null} isLoading={isLoading} />
      </div>
    </div>
  );
};
