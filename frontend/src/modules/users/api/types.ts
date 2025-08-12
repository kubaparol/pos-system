import type { ApiResponse } from '@/api/api.types';

export interface UserResponseData {
  createdAt: string;
  email: string;
  id: string;
  updatedAt: string;
}

export type UserResponse = ApiResponse<UserResponseData>;
