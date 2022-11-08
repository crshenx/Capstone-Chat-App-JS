import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";

export default function NavMenu({
  isMenuOpen,
  handleMenuClose,
  anchorEl,
  menuId,
  navigateProfile,
}) {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={navigateProfile}>Profile</MenuItem>
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          auth.logout();
          navigate("/login");
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );
}
