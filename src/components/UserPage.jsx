import { useParams } from 'react-router-dom';
import {
  getFavouritesByUsername,
  getItinerariesByUsername,
  getUserByUsername,
} from '../api.js';
import { ItineraryAccordion } from './ItineraryAccordion.jsx';
import { Button, ButtonGroup, Card, Spinner } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { ItineraryCreationForm } from './ItineraryCreationForm.jsx';
import { UserContext } from '../context/User.jsx';
import { Error } from './Error.jsx';
import { Loading } from './Loading.jsx';
// import {LoginPage} from "./LoginPage.jsx";

export const UserPage = () => {
  const { loggedInUser, isLoggedIn } = useContext(UserContext);
  const usernameParam = useParams().username;

  const [user, setUser] = useState({});
  const { userId, username, bio, profilePicUrl, private: isPrivate } = user;

  const [userItineraries, setUserItineraries] = useState([]);
  const [favouriteItineraries, setFavouriteItineraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showUserMade, setShowUserMade] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getUserByUsername(usernameParam)
      .then((user) => {
        setUser(user);
        return getItinerariesByUsername(usernameParam);
      })
      .then((itineraries) => {
        setUserItineraries(itineraries);
        return getFavouritesByUsername(usernameParam);
      })
      .then((favourites) => {
        favourites = favourites.map(({ itinerary }) => itinerary);
        setFavouriteItineraries(favourites);
        setShowUserMade(true);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [usernameParam]);

  const handleItineraryList = (event) => {
    setShowUserMade(Boolean(event.target.value));
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error.status} />;

  return (
    <>
      <div className="d-flex justify-content-center align-items-center p-3">
        <Card
          className="border-0"
          style={{ width: '100%', backgroundColor: '#F8F9FA' }}
        >
          <Card.Body>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h2 className="mt-3">{username}</h2>
              {!isPrivate && (
                <Card.Img
                  variant="top"
                  src={profilePicUrl}
                  alt={username}
                  style={{
                    width: '256px',
                    height: '256px',
                    marginLeft: '20px',
                    marginRight: '40px',
                    marginTop: '20px',
                    borderRadius: '50%',
                  }}
                />
              )}

              <Card.Text>{bio}</Card.Text>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ height: '60px', maxHeight: '100px' }}
            >
              <ButtonGroup className="m-auto" onClick={handleItineraryList}>
                <Button
                  value={true}
                  variant={showUserMade ? 'custom' : 'secondary'}
                >
                  Itineraries
                </Button>
                <Button
                  value={null}
                  variant={showUserMade ? 'secondary' : 'custom'}
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
                <button
                  className="mt-auto custom-button"
                  onClick={() => setModalShow(true)}
                >
                  Create new itinerary
                </button>
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
