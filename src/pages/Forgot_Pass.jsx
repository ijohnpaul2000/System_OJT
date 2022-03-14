import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import logo from "../assets/forgot_pass.png";
import Navigationbar from "../components/NavigationBar";

const ForgotPassword = ({ setIsAuth }) => {
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { submitResetPassword } = useUserAuth();

  const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const timeout = () => {
    navigate("/login");
  };
  const submitNewPassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      //Successfull promise
      if (newPassword === confirmNewPassword) {
        await submitResetPassword(query.get("oobCode"), newPassword);
        setTimeout(timeout, 2000);
        setIsSuccess(true);
      }
      //frontend errors
      else if (newPassword !== confirmNewPassword) {
        setError("Passwords do not match.");
      } else if (newPassword.length < 7 || confirmNewPassword < 7) {
        setError("Please enter a strong password.");
      }
    } catch (err) {
      setError(err.code);
      //backend errors
      switch (err.code) {
        case "invalid-action-code":
          setError("Reset password link expired.");
          break;
      }
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
            className="forgotpass_container d-flex justify-content-center flex-column"
          >
            <div className="image-fluid mb-4  d-flex justify-content-center align-content-center">
              <img src={logo} alt="PLV Logo" className="resetpass-logo" />
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
            className="forgotpass_container d-flex justify-content-center flex-column"
          >
            <div className="p-4 box">
              <p className="resetpassword mb-3">Reset Password</p>
              <p className="sub_title mb-3">
                Your new password must be different to your previous passwords.
              </p>
              {isSuccess && (
                <Alert variant="success">Success! Redirecting...</Alert>
              )}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={submitNewPassword}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Text className="form-header">Password</Form.Text>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="input mt-2"
                    value={newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
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
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
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
