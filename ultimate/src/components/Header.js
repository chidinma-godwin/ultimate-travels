import React from "react";
import logo from "../images/logo.svg";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, Container, ButtonGroup, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  return (
    <Navbar variant="dark" expand="lg" className="main-nav">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex">
          <img
            alt=""
            src={logo}
            width="32"
            // height="64"
            // style={{ marginRight: "0.4em" }}
            className="d-inline-block align-top mr-4"
          />
          <span className="align-self-center">Ultimate Travels</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FontAwesomeIcon icon={["fas", "bars"]} size="lg" color="#fff" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-md-auto">
            <NavLink
              className="mr-3 header-link"
              style={{
                marginTop: "auto",
                marginBottom: "auto",
              }}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="mr-3 header-link"
              style={{
                marginTop: "auto",
                marginBottom: "auto",
              }}
              to="/login"
            >
              Login
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
                onClick={(evt) =>
                  props.handleCurrencyToggle(evt.target.textContent)
                }
              >
                NGN
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(evt) =>
                  props.handleCurrencyToggle(evt.target.textContent)
                }
              >
                USD
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(evt) =>
                  props.handleCurrencyToggle(evt.target.textContent)
                }
              >
                GBP
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(evt) =>
                  props.handleCurrencyToggle(evt.target.textContent)
                }
              >
                EUR
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(evt) =>
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
  );
};

export default Header;
