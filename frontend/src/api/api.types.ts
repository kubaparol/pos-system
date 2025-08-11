import { z } from 'zod';

import { SignInDtoSchema } from './api.contracts';

// Generic API response structure
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
}

// Error response structure
export interface ApiErrorResponse {
  error: string;
  success: false;
}

export type SignInDto = z.infer<typeof SignInDtoSchema>;

export interface SignInResponseData {
  token: string;
  userId: string;
}

export type SignInResponse = ApiResponse<SignInResponseData>;
