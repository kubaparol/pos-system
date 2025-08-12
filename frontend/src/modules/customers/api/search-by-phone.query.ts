import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { searchCustomerByPhone } from '@/api/api.service';

import type { CustomerByPhoneResponse } from './types';

export const CUSTOMER_SEARCH_BY_PHONE_QUERY_KEY = 'customers-search-by-phone';

export const useSearchCustomerByPhoneQuery = (phone: string) => {
  return useQuery<AxiosResponse<CustomerByPhoneResponse>, Error>({
    queryKey: [CUSTOMER_SEARCH_BY_PHONE_QUERY_KEY, phone],
    queryFn: () => searchCustomerByPhone(phone),
    enabled: !!phone,
  });
};
