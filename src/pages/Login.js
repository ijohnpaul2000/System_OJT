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
  const [success, setSuccess] = useState("");

  const timeout = () => {
    navigate("/manuscript");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (email !== "userguestmanuscript@gmail.com") {
        await logIn(email, password);
        setSuccess("Success! Redirecting...");
        setTimeout(timeout, 2000);
      } else {
        setError("You can't use this email address");
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
      <Container fluid="md" className="landing_container">
        <Row>
          <Col
            sm={12}
            md={6}
            className=" d-flex justify-content-center flex-column"
          >
            <div className="p-4 box">
              <p className="login mb-3">Login</p>
              <p className="sub_title mb-3">
                Hello there! Log in to continue and get started
              </p>
              {success && <Alert variant="success">{success}</Alert>}
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
