"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { KeyboardArrowRight, PersonOutlineOutlined } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
    handleMenuClose();
  };

  return (
    <header className="navbar fixed left-0 top-0 w-full h-16 bg-indigo-900 text-white p-4 flex justify-between items-center font-[family-name:var(--font-jost-medium)] z-20">
      <h1 className="text-xl font-semibold">CleanCheck</h1>
      <button
        className="gap-2 px-4 py-2 rounded-full text-sm font-[family-name:var(--font-jost-medium)] hover:bg-opacity-80 bg-white"
        onClick={handleMenuOpen}
        style={{ color: "white" }}
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <PersonOutlineOutlined className="text-primary" />
        <KeyboardArrowRight className="text-primary" />
      </button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </header>
  );
};

export default Navbar;
