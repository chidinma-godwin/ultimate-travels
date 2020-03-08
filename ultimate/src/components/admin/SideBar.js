import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <Menu isOpen={true} noOverlay width={"240px"} disableAutoFocus>
      <NavLink className="mr-3" to="/adminHome">
        Admin Home
      </NavLink>
      <NavLink className="mr-3 menu-item" to="/">
        Flights
      </NavLink>
      <NavLink className="mr-3 menu-item" to="/">
        Visa Applications
      </NavLink>
      <NavLink className="mr-3 menu-item" to="/">
        Flight Deals
      </NavLink>
      <NavLink className="mr-3 menu-item" to="/">
        Tours
      </NavLink>
    </Menu>
  );
};

export default SideBar;
