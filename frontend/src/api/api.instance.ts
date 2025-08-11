import axios, { AxiosError } from 'axios';

import { ApiErrorDataDtoSchema } from './api.contracts';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const validation = ApiErrorDataDtoSchema.safeParse(error.response?.data);

    if (!validation.success) {
      return Promise.reject(error);
    }

    const normalizedErrorResponse = {
      ...error.response!,
      data: validation.data.error,
    };

    return Promise.reject(
      new AxiosError(
        error.message,
        error.code,
        error.config,
        error.request,
        normalizedErrorResponse,
      ),
    );
  },
);
