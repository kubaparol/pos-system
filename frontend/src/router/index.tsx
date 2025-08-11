import { type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import { BaseLayout } from '@/components/layouts/BaseLayout';

import { SignInView } from '@/modules/auth/ui/views/sign-in-view';

import { AppUrls } from './constants';

const authRoutes: RouteObject = {
  path: AppUrls.auth,
  element: <AuthLayout />,
  children: [
    {
      path: AppUrls.signIn,
      element: <SignInView />,
    },
  ],
};

const appRoutes: RouteObject = {
  path: AppUrls.home,
  element: <BaseLayout />,
  children: [
    {
      path: '',
      element: <div>Home Page</div>,
    },
  ],
};

const router = createBrowserRouter([appRoutes, authRoutes]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
