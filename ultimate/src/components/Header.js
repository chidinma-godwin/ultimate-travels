import React from "react";
import logo from "../images/logo.svg";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, ButtonGroup, Dropdown } from "react-bootstrap";

const Header = props => {
  return (
    <React.Fragment>
      <Navbar variant="dark" expand="lg" className="main-nav">
        <Container>
          <Navbar.Brand href="/" className="d-flex">
            <img
              alt=""
              src={logo}
              width="64"
              // height="64"
              className="d-inline-block align-top mr-4"
            />
            <span className="align-self-center">Ultimate Travels</span>
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
                  NGN
                </Dropdown.Item>
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
    </React.Fragment>
  );
};

export default Header;
