import { useParams } from "react-router-dom";
import {
   getItinerariesByUserId,
   getUserBioByUsername,
   getUserByUsername,
} from "../api.js";
import { ItineraryAccordion } from "./ItineraryAccordion.jsx";
import Card from "react-bootstrap/Card";

import itineraries from "../dummy_data/itineraries.json";
import favourites from "../dummy_data/favourites.json";
import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";

export const UserPage = () => {
   const { username } = useParams();
   const { user_id } = getUserByUsername(username);
   const { bio, profile_pic_url } = getUserBioByUsername(username)[0];

   //MOCK API CALLS
   const userItineraries = getItinerariesByUserId(user_id);
   const favouriteItineraries = favourites
      .filter((fave) => fave.user_id === user_id)
      .map((fave) =>
         itineraries.find(
            ({ itinerary_id }) => itinerary_id === fave.itinerary_id
         )
      );
   //MOCK API CALLS

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
               </Card.Body>
            </Card>
         </div>
      </>
   );
};
