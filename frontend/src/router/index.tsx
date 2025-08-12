import { type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import { BaseLayout } from '@/components/layouts/BaseLayout';

import { SignInView } from '@/modules/auth/ui/views/sign-in-view';
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
  path: pathKeys.home,
  element: <BaseLayout />,
  children: [
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: pathKeys.home,
          element: <div>Home Page</div>,
        },
        {
          path: pathKeys.products,
          element: <ProductsView />,
        },
      ],
    },
  ],
};

const router = createBrowserRouter([appRoutes, authRoutes]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
