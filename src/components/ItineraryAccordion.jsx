import Accordion from "react-bootstrap/Accordion";
import { Itinerary } from "./Itinerary.jsx";

export const ItineraryAccordion = () => {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Tokyo Adventure</Accordion.Header>
        <Accordion.Body>
          <Itinerary />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
