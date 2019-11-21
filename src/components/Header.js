import React from "react";
import logo from './images/logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <React.Fragment>
      <header>
        <div className="d-none d-lg-block top-nav">
          <ul className="nav nav-pills justify-content-around">
            <li>Contact us</li>
            <li>
              <a href="/"><FontAwesomeIcon icon={['fab','whatsapp-square']} className="mr-2" style={{color: "green"}} size="lg" />+2348161128204, +2349026622600</a>
            </li>
            <li>
              <i><FontAwesomeIcon icon={['fas','phone-alt']} className="mr-2" style={{color: "green"}}　size="lg" />+2348161128204, +2349026622600</i>
            </li>
            <li>
              <i><FontAwesomeIcon icon={['fas','envelope']} className="mr-2"　size="lg" />ultimatetravelsltd@gmail.com</i>
            </li>
          </ul>
        </div>

        <nav className="navbar navbar-expand-lg navbar-dark main-nav">
          <div className="container">
        <a className="navbar-brand" href="/" style={{maxWidth: "3%"}}>
            <img src={logo} className="img-fluid mr-2" alt='ultimate travels logo'/> Ultimate Travels and Tours
        </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ml-md-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
