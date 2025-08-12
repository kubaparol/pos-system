import type { AxiosRequestConfig } from 'axios';

import { ProductEditDtoSchema, SignInDtoSchema } from './api.contracts';
import { api } from './api.instance';
import type { ProductEditDto, SignInDto } from './api.types';

export const signIn = (signInDto: SignInDto, config?: AxiosRequestConfig) => {
  const data = SignInDtoSchema.parse(signInDto);
  return api.post('/auth/sign-in', data, config);
};

export const me = (config?: AxiosRequestConfig) => {
  return api.get('/users/me', config);
};

export const getProducts = (config?: AxiosRequestConfig) => {
  return api.get('/products', config);
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
