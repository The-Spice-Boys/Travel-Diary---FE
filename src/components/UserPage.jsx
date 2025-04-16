import { useParams } from 'react-router-dom';
import {
  getItinerariesByUserId,
  getUserBioByUsername,
  getUserByUsername,
} from '../api.js';
import { ItineraryAccordion } from './ItineraryAccordion.jsx';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const UserPage = () => {
  const { username } = useParams();
  const { user_id } = getUserByUsername(username);
  const itineraries = getItinerariesByUserId(user_id);

  const { bio, profile_pic_url } = getUserBioByUsername(username)[0];

  return (
    <>
        <div className="d-flex justify-content-center align-items-center p-3">
            <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={profile_pic_url} alt={username} style={{objectFit: 'cover',height: '200px'}}/>
                <Card.Body>
                    <Card.Title className="mt-3">Profile</Card.Title>
                    <Card.Text className="my-5">
                        {bio}
                    </Card.Text>
                    <div className="text-left ms-3 mt-5">
                        <h2>My Itineraries</h2>
                    </div>
                    <ItineraryAccordion itineraries={itineraries} />
                </Card.Body>
            </Card>
        </div>


    </>
  );
};
