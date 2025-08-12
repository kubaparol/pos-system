// Shared API types

export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiErrorResponse {
  error: string;
  success: false;
}
