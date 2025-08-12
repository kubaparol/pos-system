import { z } from 'zod';

export const ApiErrorDataDtoSchema = z.object({
  error: z.string(),
  success: z.boolean(),
});

export const SignInDtoSchema = z.object({
  email: z.email('Nieprawidłowy adres e-mail'),
  password: z.string().min(1, 'Hasło jest wymagane'),
});

export const ProductEditDtoSchema = z.object({
  title: z.string().min(1, 'Nazwa jest wymagana'),
  category: z.string().min(1, 'Kategoria jest wymagana'),
  description: z.string(),
  imageUrl: z.url('Nieprawidłowy URL').or(z.literal('')),
  price: z.number().min(0, 'Cena musi być większa lub równa 0'),
  stockQuantity: z.number().int().min(0, 'Ilość musi być liczbą całkowitą większą lub równą 0'),
  reviewRating: z.number().min(0).max(5),
  reviewCount: z.number().int().min(0),
});

export const OrderFormDtoSchema = z.object({
  phone: z.string().regex(/^\d{9}$/, 'Numer telefonu musi składać się z 9 cyfr'),
  firstName: z.string().min(1, 'Imię jest wymagane'),
  lastName: z.string().min(1, 'Nazwisko jest wymagane'),
  note: z.string().optional(),
});

export const OrderDtoSchema = z.object({
  customer: z.object({
    firstName: z.string().min(1, 'Imię jest wymagane'),
    lastName: z.string().min(1, 'Nazwisko jest wymagane'),
    phone: z.string().regex(/^\d{9}$/, 'Numer telefonu musi składać się z 9 cyfr'),
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().min(1, 'Ilość musi być liczbą całkowitą większą lub równą 1'),
    }),
  ),
  note: z.string().optional(),
});
