import React, { useState, useRef } from "react";
import { Form, Button, Container, Col, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/login.png";
import { generateOTP } from "./Manuscript";
import Navigationbar from "../components/NavigationBar";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { compileStringAsync } from "sass";

const Guest = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState("");

  const timeout = () => {
    navigate("/manuscript");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (email === "userguestmanuscript@gmail.com") {
        await logIn(email, password);
        setSuccess("Success! Redirecting...");
        setTimeout(timeout, 2000);
      } else {
        setError("You can't use this email address");
        console.log("You can't use this email address");
      }
    } catch (err) {
      //Error Validation
      console.log("this is the error: " + err);
      switch (err.code) {
        case "auth/wrong-password":
          setError("Incorrect Password");
          break;
        case "auth/user-not-found":
          setError("User not found");
          break;
        case "auth/network-request-failed":
          setError("Network connection failed.");
          break;
        default:
          setError("Error found. Try again later.");
          break;
      }
    }
  };
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
              Before you can have an official guest access to CEIT Manuscript
              Information System, you may request and get the{" "}
              <strong>Email & Password</strong> from the <strong>dean</strong>{" "}
              or <strong>chairperson</strong> of the CEIT Department.
            </p>
            <p className="sub_title text-start">
              Once you already have the <strong>credentials</strong> from the
              Dean or Chairperson of the CEIT Department, please enter the{" "}
              <strong>credentials</strong> below.
            </p>
            <Form onSubmit={handleSubmit}>
              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="form-header">Email Address</Form.Text>
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  className="input mt-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Text className="form-header">Password</Form.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="input mt-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2 d-flex justify-content-end">
                <Button
                  variant="primary"
                  type="Submit"
                  className="landing-btns"
                >
                  Log In
                </Button>
              </div>{" "}
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
