import { type ReactNode, useMemo } from 'react';

import { useMeQuery } from '@/modules/users/api/me.query';

import { AuthContext } from './AuthProvider.context';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data, isLoading, isSuccess, isError } = useMeQuery();

  const contextValue = useMemo(
    () => ({
      user: data?.data.data || null,
      isLoading,
      isSuccess,
      isError,
    }),
    [data, isLoading, isSuccess, isError],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
