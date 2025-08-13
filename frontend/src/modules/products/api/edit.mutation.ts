import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { queryClient } from '@/lib/query-client';

import { editProduct } from '@/api/api.service';

import { DASHBOARD_STATS_QUERY_KEY } from '@/modules/dashboard/api/stats.query';

import { PRODUCTS_QUERY_KEY } from './products.query';
import type { ProductEditDto, ProductEditResponse } from './types';

export const useEditProductMutation = () => {
  return useMutation<
    AxiosResponse<ProductEditResponse>,
    Error,
    { productId: string; productEditDto: ProductEditDto }
  >({
    mutationFn: ({ productId, productEditDto }) => editProduct(productId, productEditDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [DASHBOARD_STATS_QUERY_KEY] });
    },
  });
};
