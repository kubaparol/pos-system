import { z } from 'zod';

export const ApiErrorDataDtoSchema = z.object({
  error: z.string(),
  success: z.boolean(),
});

export const SignInDtoSchema = z.object({
  email: z.email('Nieprawidłowy adres e-mail'),
  password: z.string().min(1, 'Hasło jest wymagane'),
});
