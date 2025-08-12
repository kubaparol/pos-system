import { createContext, useContext } from 'react';

import type { UserResponseData } from '@/modules/users/api/types';

export interface AuthContextType {
  user: UserResponseData | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
