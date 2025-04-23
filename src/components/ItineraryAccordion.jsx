import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { Itinerary } from './Itinerary.jsx';
import { MenuOptions } from './MenuOptions.jsx';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/User.jsx';
import { IoMdHeart } from 'react-icons/io';
import {
  getFavouritesByUserId,
} from '../api.js';

const Favourite = ({ itineraryId }) => {
  const returnColour = () => (isFavourited ? 'heart-fav' : 'heart-unfav');

  //! getFavouritesByUserId needs to be properly implemented in the back end
  const { loggedInUser } = useContext(UserContext);
  const [favourites, setFavourites] = useState([]);
  const [isFavourited, setIsFavourited] = useState(false);
  const [colour, setColour] = useState(returnColour());

  const handleFavourite = () => {
    setIsFavourited(!isFavourited);
  };

  useEffect(() => {
    const faves = getFavouritesByUserId(loggedInUser.userId);
    setFavourites(faves);
    setColour(returnColour());
  }, [isFavourited]);
  //! --------------------------------------------------------------------

  return (
    <IoMdHeart
      className={`heart ${colour} m-2`}
      onClick={(e) => {
        e.stopPropagation();
        handleFavourite();
      }}
      size={25}
    />
  );
};

export const ItineraryAccordion = ({ itineraries }) => {
  const { loggedInUser } = useContext(UserContext);
  const [deletedIds, setDeletedIds] = useState([]);
  const [errorId, setErrorId] = useState(null);
  //  console.log(itineraries, "<-- 58")
  const accordionItems = itineraries.map((itinerary) => {
    const { userId, username, title, itineraryId, isPrivate, modifiedAt } =
      itinerary;

    //! Itinerary DTO needs country id
    // const { countryName } = getCountryById(country_id);
    console.log(deletedIds);
    return (
      <div key={itineraryId} className="rounded ps-3 pe-3" id="accordion-item">
        <Accordion.Item eventKey={itineraryId}>
          <div className="d-flex align-items-center">
            <Accordion.Header
              className={`w-100 ${
                deletedIds.includes(itineraryId) ? 'deleted-item' : ''
              }`}
            >
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex flex-column">
                  <Link
                    to={`/users/${username}`}
                    className="text-muted fs-6 mb-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {username}
                  </Link>

                  <p className="fs-5 mb-0">
                    {deletedIds.includes(itineraryId) ? 'Deleted' : title}
                  </p>
                  {errorId === itineraryId && (
                    <p className="text-danger fs-6 mb-0 p-0">
                      Failed to delete
                    </p>
                  )}
                </div>
                <div className="ms-2">
                  {!deletedIds.includes(itineraryId) &&
                    (loggedInUser.userId === userId ? (
                      <MenuOptions
                        id={itineraryId}
                        componentName={'itinerary'}
                        setDeletedIds={setDeletedIds}
                        setErrorId={setErrorId}
                      />
                    ) : (
                      <Favourite itineraryId={itineraryId} />
                    ))}
                </div>
              </div>
            </Accordion.Header>
          </div>
          <Accordion.Body>
            <Itinerary
              key={itineraryId}
              itineraryId={itineraryId}
              userId={userId}
            />
          </Accordion.Body>
        </Accordion.Item>
      </div>
    );
  });

  return (
    <div className="d-flex justify-content-center p-1">
      <Accordion className="d-flex flex-column gap-3 align-items-center p-5 width-card">
        {accordionItems}
      </Accordion>
    </div>
  );
};
