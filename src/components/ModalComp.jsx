import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Modal, Container, Col, Button, Form } from 'react-bootstrap';


const ModalComp = () => {
  const [show, setShow] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  return ReactDom.createPortal(
    <div>
     <Modal show={show}  onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>,
    document.getElementById('modal')
  );
}

export default ModalComp;