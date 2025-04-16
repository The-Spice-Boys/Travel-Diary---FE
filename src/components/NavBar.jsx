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

export const NavBar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <Navbar.Brand as={Link} to="/">
            Travel Diary
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </div>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          {loggedInUser === "" ? (
            <Button as={Link} to="/login">
              Login
            </Button>
          ) : (
            <div>
              <Button onClick={() => setLoggedInUser("")}>Log out</Button>
              <Link to={`/users/${loggedInUser}`}>
                <FaRegUser />
              </Link>
              <Link to={`/users/${loggedInUser}/settings`}>
                <IoSettingsOutline />
              </Link>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
