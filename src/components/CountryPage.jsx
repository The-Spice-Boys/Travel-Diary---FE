import { useParams } from "react-router-dom";
import { ItineraryAccordion } from "./ItineraryAccordion";
import { Error } from "./Error";
import { Card } from "react-bootstrap";
import { getCountryByName, getItinerariesByCountry } from "../api";

export const CountryPage = () => {
   const country = getCountryByName(useParams().country);
   if (!country) return <Error error={404} />;
   const { countryName, description, countryPicUrl } = country;
   const itineraries = getItinerariesByCountry(countryName);

   return (
      <>
         <div>
            <Card style={{ width: "100%" }}>
               <Card.Img
                  variant="top"
                  src={countryPicUrl}
                  alt={countryName}
                  style={{ objectFit: "cover", height: "200px" }}
               />
               <Card.Body>
                  <Card.Title className="mt-3 display-5">
                     {countryName}
                  </Card.Title>
                  <Card.Text className="my-3">{description}</Card.Text>
                  <ItineraryAccordion itineraries={itineraries} />
               </Card.Body>
            </Card>
         </div>
      </>
   );
};
