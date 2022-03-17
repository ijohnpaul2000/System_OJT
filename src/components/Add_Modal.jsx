import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import {
  Modal,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  FormGroup,
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
  // const [member_a, setMember_a] = useState("");
  // const [member_c, setMember_c] = useState("");
  // const [member_d, setMember_d] = useState("");

  const [panel_a, setPanel_a] = useState("");
  // const [panel_b, setPanel_b] = useState("");
  // const [panel_c, setPanel_c] = useState("");
  // const [panel_d, setPanel_d] = useState("");

  const [page, setPage] = useState("");
  const [course, setCourse] = useState("Information Technology");

  let navigate = useNavigate();

  const handleClose = () => setShow(!show);

  //For reset form
  const resetForm = () => {
    document.getElementById("addFormId").reset();
  };

  //Add Data to Firestore
  const addThesisData = () => {
    const data = {
      title: title,
      adviser: adviser,
      abstract: abstract,
      pages: page,
      course: course,
    };
    const newThesisRef = doc(collection(db, "thesisContent"));

    data.thesisId = newThesisRef.id;

    setDoc(newThesisRef, data)
      .then(() => {
        //This will split the data inside the text area
        const res_member = member_a.trim().split("\n");
        const res_panel = panel_a.trim().split("\n");

        res_member.forEach(async (element) => {
          const thesisMembers = doc(db, "thesisContent", newThesisRef.id);

          // Atomically add a new region to the "members" array field.
          await updateDoc(thesisMembers, {
            members: arrayUnion(element),
          })
            .then(() => {
              console.log("Members Added Successfully");

              res_panel.forEach(async (element) => {
                const thesisMembers = doc(db, "thesisContent", newThesisRef.id);

                // Atomically add a new region to the "panels" array field.
                await updateDoc(thesisMembers, {
                  panels: arrayUnion(element),
                })
                  .then(() => {
                    console.log("Panels Added Successfully");
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              });
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
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
  };

  // const listMembers = () => {

  //   const res = abstract.trim().split("\n")

  //   //console.log(res);

  //   res.forEach( async (element) => {
  //     const thesisMembers = doc(db, "thesisContent", "V4XFX2NWwQF7sDSpQCc5");

  //     // Atomically add a new region to the "members" array field.
  //     await updateDoc(thesisMembers, {
  //       members: arrayUnion(element)
  //     });

  //   });
  // }

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
                    rows={3}
                    required
                  />
                  <Form.Text className="text-muted">
                    Names must be entered in separate new line.
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
                    rows={3}
                    required
                  />
                  <Form.Text className="text-muted">
                    Names must be entered in separate new line.
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
            <Button type="Submit">Add Content</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Add_Modal;
