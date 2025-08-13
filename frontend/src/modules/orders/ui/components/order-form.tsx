import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, CheckCircle, Info, Loader2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { OrderFormDtoSchema } from '@/api/api.contracts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useSearchCustomerByPhoneQuery } from '@/modules/customers/api/search-by-phone.query';
import { handleError } from '@/utils';

import { useFinalizeOrderMutation } from '../../api/finalize.mutation';
import type { FinalizeOrderDto, OrderFormDto } from '../../api/types';
import { useCartStore } from '../../store/use-cart-store';

interface OrderFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const OrderForm = ({ onBack, onSuccess }: OrderFormProps) => {
  const { items, clearCart, getTotalPrice } = useCartStore();
  const [isLookingUpCustomer, setIsLookingUpCustomer] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const { mutateAsync: finalizeOrder, isPending } = useFinalizeOrderMutation();

  const form = useForm<OrderFormDto>({
    resolver: zodResolver(OrderFormDtoSchema),
    defaultValues: {
      phone: '',
      firstName: '',
      lastName: '',
      note: '',
    },
  });

  const totalPrice = getTotalPrice();

  const phoneValue = form.watch('phone');
  const isPhoneValid = phoneValue.length === 9 && /^\d{9}$/.test(phoneValue);

  const { data: customerData } = useSearchCustomerByPhoneQuery(isPhoneValid ? phoneValue : '');

  useEffect(() => {
    const lookupCustomer = async () => {
      if (isPhoneValid) {
        setIsLookingUpCustomer(true);
        try {
          if (customerData) {
            form.setValue('firstName', customerData.data.data.firstName);
            form.setValue('lastName', customerData.data.data.lastName);
          }
        } catch {
          // Ignore lookup errors
        } finally {
          setIsLookingUpCustomer(false);
        }
      }
    };

    const timeoutId = setTimeout(lookupCustomer, 500);
    return () => clearTimeout(timeoutId);
  }, [phoneValue, form, customerData, isPhoneValid]);

  const onSubmit = async (data: OrderFormDto) => {
    try {
      const orderData: FinalizeOrderDto = {
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        },
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        note: data.note || undefined,
      };

      const result = await finalizeOrder(orderData);

      toast.success('Zamówienie złożone', {
        description: 'Zamówienie zostało pomyślnie zrealizowane',
      });

      const orderNumber = result.data.data.orderNumber;

      if (orderNumber) {
        setOrderNumber(orderNumber);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSuccess = () => {
    onSuccess();
    clearCart();
    setOrderNumber(null);
  };

  if (orderNumber) {
    return (
      <Card className="h-fit">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Zamówienie złożone!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-gray-600 mb-2">Numer zamówienia:</p>
            <p className="text-xl font-bold text-gray-900">#{orderNumber}</p>
          </div>

          <p className="text-gray-600">
            Zamówienie zostało pomyślnie zrealizowane i zapisane w systemie.
          </p>

          <div className="pt-4">
            <Button asChild onClick={handleSuccess} className="w-full">
              <div>
                Kontynuuj
                <ArrowRight className="size-4" />
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Finalizacja zamówienia
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Suma zamówienia:</span>
            <span className="text-green-600">{totalPrice.toFixed(2)} PLN</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {items.length} {items.length === 1 ? 'produkt' : 'produktów'}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Telefon
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="size-4 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Po wpisaniu numeru telefonu nastąpi automatyczne wyszukanie klienta. Jeśli
                          robiono już zamówienie dla tego numeru, dane zostaną automatycznie
                          uzupełnione.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="tel"
                        placeholder="123456789"
                        disabled={isLookingUpCustomer}
                        maxLength={9}
                        {...field}
                      />
                      {isLookingUpCustomer && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  {isLookingUpCustomer && (
                    <FormDescription className="text-xs">Wyszukiwanie klienta...</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input disabled={isLookingUpCustomer} placeholder="Imię" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwisko</FormLabel>
                  <FormControl>
                    <Input disabled={isLookingUpCustomer} placeholder="Nazwisko" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notatka (opcjonalnie)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Dodatkowe informacje..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 bg-transparent"
                disabled={isPending}
              >
                Wróć
              </Button>
              <Button type="submit" disabled={isPending || items.length === 0} className="flex-1">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Przetwarzanie...
                  </>
                ) : (
                  'Złóż zamówienie'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
