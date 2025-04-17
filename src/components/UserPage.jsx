import { useParams } from "react-router-dom";
import {
   getFavouritesByUserId,
   getItinerariesByUserId,
   getUserBioByUsername,
   getUserByUsername,
} from "../api.js";
import { ItineraryAccordion } from "./ItineraryAccordion.jsx";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../context/User.jsx";
import { ItineraryCreationForm } from "./ItineraryCreationForm.jsx";

export const UserPage = () => {
   const { loggedInUser } = useContext(UserContext);
   const { user_id, username, bio, profile_pic_url } = getUserByUsername(useParams().username);
   const userItineraries = getItinerariesByUserId(user_id)
   const favouriteItineraries = getFavouritesByUserId(user_id);
   const [modalShow, setModalShow] = useState(false);
   const [showUserMade, setShowUserMade] = useState(true);
   const editenabled = loggedInUser === username;

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
                  <Card.Title className="mt-3">Profile</Card.Title>
                  <Card.Text className="my-5">{bio}</Card.Text>

                  <ButtonGroup onClick={handleItineraryList}>
                     <Button value={true}>My itineraries</Button>
                     <Button value={null}>My favourites</Button>
                  </ButtonGroup>
                  <h2>{showUserMade ? "My itineraries" : "My favourites"}</h2>
                  <ItineraryAccordion
                     itineraries={
                        showUserMade ? userItineraries : favouriteItineraries
                     }
                  />
                  {showUserMade && editenabled && (
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
