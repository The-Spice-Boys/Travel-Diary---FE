import { useParams } from "react-router-dom";
import { getItinerariesByUserId, getUserByUsername } from "../api.js";
import {ItineraryAccordion} from "./ItineraryAccordion.jsx";

export const UserPage = () => {
  const {username} = useParams();
  const {user_id} = getUserByUsername(username);
  const itineraries = getItinerariesByUserId(user_id);

  return (
      <ItineraryAccordion itineraries={itineraries}/>
  );
};
