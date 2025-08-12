import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { queryClient } from '@/lib/query-client';

import { archiveProduct } from '@/api/api.service';

import { PRODUCTS_QUERY_KEY } from './products.query';
import type { ArchiveProductResponse } from './types';

export const useArchiveProductMutation = () => {
  return useMutation<AxiosResponse<ArchiveProductResponse>, Error, string>({
    mutationFn: (productId) => archiveProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    },
  });
};
