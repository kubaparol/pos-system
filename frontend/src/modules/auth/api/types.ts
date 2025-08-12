import { z } from 'zod';

import { SignInDtoSchema } from '@/api/api.contracts';
import type { ApiResponse } from '@/api/api.types';

export type SignInDto = z.infer<typeof SignInDtoSchema>;

export interface SignInResponseData {
  token: string;
  userId: string;
}

export type SignInResponse = ApiResponse<SignInResponseData>;
