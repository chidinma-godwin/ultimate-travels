import React from "react";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

const Header = () => {
  return (
    <React.Fragment>
      <header>
        <div className="d-none d-lg-block top-nav">
          <ul className="nav nav-pills justify-content-around">
            <li>Contact us</li>
            <li>
              <a href="/">
                <FontAwesomeIcon
                  icon={["fab", "whatsapp-square"]}
                  className="mr-2"
                  style={{ color: "green" }}
                  size="lg"
                />
                +2348161128204, +2349026622600
              </a>
            </li>
            <li>
              <i>
                <FontAwesomeIcon
                  icon={["fas", "phone-alt"]}
                  className="mr-2"
                  style={{ color: "green" }}
                  size="lg"
                />
                +2348161128204, +2349026622600
              </i>
            </li>
            <li>
              <i>
                <FontAwesomeIcon
                  icon={["fas", "envelope"]}
                  className="mr-2"
                  size="lg"
                />
                ultimatetravelsltd@gmail.com
              </i>
            </li>
          </ul>
        </div>

        <Navbar variant="dark" expand="lg" className="main-nav">
          <Container>
            <Navbar.Brand href="/">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Ultimate Travels
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-md-auto">
                <NavLink
                  className="mr-3"
                  style={{
                    color: "white",
                    marginTop: "auto",
                    marginBottom: "auto"
                  }}
                  to="/"
                >
                  Home
                </NavLink>
                <Nav.Link className="mr-3" href="#contact">
                  Contact
                </Nav.Link>
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success" style={{ color: "white" }}>
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </React.Fragment>
  );
};

export default Header;
