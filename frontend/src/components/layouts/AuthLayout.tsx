import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
};
