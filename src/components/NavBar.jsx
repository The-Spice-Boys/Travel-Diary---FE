import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { SearchBar } from "./SearchBar";
import logo from "../../public/TD-logo-2.png";
import { Button } from "react-bootstrap";
// import {loginStatus, userLogout} from "../loginNSetting.js";

export const NavBar = () => {
   const { loggedInUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
   const navigate = useNavigate();

   function loginHandler() {
      setIsLoggedIn(!isLoggedIn);
      navigate(isLoggedIn ? "/login" : "/");
   }

   return (
      <div className="px-3 mt-3 mb-0 rounded">
         <Navbar
            collapseOnSelect
            expand="sm"
            className="bg-body-tertiary my-2 rounded"
         >
            <Container fluid>
               <Navbar.Brand as={Link} to="/" className="me-auto">
                  <img
                     src={logo}
                     alt="TD-logo"
                     style={{ width: "35px", height: "45px" }}
                  />
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse
                  id="responsive-navbar-nav"
                  className="justify-content-end"
               >
                  <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-end justify-content-sm-end gap-3 w-100 mt-sm-0 mt-3">
                     <div className="d-flex align-items-center">
                        <SearchBar />
                     </div>

                     {isLoggedIn && (
                        <>
                           <Link to={`/users/${loggedInUser.username}`}>
                              <FaRegUser size={24} className="icon-color" />
                           </Link>
                           <Link
                              to={`/users/${loggedInUser.username}/settings`}
                           >
                              <IoSettingsOutline
                                 size={24}
                                 className="icon-color"
                              />
                           </Link>
                        </>
                     )}

                     <Button
                        variant="custom"
                        style={{ maxWidth: "200px" }}
                        onClick={loginHandler}
                     >
                        {isLoggedIn ? "Log out" : "Log in"}
                     </Button>
                  </div>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </div>
   );
};
