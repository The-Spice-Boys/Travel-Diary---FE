import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export const NavBar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const location = useLocation()

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
              <Button style={{ maxWidth: "200px" }} as={Link} to="/login">
                Log in
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-lg-row flex-column align-items-lg-center align-items-end justify-content-lg-end gap-3 w-100 mt-lg-0 mt-3">
              {location.pathname.startsWith("/countries") ? (
              <div className="d-flex align-items-center">
                <SearchBar variant="nav" />
                </div>
              ) : null}
              <Link to={`/users/${loggedInUser}`}>
                <FaRegUser size={24} />
              </Link>
              <Link to={`/users/${loggedInUser}/settings`}>
                <IoSettingsOutline size={24} />
              </Link>
              <Button
                style={{ maxWidth: "200px" }}
                onClick={() => setLoggedInUser("")}
              >
                Log out
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
