import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Button,
  Dropdown,
  DropdownButton,
  Table,
} from "react-bootstrap";
import { FaCog, FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import {
  query,
  collection,
  getDocs,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { db, auth } from "../firebase";
import logo from "../assets/folder_logo.png";
import Add_Modal from "../Modals/Add_Modal";
import { ToastContainer, toast } from "react-toastify";
import { CSVLink, CSVDownload } from "react-csv";
import "react-toastify/dist/ReactToastify.css";
import thesisService from "../services/thesis.service";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsFillEyeFill,
  BsTrash,
} from "react-icons/bs";
import Edit_Modal from "../Modals/Edit_Modal";
import Delete_Modal from "../Modals/Delete_conf_Modal";
import View_Modal from "../Modals/View_Modal";

//Material UI Imports
import { DataGrid } from "@mui/x-data-grid";

const Manuscript = ({ getThesisId }) => {
  //Use States
  const [userc, loading, error] = useAuthState(auth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const navigate = useNavigate();

  const [first, setfirst] = useState("");
  //for setting emails
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  // State CSVLink
  const [thesisData, setThesisData] = useState([]);

  // Get Thesis ID
  const [thesisId, setThesisId] = useState("");

  //Get Single Thesis Record
  const [singleThesis, setsingleThesis] = useState([]);

  //Get Thesis title
  const [title, setTitle] = useState("");

  const columns = [
    { field: "title", headerName: "Title", width: 200, flex: 2 },
    { field: "authors", headerName: "Authors", width: 200, flex: 2 },
    { field: "adviser", headerName: "Adviser", width: 200, flex: 2 },
    { field: "course", headerName: "Course", width: 180, flex: 2 },
    {
      field: "yearPublished",
      headerName: "Year Published",
      headerAlign: "left",
      type: "number",
      width: 40,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 20,
      flex: 1,
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <Button
            className="center-btn"
            variant="primary"
            onClick={(event) => {
              console.log(cellValues);
              console.log("selected thesis : " + cellValues.row.thesisId);
              openViewInfo(
                cellValues.row.id,
                cellValues.row.title,
                cellValues.row.course,
                cellValues.row.section,
                cellValues.row.authors,
                cellValues.row.panelists,
                cellValues.row.noOfCopies,
                cellValues.row.volumeNo,
                cellValues.row.grades,
                cellValues.row.keywords,
                cellValues.row.adviser,
                cellValues.row.chairperson,
                cellValues.row.dean,
                cellValues.row.abstract,
                cellValues.row.yearPublished
              );
            }}
          >
            <IconContext.Provider value={{ color: "#fff" }}>
              <div>
                <BsFillEyeFill />
              </div>
            </IconContext.Provider>
          </Button>
        );
      },
    },
  ];

  const notifySuccess = () =>
    toast.success("Success! Check the guest's email address.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifyError = () =>
    toast.error(errorMsg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  let component = "";

  const { logOut } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  //Get User ID
  const getAuthUser = () => {
    const authenticatedUser = getAuth();
    const currentUser = authenticatedUser.currentUser;

    if (currentUser) {
      console.log(currentUser.email);
      getUserData(currentUser.uid);
    } else {
      console.log("Sign Out");
    }
  };

  //Get User's Other Data
  const getUserData = async (currentUser) => {
    const docRef = doc(db, "users", currentUser);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data().firstName);
      setFirstName(docSnap.data().firstName);
      setLastName(docSnap.data().lastName);
      setEmail(docSnap.data().email);
      setRole(docSnap.data().roleName);
    } else {
      console.log("No Such Document");
    }
  };

  //Roles Bases Access
  if (role === "Admin") {
    component = <h1>Hello Admin</h1>;
  } else if (role === "Encoder") {
    component = <h1>Hello Encoder</h1>;
  }

  //Rendering
  useEffect(() => {
    if (loading) return;

    if (!userc) return navigate("/");

    getAuthUser();
  }, [userc, loading]);

  const resetGuestPassword = async () => {
    //userguestmanuscript@gmail.com
    try {
      await sendPasswordResetEmail(auth, "ralejom321@snece.com").then(() => {
        notifySuccess();
      });
    } catch (error) {
      notifyError();
      switch (error.code) {
        case "auth/wrong-password":
          setErrorMsg("Incorrect Password");
          break;
        case "auth/user-not-found":
          setErrorMsg("User not found");
          break;
        case "auth/network-request-failed":
          setErrorMsg("Network connection failed.");
          break;
        default:
          setErrorMsg("Error found. Try again later.");
          break;
      }
    }
  };
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

  const openUpdateModal = (id) => {
    setThesisId(id);
    setShowModalEdit(true);
  };

  const openDeleteModal = (id, title) => {
    setThesisId(id);
    setTitle(title);
    setShowModalDelete(true);
  };

  //Open View Info Modal
  const openViewInfo = (
    id,
    title,
    course,
    section,
    authors,
    panelists,
    noOfCopies,
    volumeNo,
    grades,
    keywords,
    adviser,
    chairperson,
    dean,
    abstract,
    year
  ) => {
    setThesisId(id);

    const data = {
      id,
      title,
      course,
      section,
      authors,
      panelists,
      noOfCopies,
      volumeNo,
      grades,
      keywords,
      adviser,
      chairperson,
      dean,
      abstract,
      year
    };
    setsingleThesis(data);
    setShowModalEdit(true);
  };

  return (
    <IconContext.Provider
      value={{
        backgroundColor: "#FFFFFF",
        color: "var(--accent-color2)",
        size: "1.5rem",
      }}
    >
      <p>Currenly Signed in as: {role} </p>

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
      <Container fluid="md" className="manuscript">
        <Row>
          <Col className="d-flex justify-content-end align-items-center">
            <DropdownButton id="dropdown-basic-button" title="Settings">
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              <Dropdown.Item onClick={resetGuestPassword}>
                Reset Guest Password
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <Col className="manuscript-text mb-4">Manuscript List</Col>
        </Row>

        <Row>
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="
            d-flex 
            justify-content-center 
            mt-sm-4
            mt-md-4
            mt-lg-0
            mt-xxl-0
            mb-4
            justify-content-lg-center
            align-items-center
            "
          >
            <CSVLink
              data={thesisData}
              className="settings-btns export d-flex justify-content-center text-center settings-btns align-items-center"
            >
              Export Masterlist
            </CSVLink>
            <Button className="settings-btns text-center ">
              Import Export Masterlist
            </Button>
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
          </Col>
        </Row>

        <Row>
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={thesisData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
            {showModalEdit && (
              <Edit_Modal singleThesis={singleThesis} modalToggle={thesisId} />
            )}
            {showModalDelete && (
              <Delete_Modal modalToggle={thesisId} thesisTitle={title} />
            )}
            {showModalView && (
              <View_Modal modalToggle={thesisId} singleThesis={singleThesis} />
            )}
          </Col>
        </Row>
      </Container>
    </IconContext.Provider>
  );
};

export default Manuscript;
