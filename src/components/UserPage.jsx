import { useParams } from 'react-router-dom';
import {
  getItinerariesByUserId,
  getUserBioByUsername,
  getUserByUsername,
} from '../api.js';
import { ItineraryAccordion } from './ItineraryAccordion.jsx';

export const UserPage = () => {
  const { username } = useParams();
  const { user_id } = getUserByUsername(username);
  const itineraries = getItinerariesByUserId(user_id);

  const { bio, profile_pic_url } = getUserBioByUsername(username)[0];

  return (
    <>
      <div className="container-fluid mt-5 mb-2">
        <h2>Profile</h2>
        <figure className="figure">
          <img
            src={profile_pic_url}
            className="figure-img img-fluid rounded"
            alt={username}
          />
        </figure>
        <p>{bio}</p>
      </div>
      <div className="container-fluid text-left">
        <h2>My itineraries</h2>
      </div>
      <ItineraryAccordion itineraries={itineraries} />
    </>
  );
};
