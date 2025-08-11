import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] flex flex-col">
      <Outlet />
    </main>
  );
};
