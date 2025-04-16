import { Activity } from "./Activity.jsx";
import { ListGroup } from "react-bootstrap";
import { getActivitiesByItineraryId } from "../api.js";

export const Itinerary = ({ itineraryId, editenabled }) => {
   const activities = getActivitiesByItineraryId(itineraryId);
   const listGroupItems = activities.map((activity) => {
      return <Activity key={activity.activity_id} activity={activity} editenabled={editenabled} />;
   });

   return <ListGroup>{listGroupItems}</ListGroup>;
};
