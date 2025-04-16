import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { UserContext } from "../context/User";

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
            <Button onClick={() => setLoggedInUser("")}>Log out</Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
