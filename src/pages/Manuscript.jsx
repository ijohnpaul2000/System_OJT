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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase"; 
import ModalComp from "../components/ModalComp";
import AddThesis from "../components/AddThesis";
import logo from "../assets/folder_logo.png";

const Manuscript = () => {
  //Use States
  const [userc, loading, error] = useAuthState(auth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [isModalOpened, setIsModalOpened] = useState(false);
  console.log(isModalOpened);
  const navigate = useNavigate();

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

  const addResearch = () => {
    setIsModalOpened(true);
  }

  //Rendering
  useEffect(() => {
    if (loading) return;

    if (!userc) return navigate("/");

    getAuthUser();
  }, [userc, loading]);

  return (
    <IconContext.Provider
      value={{
        backgroundColor: "#FFFFFF",
        color: "var(--accent-color2)",
        size: "1.5rem",
      }}
    >
      <p>Currenly Signed in as: {role} </p>
 
      <Container fluid="md" className="manuscript">
        <Row>
          <Col className="d-flex justify-content-end align-items-center">
            <DropdownButton id="dropdown-basic-button" title="Settings">
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <Col className="manuscript-text mb-4">Manuscript List</Col>
        </Row>

        <Row>
          <Col
            xl={4}
            lg={12}
            md={12}
            className="d-flex justify-content-center align-items-center
            mb-lg-4
            mb-4
            "
          >
            <div className="search-container d-flex justify-content-center align-items-center">
              <div className="search d-flex justify-content-center align-items-center">
                <input
                  className="input-search"
                  type="text"
                  placeholder="Search here..."
                />
              </div>
              <div className="btn-container d-flex justify-content-center align-items-center">
                <button className="fa-search">
                  <FaSearch />
                </button>
              </div>
            </div>
          </Col>

          <Col
            xl={8}
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
            justify-content-lg-center
            align-items-start
            "
          >
            {role === "Admin" ? (
              <Button className="settings-btns">Import Abstract</Button>
            ) : (
              ""
            )}
            <Button className="settings-btns">Import Masterlist</Button>
            <Button className="settings-btns">Import Export Masterlist</Button>
            <Button className="settings-btns" onClick={() => setIsModalOpened(true)}>
              Add Research Data
              { isModalOpened && <ModalComp/>}
            </Button>

            <div className="dropdown-container">
              <Dropdown>
                <Dropdown.Toggle className="my-dropdown">
                  Sort By
                </Dropdown.Toggle>

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
          </Col>
        </Row>

        <Row>
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <div className="table-container d-flex flex-column justify-content-center align-items-center">
              <img src={logo} alt="" className="img-empty" />
              <h2>Empty Data</h2>
              <p>The manuscript list has no data to display</p>
            </div>
            {/* <table className="table-empty d-flex flex-column justify-content-center align-items-center"> */}

            {/* </table> */}
          </Col>
        </Row>
      </Container>
    </IconContext.Provider>
  );
};

export default Manuscript;
