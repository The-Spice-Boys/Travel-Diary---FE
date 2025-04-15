import Accordion from "react-bootstrap/Accordion";
import { Itinerary } from "./Itinerary.jsx";

export const ItineraryAccordion = ({ itineraries }) => {
   
   const accordionItems = itineraries.map(({ itinerary_id, title }) => {
      return (
         <Accordion.Item key={itinerary_id} eventKey={itinerary_id}>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
               <Itinerary itineraryId={itinerary_id} />
            </Accordion.Body>
         </Accordion.Item>
      );
   });

   return <Accordion defaultActiveKey="0">{accordionItems}</Accordion>;
};
