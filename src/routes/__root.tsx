import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppNavbar } from "@/components/layout/Navbar";

const RootLayout = () => (
  <main className="dark text-foreground bg-background min-h-screen flex flex-col w-full">
    <AppNavbar />
    <div className="flex-1 h-full">
      <Outlet />
    </div>
  </main>
);

export const Route = createRootRoute({ component: RootLayout });
