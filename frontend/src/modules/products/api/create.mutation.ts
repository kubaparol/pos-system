import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { queryClient } from '@/lib/query-client';

import { createProduct } from '@/api/api.service';

import { DASHBOARD_STATS_QUERY_KEY } from '@/modules/dashboard/api/stats.query';

import { PRODUCTS_QUERY_KEY } from './products.query';
import type { ProductCreateDto, ProductCreateResponse } from './types';

export const useCreateProductMutation = () => {
  return useMutation<AxiosResponse<ProductCreateResponse>, Error, ProductCreateDto>({
    mutationFn: (productCreateDto) => createProduct(productCreateDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [DASHBOARD_STATS_QUERY_KEY] });
    },
  });
};
