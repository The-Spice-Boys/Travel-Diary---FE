import Accordion from "react-bootstrap/Accordion";
import { Button } from "react-bootstrap";
import { Itinerary } from "./Itinerary.jsx";
import { MenuPopover } from "./MenuPopover.jsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/User.jsx";
import { FaHeart } from "react-icons/fa";
import favourites from "../dummy_data/favourites.json";

const Favourite = ({ id }) => {

   // --- MOCK API FUNCTION & TEMP STYLING LOGIC ---
  const handleFavourite = () => setIsFavourited(!isFavourited);
  const returnColour = () => isFavourited ? "btn-danger" : "btn-secondary"
  
  const [isFavourited, setIsFavourited] = useState(
     favourites.some(
        ({ itinerary_id, user_id }) => itinerary_id === id && user_id === 1
      )
   );
   const [colour, setColour] = useState(returnColour());

   useEffect(() => {
      const newColour = isFavourited ? "btn-danger" : "btn-secondary";
      setColour(newColour);
   }, [isFavourited])
   // --- MOCK API CALLS & TEMP STYLING LOGIC ---

   return (
      <Button className={colour} onClick={handleFavourite}>
         <FaHeart />
      </Button>
   );
};

export const ItineraryAccordion = ({ itineraries }) => {
   const { loggedInUser } = useContext(UserContext);
   const { username } = useParams();
   const editenabled = loggedInUser === username;

   const accordionItems = itineraries.map(({ itinerary_id, title }) => {
      return (
          <div key={itinerary_id} className="mb-3 border border-2 border-dark rounded p-3 flex-grow-1 mx-2" id="accordion-item">
              <Accordion.Item eventKey={itinerary_id}>
                  <div className="d-flex">
                      <Accordion.Header className="flex-fill">
                          {title}
                      </Accordion.Header>
                      {editenabled ? (
                          <MenuPopover icon="dots" className="p-2 ms-2" />
                      ) : (
                          <Favourite id={itinerary_id} />
                      )}
                  </div>
                  <Accordion.Body>
                      <Itinerary
                          key = {itinerary_id}
                          itineraryId={itinerary_id}
                          editenabled={editenabled.toString()}
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
   )
};
