import React, { useState } from "react";
import {
  Button,
  Modal,
  Col,
  Row,
  Container,
  Form,
  Alert,
} from "react-bootstrap";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/forgot_pass.png";
import { useUserAuth } from "../context/UserAuthContext";

import "react-toastify/dist/ReactToastify.css";

const ForgotPass_Modal = () => {
  const [show, setShow] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState("");

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  const handleShow = () => setShow(false);
  const navigate = useNavigate();

  const { resetPassword } = useUserAuth();
  const [error, setError] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const timeout = () => {
    navigate("/");
    navigate("/login");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(email);
      console.log("After resetPassword :");

      setIsSuccess(true);

      console.log("success? : " + isSuccess);
      if (isSuccess) {
        setTimeout(timeout, 2000);
      }
    } catch (err) {
      setIsSuccess(false);
      setError(err.code);

      //Error Validation
      switch (err.code) {
        case "auth/wrong-password":
          setError("Incorrect Password.");
          break;
        case "auth/user-not-found":
          setError("User not found.");
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
  return ReactDom.createPortal(
    <div>
      <Modal show={show} keyboard={false} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Container fluid="md">
          <Col
            sm={12}
            className="d-flex flex-column justify-content-center align-items-center text-center mb-5 mt-5"
          >
            <img
              src={logo}
              className="ForgotPass_Modal-logo img-fluid w-50 h-50 "
            />
            <h1 className="fp_header">Forgot Password</h1>
            <p className="fp_description">
              Don't worry! It happens. Please enter the email address associated
              with your account.
            </p>
            <Form className="w-75" onSubmit={handleResetPassword}>
              <Form.Control
                type="email"
                placeholder="@ Email Address"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="fpass_btn my-5" type="Submit">
                Submit
              </Button>
              <br />
              {isSuccess && (
                <Alert variant="success">
                  Check your email and follow for further instructions!
                </Alert>
              )}
              {error && <Alert variant="danger">{error}</Alert>}
            </Form>
          </Col>
        </Container>{" "}
      </Modal>{" "}
    </div>,
    document.getElementById("modal-root")
  );
};

export default ForgotPass_Modal;
