import type { AxiosError } from 'axios';
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

import { pathKeys } from '@/router/path-keys';

import { useAuthContext } from '../providers/auth/auth-provider.context';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ErrorHandlerProps {
  error: Error;
  resetErrorBoundary?: (...args: unknown[]) => void;
}

export const ErrorHandler = ({ error, resetErrorBoundary }: ErrorHandlerProps) => {
  const { user } = useAuthContext();

  if ((error as AxiosError)?.response?.status === 404) {
    return <Navigate to={pathKeys.notFound} replace />;
  }

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-xl border-0">
        <CardHeader className="pb-4">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
          <CardTitle className="text-6xl font-black text-gray-800 mb-2">500</CardTitle>
          <h1 className="text-2xl font-bold text-gray-700">Coś poszło nie tak</h1>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600">
              Wystąpił nieoczekiwany błąd w aplikacji. Przepraszamy za niedogodności.
            </p>
            <p className="text-sm text-gray-500">
              Spróbuj odświeżyć stronę lub powrócić do strony głównej.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={resetErrorBoundary}>
              <RefreshCw className="mr-2 h-5 w-5" />
              Spróbuj ponownie
            </Button>

            <Button onClick={handleReload} variant="outline">
              <RefreshCw className="mr-2 h-5 w-5" />
              Odśwież stronę
            </Button>

            <Button asChild variant="ghost">
              {user ? (
                <Button asChild>
                  <Link to={pathKeys.dashboard}>
                    <Home className="mr-2 h-5 w-5" />
                    Przejdź do strony głównej
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline">
                  <Link to={pathKeys.signIn}>
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Powrót do logowania
                  </Link>
                </Button>
              )}
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-400">
              Jeśli problem się powtarza, skontaktuj się z administratorem
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
