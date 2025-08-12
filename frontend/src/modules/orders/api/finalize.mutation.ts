import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { queryClient } from '@/lib/query-client';

import { finalizeOrder } from '@/api/api.service';

import type { OrderDto } from './types';
import type { OrderResponse } from './types';

export const useFinalizeOrderMutation = () => {
  return useMutation<AxiosResponse<OrderResponse>, Error, OrderDto>({
    mutationFn: (orderDto) => finalizeOrder(orderDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });
};
