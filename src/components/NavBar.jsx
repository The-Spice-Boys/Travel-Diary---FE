import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../context/User';
import { FaRegUser } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import {loginStatus, userLogout} from "../loginNSetting.js";

export const NavBar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isloggedIn, setIsLoggedIn ] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function loginHandler(){
    console.log(isloggedIn);
    if(!isloggedIn){
      console.log("login");
      navigate('/login')}
  }

  useEffect(() => {
    loginStatus().then(data => {
      if(data.isLoggedIn){
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
    }).catch(err => {
      console.error("unable to get login status", err);
    });
  },[isloggedIn]);

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
          {loggedInUser.username === '' ? (
            <div className="d-flex flex-lg-row flex-column align-items-lg-center align-items-end justify-content-lg-end gap-3 w-100 mt-lg-0 mt-3">
              <Button style={{ maxWidth: '200px' }} as={Link} to="/login">
                Log in
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-lg-row flex-column align-items-lg-center align-items-end justify-content-lg-end gap-3 w-100 mt-lg-0 mt-3">
              {location.pathname.startsWith('/countries') ? (
                <div className="d-flex align-items-center">
                  <SearchBar variant="nav" />
                </div>
              ) : null}
              <Link to={`/users/${loggedInUser.username}`}>
                <FaRegUser size={24} />
              </Link>
              <Link to={`/users/${loggedInUser.username}/settings`}>
                <IoSettingsOutline size={24} />
              </Link>
              <Button
                style={{ maxWidth: '200px' }}
                onClick={loginHandler}
              >
                { isloggedIn ? "Log out" : "Log in"}
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
