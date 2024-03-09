import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export const NavBar = ({ isAuth, signUserOut }) => (
  <Navbar
    collapseOnSelect
    expand="lg"
    className="bg-body-tertiary"
    id="container"
  >
    <Container>
      <Navbar.Brand as={Link} to="/">
        QRifyMe
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>

          {isAuth ? (
            <>
              <Nav.Link as={Link} to="/studentdetails">
                Student Details
              </Nav.Link>
              <Nav.Link as={Link} to="/automobiles">
                Automobiles
              </Nav.Link>
              <Nav.Link as={Link} to="/healthcare">
                Health Care
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/Scanner">
                Scanner
              </Nav.Link> */}
            </>
          ) : null}
        </Nav>
        <div>
          {isAuth ? (
            <button className="btn btn-primary" onClick={signUserOut}>
              Logout
            </button>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                columnGap: "10px",
              }}
            >
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </div>
          )}
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
