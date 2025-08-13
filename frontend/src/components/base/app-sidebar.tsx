import { CirclePlus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { handleError } from '@/utils/handle-error';

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
  SidebarSeparator,
} from '@/components/ui/sidebar';

import { useCreateProductMutation } from '@/modules/products/api/create.mutation';
import type { ProductCreateDto } from '@/modules/products/api/types';
import { ProductAddDialog } from '@/modules/products/ui/components/product-add-dialog';
import { pathKeys } from '@/router/path-keys';

import { Button } from '../ui/button';

export const AppSidebar = () => {
  const items = useAppSidebarItems();
  const location = useLocation();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { mutateAsync: createProduct } = useCreateProductMutation();

  const handleCreateProduct = async (values: ProductCreateDto) => {
    try {
      await createProduct(values);
      toast.success('Produkt został dodany pomyślnie');
    } catch (error) {
      handleError(error);
    }
  };

  const isActive = (url: string) => {
    return location.pathname === url;
  };

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <div className="flex h-16 items-center px-6">
            <Link to={pathKeys.dashboard} className="flex items-center gap-2 font-semibold">
              <ShoppingCart className="size-5" />
              <span>POS System</span>
            </Link>
          </div>

          <SidebarGroup className="h-full">
            <SidebarGroupLabel>Platforma</SidebarGroupLabel>

            <SidebarGroupContent className="space-y-6 flex flex-col h-full">
              <SidebarMenu className="flex-1">
                <SidebarMenuButton
                  tooltip="Quick Create"
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                >
                  <CirclePlus />
                  <span>Dodaj nowy produkt</span>
                </SidebarMenuButton>

                <SidebarSeparator className="my-2" />

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
                        <Button onClick={item.onClick} variant="outline">
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

      <ProductAddDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onFormSubmit={handleCreateProduct}
      />
    </>
  );
};
