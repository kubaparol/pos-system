import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { getOrders } from '@/api/api.service';

import type { OrderResponse, OrdersQueryParams } from './types';

export const ORDERS_QUERY_KEY = 'orders';

export const useOrdersQuery = (params?: OrdersQueryParams) => {
  return useQuery<AxiosResponse<OrderResponse>, Error>({
    queryKey: [ORDERS_QUERY_KEY, params],
    queryFn: () => getOrders(params),
  });
};
