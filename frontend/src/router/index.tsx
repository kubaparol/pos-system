import { type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { BaseLayout } from '@/components/layouts/BaseLayout';

const routes: RouteObject = {
  path: '/',
  element: <BaseLayout />,
  children: [
    {
      path: '',
      element: <div>First Page</div>,
    },
  ],
};

const router = createBrowserRouter([routes]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
