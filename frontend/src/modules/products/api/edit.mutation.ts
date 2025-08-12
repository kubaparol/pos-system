import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { queryClient } from '@/lib/query-client';

import { editProduct } from '@/api/api.service';
import type { ProductEditDto, ProductEditResponse } from '@/api/api.types';

import { PRODUCTS_QUERY_KEY } from './products.query';

export const useEditProductMutation = () => {
  return useMutation<
    AxiosResponse<ProductEditResponse>,
    Error,
    { productId: string; productEditDto: ProductEditDto }
  >({
    mutationFn: ({ productId, productEditDto }) => editProduct(productId, productEditDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    },
  });
};
