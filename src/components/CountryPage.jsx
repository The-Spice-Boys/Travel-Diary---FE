import { useParams } from "react-router-dom";
import { ItineraryAccordion } from "./ItineraryAccordion";
import itineraries from "../dummy_data/itineraries.json"
import countries from "../dummy_data/countries.json";
import { Card } from "react-bootstrap";
import { SearchBar } from "./SearchBar";



export const CountryPage = () => {
  const {country} = useParams();
  const countryData = countries.find(({countryName}) => countryName === country)
  const {countryName, countryPicUrl, description} = countryData || {};
  const pageId = countryData ? countryData.countryId : null;

  const countryItineraries = itineraries.filter(({ country_id }) => country_id === pageId);

  if (pageId) {
    return (
      <>
      <div >
      <Card style={{ width: '100%' }}>
          <Card.Img variant="top" src={countryPicUrl} alt={countryName} style={{objectFit: 'cover', height: '200px'}}/>
              <Card.Body>
                  <Card.Title className="mt-3 display-5">{countryName}</Card.Title>
                  <Card.Text className="my-3">{description}</Card.Text>
                  <ItineraryAccordion itineraries={countryItineraries}/>
              </Card.Body>
            </Card>
      </div>
      </>
    );

  }
  else return <h2>No dummy data!</h2>
};
