import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/components/providers/auth/AuthProvider.context';

import { pathKeys } from './path-keys';

export const NonLoggedInRoute = () => {
  const { user, isLoading, isError } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || (!isLoading && user)) {
    return <Navigate to={pathKeys.home} />;
  }

  return <Outlet />;
};
