import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { getDashboardStats } from '@/api/api.service';

import type { DashboardStatsQueryParams, DashboardStatsResponse } from './types';

export const DASHBOARD_STATS_QUERY_KEY = 'dashboard-stats';

export const useDashboardStatsQuery = (params?: DashboardStatsQueryParams) => {
  return useQuery<AxiosResponse<DashboardStatsResponse>, Error>({
    queryKey: [DASHBOARD_STATS_QUERY_KEY, params],
    queryFn: () => getDashboardStats(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
