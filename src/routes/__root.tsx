import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";

const RootLayout = () => (
  <>
    <Navbar>
      <NavbarBrand>
        <p>Bud Control</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/">Home</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/shortcuts">Shortcuts</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/settings">Settings</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <Outlet />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
