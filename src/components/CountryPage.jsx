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
      <div className='px-3 mt-3 mb-0 '>
        <Card  className='rounded border-0'style={{ width: '100%', backgroundColor: '#F8F9FA'}}>
        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="mt-3 display-5 fs-1">{countryName}</h2>
          <Card.Img
            variant="top"
            src={countryPicUrl}
            alt={countryName}
            style={{
              width: '40%',
              height: '40%',
              marginLeft: '20px',
              marginTop: '20px',
              borderRadius: '10px',
              minWidth: '170px'
            }}
          />
            <Card.Text className="my-3" style={{color: 'rgb(177, 177, 177)'}} >{description}</Card.Text>
          </Card.Body>
        <ItineraryAccordion itineraries={itineraries} />
        </Card>
      </div>
    </>
  );
};
