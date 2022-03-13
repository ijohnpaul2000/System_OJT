import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import logo from "../assets/forgot_pass.png";
import Navigationbar from "../components/NavigationBar";

const ForgotPassword = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/manuscript");
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    } catch (err) {
      setError(err.code);
    }
  };

  return (
    <>
      <Navigationbar />
      <Container fluid="md">
        <Row>
          <Col
            sm={12}
            md={6}
            className="landing_container d-flex justify-content-center flex-column"
          >
            <div className="image-fluid mb-4  d-flex justify-content-center">
              <img src={logo} alt="PLV Logo" className="login-logo" />
            </div>
            <div className="text d-flex flex-column justify-content-center align-items-center">
              <div className="header mb-4 ">
                Browsing manuscripts made easier!
              </div>
              <div className="description">
                Through CEIT Manuscript Information System, everything is made
                clean, less time-consuming and easy to maintain. Be sure to
                login to gain special permissions.
              </div>
            </div>
          </Col>
          <Col
            sm={12}
            md={6}
            className="landing_container d-flex justify-content-center flex-column "
          >
            {" "}
            <div className="p-4 box">
              <p className="login mb-3">Reset Password</p>
              <p className="sub_title mb-3">
                Your new password must be different to your previous passwords;
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Text className="form-header">Password</Form.Text>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="input mt-2"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Text className="form-header">
                    Confirm Password
                  </Form.Text>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
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
                    Set new password
                  </Button>
                </div>{" "}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPassword;
