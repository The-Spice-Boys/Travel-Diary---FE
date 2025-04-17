import itineraries from "./dummy_data/itineraries.json";
import activities from "./dummy_data/activities.json";
import users from "./dummy_data/users.json";
import photos from "./dummy_data/photo.json";
import notes from "./dummy_data/notes.json";
import countries from "./dummy_data/countries.json";


export const getUserByUsername = (requestUsername) => {
   return users.find(({ username }) => username === requestUsername);
};

export const getUserByUserId = (userId) => {
   return users.find(({ user_id }) => user_id === userId);
}

export const getItinerariesByUserId = (requestId) => {
   return itineraries.filter(({ user_id }) => user_id === requestId);
};

export const getActivitiesByItineraryId = (requestId) => {
   return activities.filter(({ itinerary_id }) => itinerary_id === requestId);
};

export const getPhotosByActivityId = (requestId) => {
    return photos.filter(({activity_id}) => activity_id === requestId);
}   

export const getNotesByActivityId = (requestId) => {
    return notes.filter(({activity_id}) => activity_id === requestId);
}

export const getUserBioByUsername = (requestUsername) => {
   return users.filter(({username , bio}) => username === requestUsername ? bio : null);
}

export const getCountries = () => {
   return countries;
}

export const getCountryByName = (countryName) => {
   return countries.find((country) => country.countryName.toLowerCase() === countryName.toLowerCase());
}

export const getItinerariesByCountry = (countryName) => {
   const country = countries.find((country) => country.countryName.toLowerCase() === countryName.toLowerCase());

   return country ? country.itineraries : [];
}

export const getFavouritesByUsername = (username) => {
   const user = users.find((user) => user.username.toLowerCase() === username.toLowerCase());

   if (!user) return [];

   const userFavourites = getFavouritesByUsername.filter((favourites) => favourites.user.user_id === user.user_id);

   return userFavourites;
}

// export const postFavourite = ({ userId, itineraryId }) => {
//    const user = users.find((user) => user.user_id === userId);
//    const itinerary = itineraries.find((itinerary) => itinerary.itinerary_id === itineraryId);

//    if (!user || !itinerary) {
//       throw new Error("User or Itinerary not found");
//    }

//    const newFavourite = {

//    }
// }




