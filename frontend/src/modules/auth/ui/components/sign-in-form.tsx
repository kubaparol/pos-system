import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { SignInDtoSchema } from '@/api/api.contracts';
import type { SignInDto } from '@/api/api.types';

import { PasswordInput } from '@/components/base/PasswordInput';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface SignInFormProps {
  onFormSubmit: (values: SignInDto) => void;
}

export const SignInForm = ({ onFormSubmit }: SignInFormProps) => {
  const form = useForm<SignInDto>({
    resolver: zodResolver(SignInDtoSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Mail className="size-4 text-muted-foreground" />
                  Adres e-mail
                </FormLabel>

                <FormControl>
                  <Input placeholder="johndoe@email.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>
                    <Lock className="size-4 text-muted-foreground" />
                    Hasło
                  </FormLabel>
                </div>

                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {form.formState.isSubmitting ? 'Logowanie...' : 'Zaloguj się'}
        </Button>
      </form>
    </Form>
  );
};
