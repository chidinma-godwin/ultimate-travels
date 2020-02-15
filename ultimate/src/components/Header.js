import React from "react";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, ButtonGroup, Dropdown } from "react-bootstrap";

const Header = props => {
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
                  className="mr-3 header-link"
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto"
                  }}
                  to="/"
                >
                  Home
                </NavLink>
                <Nav.Link className="mr-3 header-link" href="#contact">
                  Contact
                </Nav.Link>
              </Nav>

              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle
                  id="currency"
                  variant="default"
                  className="text-light p-0 header-link"
                >
                  {props.currency}
                </Dropdown.Toggle>
                <Dropdown.Menu className="currency-btn">
                  <Dropdown.Item
                    onClick={evt =>
                      props.handleCurrencyToggle(evt.target.textContent)
                    }
                  >
                    USD
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={evt =>
                      props.handleCurrencyToggle(evt.target.textContent)
                    }
                  >
                    GBP
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={evt =>
                      props.handleCurrencyToggle(evt.target.textContent)
                    }
                  >
                    EUR
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={evt =>
                      props.handleCurrencyToggle(evt.target.textContent)
                    }
                  >
                    CAD
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </React.Fragment>
  );
};

export default Header;
