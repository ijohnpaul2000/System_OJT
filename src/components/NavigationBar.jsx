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
          <Nav className="ms-auto d-flex justify-content-center mt-4 align-items-end align-items-sm-end align-items-md-center align-items-lg-center align-items-xxl-center">
            <Link
              to="/guest"
              className="link link_guest mr-4 d-flex justify-content-end align-items-end pb-4 pb-sm-0 pb-md-0 pb-lg-0 pb-xxl-0"
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
