import axios, { type AxiosRequestConfig } from 'axios';

import type { SignInDto } from '@/modules/auth/api/types';
import type { FinalizeOrderDto, OrdersQueryParams } from '@/modules/orders/api/types';
import type {
  ProductCreateDto,
  ProductEditDto,
  ProductsQueryParams,
} from '@/modules/products/api/types';

import {
  FinalizeOrderDtoSchema,
  ProductCreateDtoSchema,
  ProductEditDtoSchema,
  SignInDtoSchema,
} from './api.contracts';
import { api } from './api.instance';

export const signIn = (signInDto: SignInDto, config?: AxiosRequestConfig) => {
  const data = SignInDtoSchema.parse(signInDto);
  return api.post('/auth/sign-in', data, config);
};

export const me = (config?: AxiosRequestConfig) => {
  return api.get('/users/me', config);
};

export const getProducts = (params?: ProductsQueryParams, config?: AxiosRequestConfig) => {
  return api.get('/products', { ...config, params });
};

export const createProduct = (productCreateDto: ProductCreateDto, config?: AxiosRequestConfig) => {
  const data = ProductCreateDtoSchema.parse(productCreateDto);
  return api.post('/products', data, config);
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

export const getOrders = (params?: OrdersQueryParams, config?: AxiosRequestConfig) => {
  return api.get('/orders', { ...config, params });
};

export const finalizeOrder = (FinalizeOrderDto: FinalizeOrderDto, config?: AxiosRequestConfig) => {
  const data = FinalizeOrderDtoSchema.parse(FinalizeOrderDto);
  return api.post('/orders/finalize', data, config);
};

export const searchCustomerByPhone = (phone: string, config?: AxiosRequestConfig) => {
  return api.get(`/customers/search?phone=${phone}`, config);
};

export const getDashboardStats = (params?: { limit?: number }, config?: AxiosRequestConfig) => {
  return api.get('/dashboard/stats', { ...config, params });
};
