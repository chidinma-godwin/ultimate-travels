import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    };
  }

  isMenuOpen = (state) => {
    this.setState({
      menuOpen: state.isOpen,
    });
  };

  render() {
    let menuClass;
    if (this.state.menuOpen) menuClass = "burger-menu-open";

    return (
      <Menu
        noOverlay
        width={"240px"}
        disableAutoFocus
        onStateChange={this.isMenuOpen}
        className={menuClass}
      >
        <NavLink className="mr-3" to={`${this.props.url}/dashboard`}>
          Dashboard
        </NavLink>
        <NavLink
          className="mr-3 menu-item"
          to={`${this.props.url}/admin/travelers`}
        >
          Flights
        </NavLink>
        <NavLink className="mr-3 menu-item" to="/">
          Visa Applications
        </NavLink>
        <NavLink
          className="mr-3 menu-item"
          to={`${this.props.url}/admin/travelers`}
        >
          Flight Deals
        </NavLink>
        <NavLink
          className="mr-3 menu-item"
          to={`${this.props.url}/admin/show-tour`}
        >
          Tours
        </NavLink>
      </Menu>
    );
  }
}

export default SideBar;
