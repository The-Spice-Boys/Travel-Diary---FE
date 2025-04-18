import { useParams } from "react-router-dom";
import {
   getFavouritesByUserId,
   getItinerariesByUserId,
   getUserByUsername,
} from "../api.js";
import { ItineraryAccordion } from "./ItineraryAccordion.jsx";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useState } from "react";
import { ItineraryCreationForm } from "./ItineraryCreationForm.jsx";
import { editEnabled } from "../utils/utils.js";

export const UserPage = () => {
   const { user_id, username, bio, profile_pic_url } = getUserByUsername(
      useParams().username
   );
   const userItineraries = getItinerariesByUserId(user_id);
   const favouriteItineraries = getFavouritesByUserId(user_id);
   const [modalShow, setModalShow] = useState(false);
   const [showUserMade, setShowUserMade] = useState(true);

   const handleItineraryList = (event) => {
      setShowUserMade(Boolean(event.target.value));
   };

   return (
      <>
         <div className="d-flex justify-content-center align-items-center p-3">
            <Card style={{ width: "100%" }}>
               <Card.Img
                  variant="top"
                  src={profile_pic_url}
                  alt={username}
                  style={{ objectFit: "cover", height: "200px" }}
               />
               <Card.Body>
                  <Card.Title className="mt-3">{username}</Card.Title>
                  <Card.Text className="my-5">{bio}</Card.Text>

                  <ButtonGroup onClick={handleItineraryList}>
                     <Button value={true} className={showUserMade ? "btn-primary" : "btn-secondary"}>
                        Itineraries
                     </Button>
                     <Button value={null} className={showUserMade ? "btn-secondary" : "btn-primary"}>
                        Favourites
                     </Button>
                  </ButtonGroup>
                  <ItineraryAccordion
                     itineraries={
                        showUserMade ? userItineraries : favouriteItineraries
                     }
                  />
                  {showUserMade && editEnabled(user_id) && (
                     <Button onClick={() => setModalShow(true)}>
                        Create new itinerary
                     </Button>
                  )}
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
