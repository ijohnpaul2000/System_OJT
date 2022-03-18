import React, { useState } from 'react'
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

const Edit_Modal = () => {

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

    const handleClose = () => setShow(!show);

    //For reset form
    const resetForm = () => {
        document.getElementById("addFormId").reset();
    };

    const handleUpdateForm = () => {

    }
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
                        Update Thesis Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={validated}
                        id="addFormId"
                        onSubmit={handleUpdateForm}
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
}

export default Edit_Modal