import type { ApiResponse } from '@/api/api.types';

export interface CustomerByPhoneResponseData {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerByPhoneResponse = ApiResponse<CustomerByPhoneResponseData>;
