import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Outlet />
    </main>
  );
};
