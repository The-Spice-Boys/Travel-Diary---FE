import { useParams } from 'react-router-dom';
import {
  getFavouritesByUserId,
  getItinerariesByUserId,
  getUserByUsername,
} from "../api.js";
import { ItineraryAccordion } from "./ItineraryAccordion.jsx";
import { Button, ButtonGroup, Card, Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ItineraryCreationForm } from "./ItineraryCreationForm.jsx";
import { UserContext } from "../context/User.jsx";
import { Error } from "./Error.jsx";
import { Loading } from "./Loading.jsx";
import { MdFavoriteBorder } from "react-icons/md";
// import {LoginPage} from "./LoginPage.jsx";

export const UserPage = () => {
  const { loggedInUser, isLoggedIn } = useContext(UserContext);
  const usernameParam = useParams().username;

  const [user, setUser] = useState({});
  const { userId, username } = user;

  const [userItineraries, setUserItineraries] = useState([]);
  const [favouriteItineraries, setFavouriteItineraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(usernameParam);
    setLoading(true);
    setError(null);
    getUserByUsername(loggedInUser.username)
      .then(async (user) => {
        setUser(user);
        setUserItineraries(await getItinerariesByUserId(user.userId));
        setFavouriteItineraries(await getFavouritesByUserId(user.userId));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [usernameParam]);

  const [modalShow, setModalShow] = useState(false);
  const [showUserMade, setShowUserMade] = useState(true);

  const handleItineraryList = (event) => {
    setShowUserMade(Boolean(event.target.value));
  };

  if (loading) return <Loading />;

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  if (error) return <Error error={error.status} />;

  return (
    <>
      <div className="d-flex justify-content-center align-items-center p-3">
        <Card style={{ width: '100%' }}>
          <Card.Img
            variant="top" //! Profile pic needs to be returned by DTO
            src={user.profilePicUrl}
            alt={username}
            style={{
              width: '300px',
              height: '300px',
              marginLeft: '20px',
              marginTop: '20px',
              border: '2px solid black',
              borderRadius: '10px',
            }}
          />
          <Card.Body>
            {loggedInUser.bio}
            <Card.Title className="mt-3">{username}</Card.Title>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ height: '60px', maxHeight: '100px' }}
            >
              {/* <Card.Text className="my-5">{bio}</Card.Text> */}
              <ButtonGroup onClick={handleItineraryList}>
                <Button
                  value={true}
                  className={showUserMade ? 'btn-primary' : 'btn-secondary'}
                >
                  Itineraries
                </Button>
                <Button
                  value={null}
                  className={showUserMade ? 'btn-secondary' : 'btn-primary'}
                >
                  Favourites
                </Button>
              </ButtonGroup>
            </div>
            <ItineraryAccordion
              itineraries={
                showUserMade ? userItineraries : favouriteItineraries
              }
            />
            <div className="d-flex flex-column align-items-end h-100">
              {showUserMade && loggedInUser.userId === userId && (
                <Button className="mt-auto" onClick={() => setModalShow(true)}>
                  Create new itinerary
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
      <ItineraryCreationForm
        show={modalShow}
        onHide={() => setModalShow(false)}
      ></ItineraryCreationForm>
    </>
  );
};
