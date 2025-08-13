import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { queryClient } from '@/lib/query-client';

import { finalizeOrder } from '@/api/api.service';

import { DASHBOARD_STATS_QUERY_KEY } from '@/modules/dashboard/api/stats.query';
import { PRODUCTS_QUERY_KEY } from '@/modules/products/api/products.query';

import { ORDERS_QUERY_KEY } from './orders.query';
import type { FinalizeOrderDto } from './types';
import type { FinalizeOrderResponse } from './types';

export const useFinalizeOrderMutation = () => {
  return useMutation<AxiosResponse<FinalizeOrderResponse>, Error, FinalizeOrderDto>({
    mutationFn: (orderDto) => finalizeOrder(orderDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [DASHBOARD_STATS_QUERY_KEY] });
    },
  });
};
