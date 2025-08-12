import axios, { type AxiosRequestConfig } from 'axios';

import type { SignInDto } from '@/modules/auth/api/types';
import type { ProductEditDto } from '@/modules/products/api/types';

import { ProductEditDtoSchema, SignInDtoSchema } from './api.contracts';
import { api } from './api.instance';

export const signIn = (signInDto: SignInDto, config?: AxiosRequestConfig) => {
  const data = SignInDtoSchema.parse(signInDto);
  return api.post('/auth/sign-in', data, config);
};

export const me = (config?: AxiosRequestConfig) => {
  return api.get('/users/me', config);
};

export const getProducts = (
  params?: { q?: string; category?: string },
  config?: AxiosRequestConfig,
) => {
  return api.get('/products', { ...config, params });
};

export const editProduct = (
  productId: string,
  productEditDto: ProductEditDto,
  config?: AxiosRequestConfig,
) => {
  const data = ProductEditDtoSchema.parse(productEditDto);
  return api.patch(`/products/${productId}`, data, config);
};

export const archiveProduct = (productId: string, config?: AxiosRequestConfig) => {
  return api.post(`/products/${productId}/archive`, config);
};

export const restoreProduct = (productId: string, config?: AxiosRequestConfig) => {
  return api.post(`/products/${productId}/restore`, config);
};

export const getCategoriesFromFakeStore = (config?: AxiosRequestConfig) => {
  return axios.get('https://fakestoreapi.com/products/categories', config);
};
