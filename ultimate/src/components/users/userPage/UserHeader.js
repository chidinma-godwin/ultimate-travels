import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import logo from "../../../images/logo.svg";

const UserHeader = (props) => {
  return (
    <Navbar
      variant="dark"
      fixed="top"
      className="main-nav"
      style={{ height: "4rem" }}
    >
      <Container fluid className="pt-3 pb-3">
        <Navbar.Brand
          href="#"
          style={{ marginLeft: "1.8em" }}
        >{`Hi ${props.username}`}</Navbar.Brand>
        <Nav
          style={{
            maxWidth: "fit-content",
            marginLeft: "auto",
            fontSize: "1em",
          }}
        >
          {/* <NavLink className="mr-3 header-link" to="#">
            <span>
              {" "}
              <FontAwesomeIcon
                icon={["fas", "bell"]}
                className="mr-2"
                size="lg"
              />
              Notifications
            </span>
          </NavLink> */}
          <NavLink className="mr-3 header-link" to="/contact">
            <FontAwesomeIcon
              icon={["fas", "user-circle"]}
              className="mr-2"
              size="lg"
            />
          </NavLink>
          <NavLink className="mr-3 header-link" to="#">
            <FontAwesomeIcon
              icon={["fas", "redo"]}
              className="mr-2"
              size="lg"
            />
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default UserHeader;
