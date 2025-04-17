import { Button, Form, Modal } from "react-bootstrap";
import countries from "../dummy_data/countries.json";
import { useState } from "react";

export const ItineraryCreationForm = (props) => {
   //Mock API call
   const countryOptions = countries.map(({ country_id, name }) => (
      <option key={country_id} value={{ name, country_id }}>
         {name}
      </option>
   ));
   //Mock API call

   const [activities, setActivities] = useState([]);
   const [newActivityInput, setNewActivityInput] = useState("");

   const handleNewActivityInput = (event) => {
      setNewActivityInput(event.target.value);
   };

   const handleActivitiesListAdd = (event) => {
      const listCopy = [...activities, event.target.value];
      setActivities(listCopy);
   };

   const handleActivitiesListRemove = (event) => {
      const listCopy = [...activities];
      listCopy.splice(event.target.value, 1);
      setActivities(listCopy);
   };

   const handleSubmit = (event) => {
    // API call and optimistic rendering
   };

   return (
      <Modal {...props}>
         <Modal.Header>
            <Modal.Title>New itinerary</Modal.Title>
         </Modal.Header>
         <Form>
            <Modal.Body>
               <Form.Label htmlFor="country-select">
                  Select a country:
               </Form.Label>
               <Form.Select id="country-select" aria-label="Select a country">
                  {countryOptions}
               </Form.Select>

               <Form.Label htmlFor="itinerary-name">Itinerary name:</Form.Label>
               <Form.Control id="itinerary-name" type="text" required></Form.Control>

               {activities.map((activity, index) => {
                  return (
                     <div key={index} className="d-flex align-items-center">
                        <p className="m-2">{activity}</p>
                        <Button
                           onClick={handleActivitiesListRemove}
                           value={index}
                        >
                           Delete
                        </Button>
                     </div>
                  );
               })}

               <Form.Label htmlFor="new-activity">New activity:</Form.Label>
               <Form.Control
                  id="new-activity"
                  type="text"
                  onInput={handleNewActivityInput}
                  value={newActivityInput}
               ></Form.Control>
               <Button
                  type="button"
                  value={newActivityInput}
                  onClick={handleActivitiesListAdd}
               >
                  Add
               </Button>
            </Modal.Body>
            <Modal.Footer>
               <Button type="submit" onClick={handleSubmit}>
                  Add new itinerary
               </Button>
            </Modal.Footer>
         </Form>
      </Modal>
   );
};
