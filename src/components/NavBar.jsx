import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import logo from "../../public/TD-logo-2.png";
// import {loginStatus, userLogout} from "../loginNSetting.js";

export const NavBar = () => {
  const { loggedInUser, setLoggedInUser, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  function loginHandler() {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      userLogout()
        .then(() => {})
        .catch((err) => {
          throw err;
        });
      setIsLoggedIn(false);
    }
  }

  // useEffect(() => {
  //   loginStatus()
  //     .then((data) => {
  //       if (data.isLoggedIn) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("unable to get login status", err);
  //     });
  // }, [isLoggedIn]);

  return (
    <div className="px-3 mt-3 mb-0 rounded">
    <Navbar collapseOnSelect expand="sm" className="bg-body-tertiary my-2 rounded">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="me-auto">
          <img src={logo} alt="TD-logo" style={{width: "35px", height: "45px"}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          {loggedInUser.username === "" ? (
            <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-end justify-content-sm-end gap-3 w-100 mt-sm-0 mt-3">
              <button className="custom-button" style={{ maxWidth: "200px" }} as={Link} to="/login">
                Log in
              </button>
            </div>
          ) : (
            <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-end justify-content-sm-end gap-3 w-100 mt-sm-0 mt-3">
                <div className="d-flex align-items-center">
                  <SearchBar variant="nav" />
                </div>
             
              <Link to={`/users/${loggedInUser.username}`}>
                <FaRegUser size={24} className="icon-color"/>
              </Link>
              <Link to={`/users/${loggedInUser.username}/settings`}>
                <IoSettingsOutline size={24} className="icon-color"/>
              </Link>
              <button className="custom-button" style={{ maxWidth: "200px" }} onClick={loginHandler}>
                {isLoggedIn ? "Log out" : "Log in"}
              </button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};
