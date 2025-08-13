import type { ApiResponse } from '@/api/api.types';

export interface DashboardStatsQueryParams {
  limit?: number;
}

export interface DashboardKpi {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCustomers: number;
}

export interface TopProduct {
  id: string;
  name: string;
  quantitySold: number;
  totalRevenue: number;
}

export interface StockAlert {
  id: string;
  name: string;
  currentStock: number;
  status: 'out_of_stock' | 'low_stock';
}

export interface TopCustomer {
  id: string;
  name: string;
  orderCount: number;
  totalSpent: number;
}

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  date: string;
}

export interface DashboardStatsData {
  kpi: DashboardKpi;
  topProducts: TopProduct[];
  stockAlerts: StockAlert[];
  topCustomers: TopCustomer[];
  recentOrders: RecentOrder[];
}

export type DashboardStatsResponse = ApiResponse<DashboardStatsData>;
