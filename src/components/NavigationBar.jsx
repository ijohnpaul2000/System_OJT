import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const Navigationbar = () => {
  return (
    <Navbar bg="light" expand="md" className="navbar-container">
      <Container fluid="md">
        <Link to="/" className="brand">
          <Navbar.Brand>
            CEIT Manuscript <br />
            Information System
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle className="navbar-toggler" />
        <Navbar.Collapse>
          <Nav className="ms-auto d-flex justify-content-end mt-4 align-items-center">
            <Link
              to="/guest"
              className="link link_guest mr-4 d-flex justify-content-end align-items-end"
            >
              Guest Login
            </Link>

            <Link to="/login" className="link link_user">
              Login
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
