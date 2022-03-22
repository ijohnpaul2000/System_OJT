import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Modal, Button } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import thesisService from "../services/thesis.service";

const View_Modal = ({ modalToggle, singleThesis }) => {
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
  };

  //Update, bahala ka na dito boss
  const handleUpdate = () => {};

  useEffect(() => {
    console.log(singleThesis);
  }, []);

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
        <Modal.Title id="contained-modal-title-vcenter">
          {singleThesis.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Authors :</h5>
        <p>{singleThesis.authors}</p>
        <h5>Panelists :</h5>
        <p>{singleThesis.panelists}</p>
        <h5>Section :</h5>
        <p>{singleThesis.section}</p>
        <h5>Abstract : </h5>
        <p>{singleThesis.abstract}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default View_Modal;
