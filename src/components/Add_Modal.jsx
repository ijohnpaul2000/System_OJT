import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import {
  Modal,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import thesisService from "../services/thesis.service";

const Add_Modal = () => {
  //Use States for Modal
  const [show, setShow] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [validated, setValidated] = useState(false);

  //Use States for Thesis Content
  const [title, setTitle] = useState("");
  const [adviser, setAdviser] = useState("");
  const [abstract, setAbstract] = useState("");
  const [member_a, setMember_a] = useState("");
  const [panel_a, setPanel_a] = useState("");
  const [page, setPage] = useState("");
  const [course, setCourse] = useState("Information Technology");

  let navigate = useNavigate();

  //Toast Controller
  const notifySuccess = () =>
    toast.success("Success! New Data was added", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => handleClose()
    });

  const handleClose = () => {
    setShow(!show);
    window.location.reload();
  };

  //For reset form
  const resetForm = () => {
    document.getElementById("addFormId").reset();
  };

  //Add Data to Firestore
  const addThesisData = async () => {
    const data = {
      title: title,
      adviser: adviser,
      abstract: abstract,
      members: member_a,
      panels: panel_a,
      pages: page,
      course: course,
    };
    const newThesisRef = doc(collection(db, "thesisContent"));

    data.thesisId = newThesisRef.id;

    await thesisService.addThesis(data);

  };

  //Submit Function
  const handleAddForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      console.log("Inputs invalid");
      setValidated(true);
      return;
    }

    addThesisData();
    resetForm();
    setValidated(false);
    notifySuccess();
  };

  return ReactDom.createPortal(
    <div>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
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
          <Form
            noValidate
            validated={validated}
            id="addFormId"
            onSubmit={handleAddForm}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a title.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAdviser">
                <Form.Label>Adviser</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setAdviser(e.target.value)}
                  placeholder="Name of Adviser"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter an Adviser.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAbstract">
              <Form.Label>Abstract</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setAbstract(e.target.value)}
                rows={3}
                placeholder="Enter Abstract Details"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter Abstract Details.
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="basic-url">Proponents Name</Form.Label>
                  <Form.Control
                    as="textarea"
                    onChange={(e) => setMember_a(e.target.value)}
                    placeholder="Proponents"
                    rows={2}
                    required
                  />
                  <Form.Text className="text-muted">
                    Names must be separated by a comma. (e.g. Member A, Member
                    B)
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please enter atleast 1 member.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="basic-url">Panel Name</Form.Label>
                  <Form.Control
                    as="textarea"
                    onChange={(e) => setPanel_a(e.target.value)}
                    placeholder="Panelists"
                    rows={2}
                    required
                  />
                  <Form.Text className="text-muted">
                    Names must be separated by a comma. (e.g. Panel A, Panel B)
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please enter atleast 1 panel.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Pages</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setPage(e.target.value)}
                  placeholder="No. of Pages"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter Page No.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Course</Form.Label>
                <Form.Select
                  onChange={(e) => setCourse(e.target.value)}
                  value={course}
                >
                  <option>Information Technology</option>
                  <option>Engineering</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Button type="Submit">Add Details</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Add_Modal;
