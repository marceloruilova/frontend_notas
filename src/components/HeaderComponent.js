import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import logo from "../logo.svg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar dark expand="md" id="grad1">
        <div className="container">
          <NavbarToggler onClick={toggle} />
          <Nav navbar>
            <NavbarBrand className="mr-auto" href="/">
              <NavItem>
                <NavLink to="/login">
                  <img
                    src={logo}
                    height="30"
                    width="41"
                    alt="Ristorante Con Fusion"
                  />
                </NavLink>
              </NavItem>
            </NavbarBrand>
            <Collapse isOpen={isOpen} navbar>
              <NavItem>
                <NavLink to="/login" style={{ padding: "5px" }}>
                  <span className="fa fa-home fa-lg"></span>Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/admin" style={{ padding: "5px" }}>
                  <span className="fa fa-info fa-lg"></span> Admin
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/home" style={{ padding: "5px" }}>
                  <span className="fa fa-list fa-lg"></span> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/calification" style={{ padding: "5px" }}>
                  <span className="fa fa-address-card fa-lg"></span>
                  Califications
                </NavLink>
              </NavItem>
            </Collapse>
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
