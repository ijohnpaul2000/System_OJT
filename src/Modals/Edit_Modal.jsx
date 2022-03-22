import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { Modal, Row, Col, Button, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
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
import "../sass/modals/_editmodal.scss";

const Edit_Modal = ({ modalToggle, singleThesis }) => {
  //Use States for Modal
  const [show, setShow] = useState(true);
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

  //Edit Mode
  const [checked, setChecked] = useState(false)

  //Toast Controller
  const notifySuccess = () =>
    toast.success("Success! The Data is updated", {
      position: "top-center",
      autoClose: 2000,
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
    document.getElementById("updateFormId").reset();
  };

  //Update Data to Firestore
  const updateThesisData = async () => {
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
    //const newThesisRef = doc(collection(db, "thesisContent"));

    try {
      await thesisService.updateThesis(modalToggle, data);
      console.log("updated data : " + data);
    } catch (error) {
      console.log(error);
    }
  };

  const setData = () => {
    setTitle(singleThesis.title);
    setCourse(singleThesis.course);
    setSection(singleThesis.section);
    setYearPublished(singleThesis.year);
    setAuthors(singleThesis.authors);
    setPanelists(singleThesis.panelists);
    setNoOfCopies(singleThesis.noOfCopies);
    setVolumeNo(singleThesis.volumeNo);
    setGrades(singleThesis.grades);
    setKeywords(singleThesis.keywords);
    setAdviser(singleThesis.adviser);
    setChairperson(singleThesis.chairperson);
    setDean(singleThesis.dean);
    setAbstract(singleThesis.abstract);
  }

  useEffect(() => {
    setData();
  }, [])
  


  //Submit Function
  const handleUpdateForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      console.log("Inputs invalid");
      setValidated(true);
      return;
    }

    updateThesisData();
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
            id="updateFormId"
            onSubmit={handleUpdateForm}
          >
          <fieldset disabled={!checked}>
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
                    value={title}
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
                        value={authors}
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
                        value={panelists}
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
                        min={1}
                        onChange={(e) => setNoOfCopies(e.target.value)}
                        placeholder="Number of Copies"
                        required
                        value={noOfCopies}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter valid number.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Volume Number</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        onChange={(e) => setVolumeNo(e.target.value)}
                        placeholder="Volume Number"
                        required
                        value={volumeNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter valid Volume Number.
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
                        step={0.01}
                        min={1}
                        max={5}
                        value={grades}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid Grade (1.00-5.00).
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
                    value={keywords}
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
                        value={adviser}
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
                        value={chairperson}
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
                        value={dean}
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
                    value={abstract}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Abstract Details.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </fieldset>
            <Row className="mt-3">
              <Col>
                <ButtonGroup>
                  <ToggleButton
                    id="toggle-check"
                    type="checkbox"
                    variant={checked ? "danger" : "primary"}
                    checked={checked}
                    value="1"
                    onChange={(e) => setChecked(e.currentTarget.checked)}
                  >
                    {checked ? 'Cancel Editing' : 'Edit'}
                  </ToggleButton>
                  <Button
                    type="Submit"
                    variant="success"
                    className={checked ? "visibleEl" : "hiddenEl"}
                  >
                    Save Changes
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Form>
            {/* <Row>
              <Col
                lg={6}
                className="d-flex mt-4 justify-content-center align-items-center"
              >
                <Col lg={12} className="d-flex mr-4">
                  <Form.Label>Do you want to edit this thesis?</Form.Label>
                  <Button>Yes</Button>
                </Col>
              </Col>
              <Col
                lg={6}
                className="d-flex mt-4 justify-content-end align-items-center"
              >
                <Button type="submit">Update Details</Button>
              </Col>
            </Row> */}
        </Modal.Body>
      </Modal>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Edit_Modal;
