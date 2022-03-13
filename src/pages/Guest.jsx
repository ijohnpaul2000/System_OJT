import React from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/login.png";
import { generateOTP } from "./Manuscript";
import Navigationbar from "../components/NavigationBar";

const Guest = () => {
  return (
    <>
      <Navigationbar />

      <Container fluid="sm" className="guest_container">
        <Row>
          <Col
            sm={12}
            md={6}
            className="landing_container d-flex justify-content-center flex-column"
          >
            <h2 className="login">Guest Login</h2>
            <p className="sub_title text-start">
              Before you can have an official guest access to CEIT Manuscrip
              Information System, you may request and One-Time-Password(OTP)
              from the dean or chairperson of the CEIT Department.
            </p>
            <p className="sub_title text-start">
              Once you already have the OTP from the Dean or Chairperson of the
              CEIT Department, please enter the OTP below.
            </p>
            <Form className="mt-4">
              <Row>
                <Form.Label className="label d-flex justify-content-mb-start">
                  Enter Verification Code
                </Form.Label>
              </Row>
              <Row md={12}>
                <Form.Group className="group d-flex flex-row justify-content-center align-items-center ">
                  <Form.Control
                    className="me-lg-4 me-md-1 me-sm-4 me-2 text-center form-control rounded  otp_field"
                    type="text"
                    placeholder="*"
                    maxLength="1"
                    autoComplete="on"
                  />
                  <Form.Control
                    className="me-lg-4 me-md-1 me-sm-4 me-2 text-center form-control rounded  otp_field"
                    type="text"
                    placeholder="*"
                    maxLength="1"
                    autoComplete="on"
                  />
                  <Form.Control
                    className="me-lg-4 me-md-1 me-sm-4 me-2 text-center form-control rounded  otp_field"
                    type="text"
                    placeholder="*"
                    maxLength="1"
                    autoComplete="on"
                  />
                  <Form.Control
                    className="me-lg-4 me-md-1 me-sm-4 me-2 text-center form-control rounded  otp_field"
                    type="text"
                    placeholder="*"
                    maxLength="1"
                    autoComplete="on"
                  />
                </Form.Group>
              </Row>
              <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" type="submit">
                  Confirm OTP
                </Button>
              </div>
              <div className="line-container">
                <span className="or-txt">or</span>
              </div>
              <Link to="/Login" className="d-flex justify-content-center pt-4">
                <Button variant="primary" type="submit">
                  Login as User
                </Button>
              </Link>
            </Form>
          </Col>
          <Col
            sm={12}
            md={6}
            className="landing_container d-flex justify-content-center flex-column "
          >
            <div className="image-fluid mb-4  d-flex justify-content-center">
              <img src={logo} alt="PLV Logo" className="login-logo" />
            </div>
            <div className="text d-flex flex-column justify-content-center align-items-center">
              <div className="header mb-4 ">
                Browsing manuscripts made easier!
              </div>
              <div className="description">
                Forget flipping pages! You can search and download the research
                abstract of the manuscript you need using this system.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Guest;
