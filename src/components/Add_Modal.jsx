import React, { useState } from "react";
import ReactDom from "react-dom";
import { Modal, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Add_Modal = () => {

  //Use States for Modal
  const [show, setShow] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  //Use States for Thesis Content
  const [title, setTitle] = useState("");
  const [adviser, setAdviser] = useState("");
  const [abstract, setAbstract] = useState("");

  const [member_a, setMember_a] = useState("");
  const [member_b, setMember_b] = useState("");
  const [member_c, setMember_c] = useState("");
  const [member_d, setMember_d] = useState("");

  const [panel_a, setPanel_a] = useState("");
  const [panel_b, setPanel_b] = useState("");
  const [panel_c, setPanel_c] = useState("");
  const [panel_d, setPanel_d] = useState("");

  const [page, setPage] = useState("");
  const [course, setCourse] = useState("")


  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  //For reset form
  const resetForm = () => {
    document.getElementById("addFormId").reset();
  }

  //Add Data to Firestore
  const addThesisData = async () => {

    const data = {
      title: title,
      adviser: adviser,
      abstract: abstract,
      memberA: member_a,
      memberB: member_b,
      memberC: member_c,
      memberD: member_d,
      panelA: panel_a,
      panelB: panel_b,
      panelC: panel_c,
      panelD: panel_d,
      pages: page     
    }

    const newThesisRef = doc(collection(db, "thesisContent"));

    data.thesisId = newThesisRef.id;

    await setDoc(newThesisRef, data)
    .then(() => {
      console.log("Data was added." + newThesisRef.id);
    }).catch((error) => {
      console.log(error.message);
    })
  }

  //Submit Function
  const handleAddForm = (event) => {
    event.preventDefault();

    addThesisData();

    resetForm();
  };


  return ReactDom.createPortal(
    <div>
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
            Add Thesis Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addFormId" onSubmit={handleAddForm}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAdviser">
                <Form.Label>Adviser</Form.Label>
                <Form.Control type="text" onChange={(e) => setAdviser(e.target.value)} placeholder="Name of Adviser" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAbstract">
              <Form.Label>Abstract</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setAbstract(e.target.value)}
                rows={3}
                placeholder="Enter Abstract Details"
              />
            </Form.Group>

            <Row className="mb-3">
                <Col>
                    <Form.Label htmlFor="basic-url">Proponents Name</Form.Label>
                    <InputGroup className="mb-2">
                        <Form.Control type="text" onChange={(e) => setMember_a(e.target.value)} placeholder="Member 1" /> 
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <Form.Control type="text" onChange={(e) => setMember_b(e.target.value)} placeholder="Member 2" />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <Form.Control type="text" onChange={(e) => setMember_c(e.target.value)} placeholder="Member 3" />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <Form.Control type="text" onChange={(e) => setMember_d(e.target.value)} placeholder="Member 4" />
                    </InputGroup>
                </Col>
                <Col>
                    <Form.Label htmlFor="basic-url">Panel Name</Form.Label>
                    <InputGroup className="mb-2">
                        <Form.Control type="text" onChange={(e) => setPanel_a(e.target.value)} placeholder="Panel 1" /> 
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <Form.Control type="text" onChange={(e) => setPanel_b(e.target.value)} placeholder="Panel 2" />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <Form.Control type="text" onChange={(e) => setPanel_c(e.target.value)} placeholder="Panel 3" />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <Form.Control type="text" onChange={(e) => setPanel_d(e.target.value)} placeholder="Panel 4" />
                    </InputGroup>
                </Col>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Pages</Form.Label>
                <Form.Control type="number" onChange={(e) => setPage(e.target.value)} placeholder="No. of Pages" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Course</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Information Technology</option>
                  <option>Engineering</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Button type="submit">Add Content</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Add_Modal;
