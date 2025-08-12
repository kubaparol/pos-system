import { UserIcon } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { pathKeys } from '@/router/path-keys';

import { AppSidebar } from '../base/app-sidebar';
import { useAuthContext } from '../providers/auth/auth-provider.context';
import { Separator } from '../ui/separator';

const TITLES: Record<string, string> = {
  [pathKeys.home]: 'Dashboard',
  [pathKeys.products]: 'Produkty',
  [pathKeys.archivedProducts]: 'Archiwum',
} as const;

export const BaseLayout = () => {
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  const currentTitle = TITLES[pathname];

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col min-h-screen w-full">
        <header className="border-b w-full px-4 py-2 flex items-center justify-between">
          <div className="flex w-full items-center gap-1">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 !h-4" />
            <h1 className="text-base font-medium">{currentTitle}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full border">
              <UserIcon className="size-5" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-xs text-muted-foreground">Zalogowano jako</span>
              <span className="font-medium text-sm max-w-[220px] truncate" title={user?.email}>
                {user?.email}
              </span>
            </div>
          </div>
        </header>

        <main className=" flex-1 px-4 py-2">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};
