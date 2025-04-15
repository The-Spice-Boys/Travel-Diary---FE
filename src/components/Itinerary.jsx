import { Activity } from "./Activity.jsx";
import { ListGroup } from "react-bootstrap";
import { useState } from "react";
import activities from "../dummy_data/activities.json";
import { getActivitiesByItineraryId } from "../api.js";

export const Itinerary = ({itineraryId}) => {
  const itineraryActivities = getActivitiesByItineraryId(itineraryId);

  return (
    <ListGroup>
      {itineraryActivities.map((activity) => (
        <Activity
          key={activity.activity_id}
          activity={activity}
        />
      ))}
    </ListGroup>
  );
};
