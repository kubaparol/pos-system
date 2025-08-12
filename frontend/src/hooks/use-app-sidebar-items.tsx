import { Archive, Home, LogOut, type LucideIcon, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { accessTokenCookie } from '@/lib/cookies';
import { queryClient } from '@/lib/query-client';

import { pathKeys } from '@/router/path-keys';

export interface AppSidebarItem {
  title: string;
  icon: LucideIcon;
  url?: string;
  onClick?: () => void;
}

export const useAppSidebarItems = (): AppSidebarItem[] => {
  const navigate = useNavigate();

  const logout = () => {
    accessTokenCookie.delete();
    queryClient.clear();
    navigate(pathKeys.signIn);
    toast.success('Wylogowano pomyślnie');
  };

  return [
    {
      title: 'Strona główna',
      icon: Home,
      url: pathKeys.dashboard,
    },
    {
      title: 'Produkty',
      icon: Package,
      url: pathKeys.products,
    },
    {
      title: 'Zamówienia',
      icon: Package,
      url: pathKeys.orders,
    },
    {
      title: 'Archiwum',
      icon: Archive,
      url: pathKeys.archivedProducts,
    },

    // Bottom items
    {
      title: 'Wyloguj',
      icon: LogOut,
      onClick: logout,
    },
  ];
};
