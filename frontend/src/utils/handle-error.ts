import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data;

    if (errorData?.errors && Array.isArray(errorData.errors)) {
      // Handle validation errors from backend
      const errorMessages = errorData.errors
        .map((err: { path: string; msg: string }) => `${err.path}: ${err.msg}`)
        .join(', ');
      toast.error(`Błędy walidacji: ${errorMessages}`);
    } else if (typeof errorData === 'string') {
      // Handle normalized error response from interceptor
      toast.error(errorData);
    } else if (errorData?.error) {
      // Handle original error response format
      toast.error(errorData.error);
    } else {
      toast.error(error.response?.statusText || 'Wystąpił błąd');
    }
  } else {
    toast.error('Wystąpił nieoczekiwany błąd');
  }
};
