import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppNavbar } from "@/components/layout/Navbar";

const RootLayout = () => (
  <main className="dark text-foreground bg-background">
    <AppNavbar />
    <Outlet />
  </main>
);

export const Route = createRootRoute({ component: RootLayout });
