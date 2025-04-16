import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

export const NavBar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="me-auto">
          Travel Diary
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          {loggedInUser === "" ? (
            <div className="d-flex flex-lg-row flex-column align-items-lg-center align-items-end justify-content-lg-end gap-3 w-100 mt-lg-0 mt-3">
              <Button as={Link} to="/login">
                Login
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-lg-row flex-column align-items-lg-center align-items-end justify-content-lg-end gap-3 w-100 mt-lg-0 mt-3">
              <Button onClick={() => setLoggedInUser("")}>Log out</Button>
              <Link to={`/users/${loggedInUser}`}>
                <FaRegUser size={24} />
              </Link>
              <Link to={`/users/${loggedInUser}/settings`}>
                <IoSettingsOutline size={24} />
              </Link>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
