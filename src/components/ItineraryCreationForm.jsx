import { Button, Form, Modal } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { getCountries, postItinerary } from '../api';
import { UserContext } from '../context/User';

export const ItineraryCreationForm = (props) => {
  const [countries, setCountries] = useState([]);
  const [itineraryName, setItineraryName] = useState('');
  const [privacySetting, setPrivacySetting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    getCountries().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);
    if (itineraryName !== '') {
      const itinerary = {
        title: itineraryName,
        countryId: selectedCountry,
        userId: loggedInUser.userId,
        isPrivate: privacySetting,
      };
      postItinerary(itinerary)
        .then((itinerary) => {
          console.log(itinerary);
          props.setModalShow(false);
        })
        .catch((err) => {
          setSubmitted(false);
        });
    }
  };

  return (
    <Modal {...props}>
      <Modal.Header>
        <Modal.Title>New itinerary</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Label htmlFor="country-select">Select a country:</Form.Label>
          <Form.Select
            id="country-select"
            aria-label="Select a country"
            onChange={(e) => {
              setSelectedCountry(parseInt(e.target.value));
            }}
          >
            {countries.map(({ countryId, countryName }) => (
              <option key={countryId} value={countryId}>
                {countryName}
              </option>
            ))}
          </Form.Select>

          <Form.Label htmlFor="itinerary-name">Itinerary name:</Form.Label>
          <Form.Control
            id="itinerary-name"
            type="text"
            onChange={(e) => {
              setItineraryName(e.target.value);
            }}
            required
          ></Form.Control>

          <Form.Label htmlFor="privacy-select">Privacy Setting:</Form.Label>
          <Form.Select
            id="privacy-select"
            aria-label="Select privacy"
            value={privacySetting.toString()}
            onChange={(e) => {
              setPrivacySetting(e.target.value === 'true');
            }}
          >
            <option key="public" value="false">
              Public
            </option>
            <option key="private" value="true">
              Private
            </option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            onClick={handleSubmit}
            className="custom-button"
            disabled={submitted}
          >
            Add new itinerary
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
