import { useParams } from "react-router-dom";
import { ItineraryAccordion } from "./ItineraryAccordion";
import itineraries from "../dummy_data/itineraries.json"
import countries from "../dummy_data/countries.json";

export const CountryPage = () => {
  const {country} = useParams();
  const countryData = countries.find(({name}) => name === country)
  const pageId = countryData ? countryData.country_id : null;

  const countryItineraries = itineraries.filter(({ country_id }) => country_id === pageId);

  if (pageId) {
    return (
        <ItineraryAccordion itineraries={countryItineraries}/>
    );

  }
  else return <h2>No dummy data!</h2>
};
