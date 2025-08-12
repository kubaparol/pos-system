import { z } from 'zod';

import { ProductCreateDtoSchema, ProductEditDtoSchema } from '@/api/api.contracts';
import type { ApiResponse } from '@/api/api.types';

export interface ProductsQueryParams {
  q?: string;
  category?: string;
  archived?: boolean;
  sort?: string;
}

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

export type ProductCreateDto = z.infer<typeof ProductCreateDtoSchema>;

export type ProductCreateResponse = ApiResponse<ProductResponseData>;

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
