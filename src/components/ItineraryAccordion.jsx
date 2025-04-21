import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { Itinerary } from './Itinerary.jsx';
import { MenuPopover } from './MenuPopover.jsx';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/User.jsx';
import { IoMdHeart } from 'react-icons/io';
import {
  getCountryById,
  getFavouritesByUserId,
  getUserByUserId,
  getUserByUsername,
} from '../api.js';

const Favourite = ({ itineraryId }) => {
  const { loggedInUser } = useContext(UserContext);
  const user = getUserByUsername(loggedInUser);
  if (!user) return null;
  const favourites = getFavouritesByUserId(user.user_id);

  const handleFavourite = () => {
    setIsFavourited(!isFavourited);
  };
  const returnColour = () => (isFavourited ? 'heart-fav' : 'heart-unfav');

  const [isFavourited, setIsFavourited] = useState(
    favourites.some((fave) => {
      return fave.itinerary_id === itineraryId;
    })
  );
  const [colour, setColour] = useState(returnColour());

  useEffect(() => {
    setColour(returnColour());
  }, [isFavourited]);

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

  const accordionItems = itineraries.map(
    ({ itinerary_id, title, user_id, country_id }) => {
      const { username } = getUserByUserId(user_id);
      const { countryName } = getCountryById(country_id);
      return (
        <div
          key={itinerary_id}
          className="rounded ps-3 pe-3 flex-grow-1 mx-2"
          id="accordion-item"
        >
          <Accordion.Item eventKey={itinerary_id}>
            <div className="d-flex align-items-center">
              <Accordion.Header className="w-100">
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
                      {title} - {countryName}
                    </p>
                  </div>
                  <div className="ms-2">
                    {loggedInUser.user_id === user_id ? (
                      <MenuPopover icon="dots" className="p-2" />
                    ) : (
                      <Favourite itineraryId={itinerary_id} />
                    )}
                  </div>
                </div>
              </Accordion.Header>
            </div>
            <Accordion.Body>
              <Itinerary
                key={itinerary_id}
                itineraryId={itinerary_id}
                userId={user_id}
              />
            </Accordion.Body>
          </Accordion.Item>
        </div>
      );
    }
  );

  return (
    <div className="d-flex  my-5 border border-2 border-dark rounded py-5 w-100">
      <Accordion className="d-flex flex-row flex-wrap gap-3 align-items-center">
        {accordionItems}
      </Accordion>
    </div>
  );
};

{
  /* <Breadcrumb className="mb-0 p-0">
                  <Breadcrumb.Item href={`/users/${username}`}>
                    {' '}
                    {username}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href={`/countries/${countryName}`}>
                    {countryName}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>{title}</Breadcrumb.Item>
                </Breadcrumb> */
}
