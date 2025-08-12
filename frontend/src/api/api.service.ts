import type { AxiosRequestConfig } from 'axios';

import { SignInDtoSchema } from './api.contracts';
import { api } from './api.instance';
import type { SignInDto } from './api.types';

export const signIn = (signInDto: SignInDto, config?: AxiosRequestConfig) => {
  const data = SignInDtoSchema.parse(signInDto);
  return api.post('/auth/sign-in', data, config);
};

export const me = (config?: AxiosRequestConfig) => {
  return api.get('/users/me', config);
};
