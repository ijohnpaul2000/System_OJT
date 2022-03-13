import React, { useState, useRef } from "react";
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
import { auth } from "../firebase";
import { useUserAuth } from "../context/UserAuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Fp_Modal = () => {
  const [show, setShow] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState("");

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  const handleShow = () => setShow(false);
  const navigate = useNavigate();

  const [errorCode, setErrorCode] = useState("");
  const [EmailError, setEmailError] = useState("");

  const { resetPassword } = useUserAuth();
  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);
  const notify = () => toast("Wow so easy!");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setError(err.code);
    }
    console.log(error);
  };

  return ReactDom.createPortal(
    <div>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Container fluid="md">
          <Col
            sm={12}
            className="d-flex flex-column justify-content-center align-items-center text-center mb-5 mt-5"
          >
            <img src={logo} className="fp_modal-logo img-fluid w-50 h-50 " />
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
              <Button
                className="fpass_btn my-5"
                type="Submit"
                onClick={() => (success ? notify() : "")}
              >
                Submit
              </Button>
              <br />
              {success && (
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

export default Fp_Modal;
