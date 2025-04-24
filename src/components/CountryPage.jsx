import { useParams } from 'react-router-dom';
import { ItineraryAccordion } from './ItineraryAccordion';
import { Loading } from './Loading';
import { Error } from './Error';
import { Card } from 'react-bootstrap';
import { getCountryByName, getItinerariesByCountryName } from '../api';
import { useEffect, useState } from 'react';

export const CountryPage = () => {
  const countryParam = useParams().country;
  const [country, setCountry] = useState({});
  const { countryName, description, countryPicUrl } = country;
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCountryByName(countryParam)
      .then((country) => {
        setCountry(country);
        return country.countryName;
      })
      .then((name) => {
        return getItinerariesByCountryName(name);
      })
      .then((itineraries) => {
        console.log(itineraries);
        setItineraries(itineraries);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [countryParam]);

  if (loading) return <Loading />;
  if (error) return <Error error={error.status} />;

  return (
    <>
      <div>
        <Card style={{ width: '100%' }}>
          <Card.Img
            variant="top"
            src={countryPicUrl}
            alt={countryName}
            style={{
              width: '20%',
              height: '20%',
              marginLeft: '20px',
              marginTop: '20px',
              border: '2px solid black',
              borderRadius: '10px',
            }}
          />
          <Card.Body>
            <Card.Title className="mt-3 display-5">{countryName}</Card.Title>
            <Card.Text className="my-3">{description}</Card.Text>
            <ItineraryAccordion itineraries={itineraries} />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
