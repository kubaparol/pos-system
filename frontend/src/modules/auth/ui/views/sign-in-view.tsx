import { Store } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { SignInForm, type SignInFormValues } from '../components/sign-in-form';

export const SignInView = () => {
  const handleSignIn = async (values: SignInFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <Store className="size-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">POS System</h1>
            <p className="text-muted-foreground">System zarządzania sklepem stacjonarnym</p>
          </div>
        </div>

        <Card className="w-full shadow-lg border-0 bg-card/50 backdrop-blur-sm">
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
