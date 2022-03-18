import React, { useState } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Add_Modal from "../components/Add_Modal";
import { CSVLink, CSVDownload } from "react-csv";

const Options = (props) => {
  const [showModal, setShowModal] = useState();
  return (
    <>
      <Button className="settings-btns">Export Masterlist</Button>
      <Button className="settings-btns">Import Export Masterlist</Button>
      <Button
        className="settings-btns"
        onClick={() => {
          setShowModal(true);
          console.log("clicked");
        }}
      >
        Add Thesis
        {showModal && <Add_Modal />}
      </Button>

      <div className="dropdown-container">
        <Dropdown>
          <Dropdown.Toggle className="my-dropdown">Sort By</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className="d-flex flex-column justify-content-center align-items-end">
              Last Updated
            </Dropdown.Item>
            <Dropdown.Item className="d-flex flex-column justify-content-center align-items-end">
              First Updated
            </Dropdown.Item>
            <Dropdown.Item className="d-flex flex-column justify-content-center align-items-end">
              A to Z
            </Dropdown.Item>
            <Dropdown.Item className="d-flex flex-column justify-content-center align-items-end">
              Z to A
            </Dropdown.Item>
            <Dropdown.Item className="d-flex flex-column justify-content-center align-items-end">
              Year Published
            </Dropdown.Item>
            <Dropdown.Item className="d-flex flex-column justify-content-center align-items-end">
              Grade
            </Dropdown.Item>
            <Dropdown.Item className="d-flex flex-column justify-content-center align-items-end">
              Number of Copies
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default Options;
