import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { Itinerary } from './Itinerary.jsx';
import { MenuOptions } from './MenuOptions.jsx';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/User.jsx';
import { IoMdHeart } from 'react-icons/io';
import { Favourite } from './Favourite.jsx';

import {
  deleteFavourite,
  getFavouritesByUsername,
  postFavourite,
  getFavouritesByUserId,
} from '../api.js';
import { CustomAccordionItem } from './CustomAccordionItem.jsx';

export const ItineraryAccordion = ({ itineraries }) => {
  const { loggedInUser } = useContext(UserContext);
  const [deletedIds, setDeletedIds] = useState([]);
  const [errorId, setErrorId] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    getFavouritesByUsername(loggedInUser.username).then((faves) => {
      setFavourites(faves);
    });
  }, [itineraries]);

  const accordionItems = itineraries.map((itinerary) => {
    return (
      <CustomAccordionItem
        key={itinerary.itineraryId}
        itinerary={itinerary}
        deletedIds={deletedIds}
        setDeletedIds={setDeletedIds}
        errorId={errorId}
        setErrorId={setErrorId}
        favourites={favourites}
        setFavourites={setFavourites}
      />
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
