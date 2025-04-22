import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { Itinerary } from './Itinerary.jsx';
import { MenuPopover } from './MenuPopover.jsx';
import { MenuOptions } from './MenuOptions.jsx';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/User.jsx';
import { IoMdHeart } from 'react-icons/io';
import {
  getCountryById,
  getFavouritesByUserId,
  getUserByUserId,
  getUserByUsername,
} from '../api.js';
import { Placeholder } from 'react-bootstrap';

const Favourite = ({ itineraryId }) => {
  const returnColour = () => (isFavourited ? 'heart-fav' : 'heart-unfav');

  //! getFavouritesByUserId needs to be properly implemented in the back end
  const { loggedInUser } = useContext(UserContext);
  const [favourites, setFavourites] = useState(
    getFavouritesByUserId(loggedInUser.userId)
  );
  const [isFavourited, setIsFavourited] = useState(
    favourites.some((fave) => {
      return fave.itineraryId === itineraryId;
    })
  );
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
  //  console.log(itineraries, "<-- 58")
  const accordionItems = itineraries.map((itinerary) => {
    const { userId, username, title, itineraryId, isPrivate, modifiedAt } =
      itinerary;

    //! Itinerary DTO needs country id
    // const { countryName } = getCountryById(country_id);
    console.log(deletedIds);
    return (
      <div
        key={itineraryId}
        className="rounded ps-3 pe-3 flex-grow-1 mx-2"
        id="accordion-item"
      >
        <Accordion.Item eventKey={itineraryId}>
          <div className="d-flex align-items-center">
            <Accordion.Header
              className="w-100"
              style={
                deletedIds.includes(itineraryId)
                  ? { cursor: 'not-allowed', pointerEvents: 'none' }
                  : {}
              }
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
                </div>
                <div className="ms-2">
                  {!deletedIds.includes(itineraryId) &&
                    (loggedInUser.userId === userId ? (
                      <MenuOptions
                        id={itineraryId}
                        componentName={'itinerary'}
                        setDeletedIds={setDeletedIds}
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
    <Accordion className="d-flex flex-row flex-wrap gap-3 align-items-center p-5">
      {accordionItems}
    </Accordion>
  );
};
