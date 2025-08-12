import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { getCategoriesFromFakeStore } from '@/api/api.service';

export const CATEGORIES_QUERY_KEY = 'categories';

export const useCategoriesQuery = () => {
  return useQuery<AxiosResponse<string[]>, Error>({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: () => getCategoriesFromFakeStore(),
    staleTime: 1000 * 60 * 10,
  });
};
