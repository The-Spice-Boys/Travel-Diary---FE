import { Activity } from "./Activity.jsx";
import { ListGroup } from "react-bootstrap";
import { useState } from "react";
import activities from "../dummy_data/activities.json";

export const Itinerary = () => {
  const [itineraryActivities, setItineraryActivities] = useState(
    activities.filter((activity) => activity.itinerary_id === 1)
  );
  // fetch activity list by itinerary id and iterate through the list and render each Activity component
  return (
    <ListGroup>
      {itineraryActivities.map((itineraryActivity) => (
        <Activity
          key={itineraryActivity.activity_id}
          itineraryActivity={itineraryActivity}
        />
      ))}
    </ListGroup>
  );
};
