import { ArrowLeft, Home, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { pathKeys } from '@/router/path-keys';

import { useAuthContext } from '../providers/auth/auth-provider.context';

export const NotFoundView = () => {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-xl border-0">
        <CardHeader className="pb-4">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4">
            <Search className="w-12 h-12 text-blue-600" />
          </div>
          <CardTitle className="text-6xl font-black text-gray-800 mb-2">404</CardTitle>
          <h1 className="text-2xl font-bold text-gray-700">Strona nie została znaleziona</h1>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600">
              Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
            </p>
            <p className="text-sm text-gray-500">
              Sprawdź adres URL lub skorzystaj z poniższych opcji.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {user ? (
              <Button asChild>
                <Link to={pathKeys.dashboard}>
                  <Home className="mr-2 h-5 w-5" />
                  Przejdź do Dashboard
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
