import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@heroui/navbar";

export const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Bud Control</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link to="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/devices">Devices</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/shortcuts">Shortcuts</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/settings">Settings</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarItem>
          <Link to="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/devices">Devices</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/shortcuts">Shortcuts</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/settings">Settings</Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
};
