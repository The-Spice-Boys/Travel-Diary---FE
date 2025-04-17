import Accordion from "react-bootstrap/Accordion";
import { Button } from "react-bootstrap";
import { Itinerary } from "./Itinerary.jsx";
import { MenuPopover } from "./MenuPopover.jsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User.jsx";
import { FaHeart } from "react-icons/fa";
import { getFavouritesByUserId, getUserByUsername } from "../api.js";
import { editEnabled } from "../utils/utils.js";

const Favourite = ({ itineraryId }) => {
   const { loggedInUser } = useContext(UserContext);
   const { user_id } = getUserByUsername(loggedInUser);
   const favourites = getFavouritesByUserId(user_id);

   const handleFavourite = () => setIsFavourited(!isFavourited);
   const returnColour = () => (isFavourited ? "btn-danger" : "btn-secondary");

   const [isFavourited, setIsFavourited] = useState(
       favourites.some((fave) => {
           return fave.itinerary_id === itineraryId;
        })
    );
    const [colour, setColour] = useState(returnColour());

   useEffect(() => {
      const newColour = isFavourited ? "btn-danger" : "btn-secondary";
      setColour(newColour);
   }, [isFavourited]);

   return (
      <Button className={colour} onClick={handleFavourite}>
         <FaHeart />
      </Button>
   );
};

export const ItineraryAccordion = ({ itineraries }) => {
   const accordionItems = itineraries.map(({ itinerary_id, title, user_id }) => {
      return (
         <div
            key={itinerary_id}
            className="mb-3 border border-2 border-dark rounded p-3 flex-grow-1 mx-2"
            id="accordion-item"
         >
            <Accordion.Item eventKey={itinerary_id}>
               <div className="d-flex">
                  <Accordion.Header className="flex-fill">
                     {title}
                  </Accordion.Header>
                  {editEnabled(user_id) ? (
                     <MenuPopover icon="dots" className="p-2 ms-2" />
                  ) : (
                     <Favourite itineraryId={itinerary_id} />
                  )}
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
   });

   return (
      <div className="d-flex  my-5 border border-2 border-dark rounded py-5 w-100">
         <Accordion className="d-flex flex-row flex-wrap gap-3">
            {accordionItems}
         </Accordion>
      </div>
   );
};
