import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import { doc, collection } from "firebase/firestore";
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

  const [course, setCourse] = useState("Information Technology");
  const [section, setSection] = useState("3-1");
  const [yearPublished, setYearPublished] = useState("");

  const [authors, setAuthors] = useState("");
  const [panelists, setPanelists] = useState("");

  const [noOfCopies, setNoOfCopies] = useState("");
  const [volumeNo, setVolumeNo] = useState("");
  const [grades, setGrades] = useState("");

  const [keywords, setKeywords] = useState("");

  const [adviser, setAdviser] = useState("");
  const [chairperson, setChairperson] = useState("");
  const [dean, setDean] = useState("");

  const [abstract, setAbstract] = useState("");

  // const [member_a, setMember_a] = useState("");
  // const [page, setPage] = useState("");

  let navigate = useNavigate();

  //Toast Controller
  const notifySuccess = () =>
    toast.success("Success! New Data was added", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => handleClose(),
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
      course: course,
      section: section,
      yearPublished: yearPublished,
      authors: authors,
      panelists: panelists,
      noOfCopies: noOfCopies,
      volumeNo: volumeNo,
      grades: grades,
      keywords: keywords,
      adviser: adviser,
      chairperson: chairperson,
      dean: dean,
      abstract: abstract,
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
    <div className="container">
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
        dialogClassName="AddModal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            id="addFormId"
            onSubmit={handleAddForm}
          >
            <Row>
              <Col md={7} sm={12}>
                {" "}
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
                <Row>
                  <Col>
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
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Section</Form.Label>
                      <Form.Select
                        onChange={(e) => setSection(e.target.value)}
                        value={section}
                      >
                        <option>3-1</option>
                        <option>3-2</option>
                        <option>3-3</option>
                        <option>4-1</option>
                        <option>4-2</option>
                        <option>4-3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>{" "}
                  <Col>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Year Published</Form.Label>
                      <Form.Select
                        onChange={(e) => setYearPublished(e.target.value)}
                        value={yearPublished}
                      >
                        <option>2013</option>
                        <option>2014</option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-2">
                      <Form.Label htmlFor="basic-url">Authors</Form.Label>
                      <Form.Control
                        as="textarea"
                        onChange={(e) => setAuthors(e.target.value)}
                        placeholder="Authors"
                        rows={2}
                        required
                      />
                      <Form.Text className="text-muted">
                        Names must be separated by a comma. (e.g. Member A,
                        Member B)
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Please enter atleast 1 member.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Panelists</Form.Label>
                      <Form.Control
                        as="textarea"
                        type="text"
                        onChange={(e) => setPanelists(e.target.value)}
                        placeholder="Panelists"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Panelist.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>No. Of Copies</Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e) => setNoOfCopies(e.target.value)}
                        placeholder="Number of Copies"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Number of Copies.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Volume Number</Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e) => setVolumeNo(e.target.value)}
                        placeholder="Volume Number"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Volume Number.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    {" "}
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Grades</Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e) => setGrades(e.target.value)}
                        placeholder="Grades"
                        required
                        min={1}
                        max={100}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid Grade (1-100).
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group as={Col} controlId="formGridAdviser">
                  <Form.Label>Keywords</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Keywords"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a Keyword.
                  </Form.Control.Feedback>
                </Form.Group>{" "}
                <Row>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Adviser</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setAdviser(e.target.value)}
                        placeholder="Adviser"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Adviser.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Chairperson</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setChairperson(e.target.value)}
                        placeholder="Chairperson"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Chairperson.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>{" "}
                <Row>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Dean</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setDean(e.target.value)}
                        placeholder="Dean"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Dean.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                </Row>
              </Col>
              <Col md={5} className="h-auto">
                <Form.Group
                  className="mb-3 abstract"
                  controlId="formGridAbstract"
                >
                  <Form.Label>Abstract</Form.Label>
                  <Form.Control
                    as="textarea"
                    onChange={(e) => setAbstract(e.target.value)}
                    rows={10}
                    placeholder="Enter Abstract Details"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Abstract Details.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex mt-4 justify-content-end align-items-center">
              <Button type="Submit">Add Details</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Add_Modal;
