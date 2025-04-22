import itineraries from './dummy_data/itineraries.json';
import activities from './dummy_data/activities.json';
import users from './dummy_data/users.json';
import photos from './dummy_data/photo.json';
import notes from './dummy_data/notes.json';
import countries from './dummy_data/countries.json';
import favourites from './dummy_data/favourites.json';

import axios from 'axios';

// --- TEMP URL ---
const api = axios.create({
  baseURL: 'https://travel-demo-p3bz.onrender.com/api',
  withCredentials: true,
});
// --- TEMP URL ---

// Ideal path: /users/username/:username
export const getUserByUsername = (username) => {
  return api.get(`/users/username/${username}`).then(({ data }) => data);
};

// Ideal path: /users/userId/:userId
export const getUserByUserId = (userId) => {
  return api
    .get(`/users/user_id/${userId}`)
    .then(({ data }) => data)
    .catch((err) => err);
};

// Ideal path: /users/userId/:userId/itineraries
export const getItinerariesByUserId = (userId) => {
  let usernameToAssign;
  return getUserByUserId(userId)
    .then(({ username }) => {
      usernameToAssign = username;
      return api.get(`/itineraries/user/${username}`);
    })
    .then(({ data }) => {
      data.content.forEach(
        (itinerary) => (itinerary.username = usernameToAssign)
      );
      return data.content;
    })
    .catch((err) => err);
};

// Ideal path /itineraries/:itineraryId/activities
export const getActivitiesByItineraryId = (itineraryId) => {
  return api
    .get(`/activities/itinerary/${itineraryId}`)
    .then(({ data }) => data);
};

// Ideal path: /activities/:activityId/photos
export const getPhotosByActivityId = (activityId) => {
  return api.get(`/photos/activity/${activityId}`).then(({ data }) => {
    return data;
  });
};

// Ideal path: /activities/:activityId/notes
export const getNotesByActivityId = (activityId) => {
  return api.get(`notes/activity/${activityId}`).then(({ data }) => {
    return data;
  });
};

// Ideal path: /countries/:countryName
export const getCountryByName = (name) => {
  return api.get(`/countries/${name}`).then(({ data }) => data);
};

//! Needed?
export const getCountryById = (countryId) => {
  return countries.find((country) => country.countryId === countryId);
};

// Ideal path: /countries/:countryName/itineraries
export const getItinerariesByCountry = (name) => {
  return api.get(`/itineraries/country/${name}`).then(({ data }) => {
    const itineraries = data.content.map((itinerary) => {
      return getUserByUserId(itinerary.userId).then(({ username }) => {
        itinerary.username = username;
        return itinerary;
      });
    });

    return Promise.all(itineraries);
  });
};

//! Favourites endpoints need to be properly implemented in the back-end
export const getFavouritesByUserId = (userId) => {
  const favouritesArray = favourites
    .filter((favourite) => favourite.user.userId === userId)
    .map(({ itinerary: { itineraryId } }) => {
      return itineraries.find(
        (itinerary) => itinerary.itineraryId === itineraryId
      );
    });

  favouritesArray.forEach((fave) => {
    getUserByUserId(fave.userId).then(({ username }) => {
      fave.username = username;
    });
  });

  return favouritesArray;
};

// export const postFavourite = ({ userId, itineraryId }) => {
//    const user = users.find((user) => user.user_id === userId);
//    const itinerary = itineraries.find((itinerary) => itinerary.itinerary_id === itineraryId);

//    if (!user || !itinerary) {
//       throw new Error("User or Itinerary not found");
//    }

//    const newFavourite = {

//    }
// }

export const getUserBioByUsername = (requestUsername) => {
  return users.filter(({ username, bio }) =>
    username === requestUsername ? bio : null
  );
};
export const getCountries = () => {
  return countries;
};

export const deleteItinerary = (id) => {
  return api.delete(`/itineraries/${id}`).then(() => {});
};
