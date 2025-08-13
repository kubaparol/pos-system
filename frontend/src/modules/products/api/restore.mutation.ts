import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { queryClient } from '@/lib/query-client';

import { restoreProduct } from '@/api/api.service';

import { DASHBOARD_STATS_QUERY_KEY } from '@/modules/dashboard/api/stats.query';

import { PRODUCTS_QUERY_KEY } from './products.query';
import type { RestoreProductResponse } from './types';

export const useRestoreProductMutation = () => {
  return useMutation<AxiosResponse<RestoreProductResponse>, Error, string>({
    mutationFn: (productId) => restoreProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [DASHBOARD_STATS_QUERY_KEY] });
    },
  });
};
