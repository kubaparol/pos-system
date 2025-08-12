import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { getProducts } from '@/api/api.service';

import type { ProductResponse } from './types';

export const PRODUCTS_QUERY_KEY = 'products';

interface ProductsQueryParams {
  q?: string;
  category?: string;
}

export const useProductsQuery = (params?: ProductsQueryParams) => {
  return useQuery<AxiosResponse<ProductResponse>, Error>({
    queryKey: [PRODUCTS_QUERY_KEY, params],
    queryFn: () => getProducts(params),
  });
};
