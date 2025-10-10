import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/shortcuts" className="[&.active]:font-bold">
        Shortcuts
      </Link>
      <Link to="/settings" className="[&.active]:font-bold">
        Settings
      </Link>
    </div>
    <Outlet />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
