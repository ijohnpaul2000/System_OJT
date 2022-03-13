import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import folder_logo from "../assets/folder_logo.png";
import Footer from "../components/Footer";
import Navigationbar from "../components/NavigationBar";
const Landing = () => {
  return (
    <>
      {" "}
      <Navigationbar />
      <Container
        fluid="md"
        className="container_landing mt-5 d-flex justify-content-center align-items-center"
      >
        <Row s={6} md={12}>
          <Col
            s={12}
            md={6}
            className="d-sm-flex flex-column justify-content-center align-items-start"
          >
            <h1 className="title">CEIT Manuscript Information System</h1>
            <p className="description">
              We aim to keep and provide a clean track of information about the
              past and incoming capstone research mansucripts created by
              Pamantasan ng Lungsod ng Valenzuela's CEIT students.
            </p>
          </Col>
          <Col
            s={12}
            md={6}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <img
              src={folder_logo}
              alt="folder_logo"
              className="landing-logo img-fluid"
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Landing;
