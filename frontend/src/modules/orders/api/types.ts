import { z } from 'zod';

import { OrderDtoSchema, OrderFormDtoSchema } from '@/api/api.contracts';
import type { ApiResponse } from '@/api/api.types';

export type OrderFormDto = z.infer<typeof OrderFormDtoSchema>;

export type OrderDto = z.infer<typeof OrderDtoSchema>;

export type OrderResponse = ApiResponse<OrderDto & { orderNumber: string }>;
