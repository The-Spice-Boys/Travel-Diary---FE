import { Activity } from "./Activity.jsx";
import { ListGroup } from "react-bootstrap";
import { getActivitiesByItineraryId } from "../api.js";
import { useEffect, useState, useContext } from "react";
import { ActivityCreationForm } from "./ActivityCreationForm.jsx";
import { UserContext } from "../context/User.jsx";

export const Itinerary = ({ itineraryId, userId, addActivityStatus }) => {
  const [activities, setActivities] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const { loggedInUser, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    getActivitiesByItineraryId(itineraryId).then((activities) => {
      setActivities(activities);
    });
  }, []);

  const listGroupItems = activities.map((activity) => {
    return (
      <Activity key={activity.activityId} activity={activity} userId={userId} />
    );
  });

  return (
    <>
      <ListGroup>{listGroupItems}</ListGroup>
      {addActivityStatus && (
        <>
          <button
            className="custom-button"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add new activity
          </button>
          <ActivityCreationForm
            show={modalShow}
            onHide={() => setModalShow(false)}
            setActivities={setActivities}
            itineraryId={itineraryId}
          />
        </>
      )}
    </>
  );
};
