import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to={{ pathname: "/home" }}>QRifyMe</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={{ pathname: "/studentdetails" }}>
                Student Details
              </Nav.Link>
              <Nav.Link as={Link} to={{ pathname: "/Automobiles" }}>
                Automobiles
              </Nav.Link>
              <Nav.Link as={Link} to={{ pathname: "/HealthCare" }} Link="">
                Health Care
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
