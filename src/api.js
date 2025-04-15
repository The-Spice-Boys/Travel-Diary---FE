import itineraries from "./dummy_data/itineraries.json";
import activities from "./dummy_data/activities.json";
import users from "./dummy_data/users.json";
import photos from "./dummy_data/photo.json";
import notes from "./dummy_data/notes.json";

export const getUserByUsername = (requestUsername) => {
   return users.find(({ username }) => username === requestUsername);
};

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
    return notes.filter(({activity_id}) => activity_id === requestId)
}
