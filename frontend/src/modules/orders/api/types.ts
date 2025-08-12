import { z } from 'zod';

import { FinalizeOrderDtoSchema, OrderFormDtoSchema } from '@/api/api.contracts';
import type { ApiResponse } from '@/api/api.types';

import type { CustomerByPhoneResponseData } from '@/modules/customers/api/types';
import type { ProductResponseData } from '@/modules/products/api/types';

export type OrderFormDto = z.infer<typeof OrderFormDtoSchema>;

export type FinalizeOrderDto = z.infer<typeof FinalizeOrderDtoSchema>;

export type FinalizeOrderResponse = ApiResponse<FinalizeOrderDto & { orderNumber: string }>;

export interface OrdersQueryParams {
  q?: string;
  dateFrom?: string;
  dateTo?: string;
  amountMin?: string;
  amountMax?: string;
}

export type OrderResponseData = {
  id: string;
  orderNumber: string;
  customerId: string;
  totalAmount: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  customer: CustomerByPhoneResponseData;
  items: {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: string;
    createdAt: string;
    updatedAt: string;
    product: ProductResponseData;
  }[];
};

export type OrderResponse = ApiResponse<OrderResponseData[]>;
