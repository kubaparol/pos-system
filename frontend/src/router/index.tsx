import { type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { BaseLayout } from '@/components/layouts/base-layout';

import { SignInView } from '@/modules/auth/ui/views/sign-in-view';
import { DashboardView } from '@/modules/dashboard/ui/views/dashboard-view';
import { OrdersView } from '@/modules/orders/ui/views/orders-view';
import { ArchivedProductsView } from '@/modules/products/ui/views/archived-products-view';
import { ProductsView } from '@/modules/products/ui/views/products-view';

import { pathKeys } from './path-keys';
import { ProtectedRoute } from './protected-route';

const authRoutes: RouteObject = {
  path: pathKeys.auth,
  element: <AuthLayout />,
  children: [
    {
      path: pathKeys.signIn,
      element: <SignInView />,
    },
  ],
};

const appRoutes: RouteObject = {
  path: pathKeys.dashboard,
  element: <BaseLayout />,
  children: [
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: pathKeys.dashboard,
          element: <DashboardView />,
        },
        {
          path: pathKeys.products,
          element: <ProductsView />,
        },
        {
          path: pathKeys.archivedProducts,
          element: <ArchivedProductsView />,
        },
        {
          path: pathKeys.orders,
          element: <OrdersView />,
        },
      ],
    },
  ],
};

const router = createBrowserRouter([appRoutes, authRoutes]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
