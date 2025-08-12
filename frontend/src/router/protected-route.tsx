import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '@/components/providers/auth/AuthProvider.context';

import { pathKeys } from './path-keys';

export const ProtectedRoute = () => {
  const { user, isLoading, isError } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || (!isLoading && !user)) {
    return <Navigate to={pathKeys.signIn} />;
  }

  return <Outlet />;
};
