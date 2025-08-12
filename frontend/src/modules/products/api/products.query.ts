import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { getProducts } from '@/api/api.service';
import type { ProductResponse } from '@/api/api.types';

export const PRODUCTS_QUERY_KEY = 'products';

export const useProductsQuery = () => {
  return useQuery<AxiosResponse<ProductResponse>, Error>({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: () => getProducts(),
  });
};
