import React from "react";
import { Container } from "react-bootstrap";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <Container fluid="md">
      <div
        className="footer_container d-flex
      justify-content-center
      justify-content-sm-center
      "
      >
        Copyright &copy; {year} Pamantasan ng Lungsod ng Valenzuela. All rights
        reserved.
      </div>
    </Container>
  );
};

export default Footer;
