import { Activity } from "./Activity.jsx";
import { ListGroup } from "react-bootstrap";
import { getActivitiesByItineraryId } from "../api.js";
import { useEffect, useState } from "react";

export const Itinerary = ({ itineraryId, userId }) => {
   const [activities, setActivities] = useState([]);

   useEffect(() => {
      getActivitiesByItineraryId(itineraryId).then((activities) => {
         setActivities(activities);
      });
   }, []);

   const listGroupItems = activities.map((activity) => {
      return (
         <Activity
            key={activity.activityId}
            activity={activity}
            userId={userId}
         />
      );
   });

   return <ListGroup>{listGroupItems}</ListGroup>;
};
