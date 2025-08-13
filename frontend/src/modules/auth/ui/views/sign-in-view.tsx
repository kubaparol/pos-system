import { toast } from 'sonner';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { handleError } from '@/utils';

import { useLoginMutation } from '../../api/login.mutation';
import type { SignInDto } from '../../api/types';
import { SignInForm } from '../components/sign-in-form';

export const SignInView = () => {
  const { mutateAsync: loginUser } = useLoginMutation();

  const handleSignIn = async (values: SignInDto) => {
    try {
      await loginUser(values);
      toast.success('Zalogowano pomyślnie');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center border border-primary/20">
            <img src="/logo.svg" alt="logo" className="size-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">POS System</h1>
            <p className="text-muted-foreground">System zarządzania sklepem stacjonarnym</p>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle>Panel logowania</CardTitle>
            <CardDescription>Wprowadź swoje dane, aby uzyskać dostęp do systemu</CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <SignInForm onFormSubmit={handleSignIn} />
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Bezpieczne logowanie dla właścicieli sklepów
          </p>
        </div>
      </div>
    </div>
  );
};
