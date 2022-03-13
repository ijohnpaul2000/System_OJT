import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import logo from "../assets/login.png";
import Navigationbar from "../components/NavigationBar";
import ForgotPassword from "./Forgot_Pass";
import Fp_Modal from "../components/Fp_Modal";

const Login = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/manuscript");
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
            <div className="p-4 box">
              <p className="login mb-3">Login</p>
              <p className="sub_title mb-3">
                Hello there! Log in to continue and get started
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
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
              <div className="line-container">
                <span className="or-txt">or</span>
              </div>

              <div className="d-grid gap-4 mt-4 d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="Submit"
                  className="landing-btns guest"
                >
                  <Link to="/guest" className="link_guest">
                    Login as Guest
                  </Link>
                </Button>
              </div>
            </div>
            <div className="p-4 box mt-3 text-center">
              Forgot Password?{" "}
              <button className="reset-btn" onClick={() => setShowModal(true)}>
                {" "}
                Reset your password.
                {showModal && <Fp_Modal />}
              </button>
            </div>
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
                Through CEIT Manuscript Information System, everything is made
                clean, less time-consuming and easy to maintain. Be sure to
                login to gain special permissions.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
