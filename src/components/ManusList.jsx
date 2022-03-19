import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import thesisService from "../services/thesis.service";
import { CSVLink, CSVDownload } from "react-csv";
import Options from "./Options";
import { render } from "@testing-library/react";
import Edit_Modal from "./Edit_Modal";

const ManusList = ({ getThesisId }) => {
  const [thesisData, setThesisData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //Rendering
  useEffect(() => {
    const getThesis = async () => {
      const data = await thesisService.getAllThesis();
      console.log(data.docs);
      setThesisData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(thesisData);
    };
    getThesis();
  }, []);

  //Delete handler
  const deleteHandler = async (id) => {
    await thesisService.deleteThesis(id);
  };

  const openUpdateModal = (id) => {
    setShowModal(true);
    //getThesisId(id);
  }

  return (
    <>
      {" "}
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Members</th>
            <th>Adviser</th>
            <th>Course</th>
            <th>Pages</th>
          </tr>
        </thead>
        <tbody>
          {thesisData.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>
                  {doc.members[0]}, {doc?.members[1]}
                </td>
                <td>{doc.adviser}</td>
                <td>{doc.course}</td>
                <td>{doc.pages}</td>
                <td className="m-1 text-center">
                  <Button
                    className="mb-1"
                    variant="secondary"
                    onClick={(e) => openUpdateModal(doc.id)}
                  >
                    <IconContext.Provider value={{ color: "#fff" }}>
                      <div>
                        <BsFillPencilFill />
                      </div>
                    </IconContext.Provider>
                  </Button>
                  <Button
                    className="mb-1"
                    variant="danger"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    <IconContext.Provider value={{ color: "#fff" }}>
                      <div>
                        <BsFillTrashFill />
                      </div>
                    </IconContext.Provider>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ManusList;
