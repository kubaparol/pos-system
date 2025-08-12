import { z } from 'zod';

import { ProductEditDtoSchema, SignInDtoSchema } from './api.contracts';

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

export interface UserResponseData {
  createdAt: string;
  email: string;
  id: string;
  updatedAt: string;
}

export type UserResponse = ApiResponse<UserResponseData>;

export interface ProductResponseData {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  stockQuantity: number;
  isArchived: boolean;
  reviewRating: string;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export type ProductResponse = ApiResponse<ProductResponseData[]>;

export type ProductEditDto = z.infer<typeof ProductEditDtoSchema>;

export type ProductEditResponse = ApiResponse<ProductResponseData>;

export interface ArchiveProductResponseData {
  id: string;
  isArchived: boolean;
}

export type ArchiveProductResponse = ApiResponse<ArchiveProductResponseData>;

export interface RestoreProductResponseData {
  id: string;
  isArchived: boolean;
}

export type RestoreProductResponse = ApiResponse<RestoreProductResponseData>;
