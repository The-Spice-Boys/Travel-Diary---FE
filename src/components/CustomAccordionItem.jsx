import { Link } from 'react-router-dom';
import { Itinerary } from './Itinerary.jsx';
import { MenuOptions } from './MenuOptions.jsx';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
import { IoMdHeart } from 'react-icons/io';
import { Accordion } from 'react-bootstrap';
import { Favourite } from './Favourite.jsx';

export const CustomAccordionItem = ({
  itinerary,
  itinerariesMode,
  deletedIds,
  setDeletedIds,
  errorId,
  setErrorId,
  favourites,
  setFavourites,
}) => {
  const [title, setTitle] = useState(itinerary.title);
  const { userId, username, itineraryId, isPrivate, modifiedAt, countryName } =
    itinerary;
  const { loggedInUser } = useContext(UserContext);
  const { pathname } = useLocation();

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
                {!itinerariesMode && (
                  <Link
                    to={`/users/${username}`}
                    className="text-muted fs-6 mb-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {username}
                  </Link>
                )}

                {!pathname.match(/countries/) && (
                  <Link
                    to={`/countries/${countryName}`}
                    className="text-muted fs-6 mb-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {countryName}
                  </Link>
                )}

                <p className="fs-5 mb-0">
                  {deletedIds.includes(itineraryId) ? 'Deleted' : title}
                </p>
                {errorId === itineraryId && (
                  <p className="text-danger fs-6 mb-0 p-0">Failed to delete</p>
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
                      setTitle={setTitle}
                      title={title}
                    />
                  ) : (
                    <Favourite
                      itineraryId={itineraryId}
                      favourites={favourites}
                    />
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
            addActivityStatus={
              loggedInUser.username === username ? true : false
            }
          />
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};
