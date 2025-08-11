import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data || 'Nieznany błąd');
  } else {
    toast.error('Nie udało się zalogować: Wystąpił nieoczekiwany błąd');
  }
};
