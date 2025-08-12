import { Link, useLocation } from 'react-router-dom';

import { useAppSidebarItems } from '@/hooks/use-app-sidebar-items';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Button } from '../ui/button';

export const AppSidebar = () => {
  const items = useAppSidebarItems();
  const location = useLocation();

  const isActive = (url: string) => {
    return location.pathname === url;
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="h-full">
          <SidebarGroupLabel>Platforma</SidebarGroupLabel>

          <SidebarGroupContent className="space-y-6 flex flex-col h-full">
            <SidebarMenu className="flex-1">
              {items.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className={index === items.length - 1 ? 'mt-auto' : ''}
                >
                  <SidebarMenuButton asChild isActive={isActive(item.url || '')}>
                    {item.url ? (
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <Button onClick={item.onClick} variant="secondary">
                        <item.icon />
                        <span>{item.title}</span>
                      </Button>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
