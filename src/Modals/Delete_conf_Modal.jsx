import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Modal, Button } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import thesisService from "../services/thesis.service";

const Delete_conf_Modal = ({modalToggle, thesisTitle}) => {
  const [show, setShow] = useState(true);

  //Magic Rerenderer AHAHAHAAA
  const handleClose = () => {
    setShow(!show);
    window.location.reload();
  };

  //Deletion
  const handleDelete = async () => {
    await thesisService.deleteThesis(modalToggle);
    handleClose();
  }

  return (
    <Modal
      show={show}
      keyboard={false}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete <strong>{thesisTitle}</strong>??</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Delete_conf_Modal;
