import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../images/logo.svg";

const AdminHeader = () => {
  return (
    <Navbar
      variant="dark"
      fixed="top"
      className="main-nav"
      style={{ height: "4rem" }}
    >
      <Container fluid className="pt-3 pb-3">
        <Nav
          style={{
            maxWidth: "fit-content",
            marginLeft: "auto",
            fontSize: "1em"
          }}
        >
          <NavLink className="mr-3 header-link" to="/contact">
            <span>
              {" "}
              <FontAwesomeIcon
                icon={["fas", "bell"]}
                className="mr-2"
                size="lg"
              />
              Notifications
            </span>
          </NavLink>
          <NavLink className="mr-3 header-link" to="/contact">
            <span>
              {" "}
              <FontAwesomeIcon
                icon={["fas", "user-circle"]}
                className="mr-2"
                size="lg"
              />
              Profile
            </span>
          </NavLink>
          <NavLink className="mr-3 header-link" to="/contact">
            <span>
              <FontAwesomeIcon
                icon={["fas", "redo"]}
                className="mr-2"
                size="lg"
              />
              Refresh
            </span>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
