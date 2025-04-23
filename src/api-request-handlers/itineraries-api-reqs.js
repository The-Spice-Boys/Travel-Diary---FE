import axios from "axios";

const api = axios.create({
   baseURL: "https://travel-diary-be-jfxt.onrender.com/api",
});

export const getItinerariesByUsername = ({ username }) => {
   return api
      .get(`/users/username/${username}/itineraries`)
      .then(({ data }) => {
         console.log(data);
         return data;
      });
};

export const getItinerariesByCountryName = ({ countryName }) => {
   return api.get(`/countries/${countryName}/itineraries`).then(({ data }) => {
      console.log(data);
      return data;
   });
};

export const postItinerary = ({ title, userId, countryId, isPrivate }) => {
   const itinerary = {
      itineraryTitle: title,
      user: { userId },
      country: { countryId },
      isPrivate,
      modifiedAt: new Date(),
   };
   return api.post("/itineraries", itinerary).then(({ data }) => {
      console.log(data);
      return data;
   });
};

export const patchItinerary = ({ itineraryID, title, isPrivate }) => {
   const itineraryPatch = {
      modifiedAt: new Date()
   };
   if (title) {
      itineraryPatch.itineraryTitle = title;
   }
   if (isPrivate !== null) {
      itineraryPatch.isPrivate = isPrivate;
   }

   return api.patch(`/itineraries/${itineraryID}`, itineraryPatch).then(({ data }) => {
      console.log(data);
      return data;
   });
};