import axios from "axios";

const api = axios.create({
   baseURL: "https://travel-diary-be-jfxt.onrender.com/api",
});

// Activities endpoints
export const getActivitiesByItineraryId = (itineraryId) => {
   return api
      .get(`/itineraries/${itineraryId}/activities`)
      .then(({ data }) => data);
};

export const postActivity = ({ title, itineraryId }) => {
   const activity = {
      title,
      completionStatus: false,
      itinerary: { itineraryId },
   };

   return api.post("/activities", activity).then(({ data }) => {
      return data;
   });
};

export const patchActivity = (activityId, { title, completionStatus }) => {
   const activityPatch = {};
   if (title) {
      activityPatch.title = title;
   }
   if (completionStatus !== null) {
      activityPatch.completionStatus = completionStatus;
   }

   return api
      .patch(`/activities/${activityId}`, activityPatch)
      .then(({ data }) => {
         return data;
      });
};

export const deleteActivity = (activityId) => {
   return api.delete(`/activities/${activityId}`).then(({ data }) => {
      return data;
   });
};

// Countries endpoints
export const getCountries = () => {
   return api.get("/countries").then(({data}) => data);
}

export const getCountryByName = (name) => {
   return api.get(`/countries/${name}`).then(({ data }) => data);
};


// Favourites endpoints
export const getFavouritesByUserId = (userId) => {
   return api.get(`/users/userId/${userId}/favourites`).then(({ data }) => {
      return data;
   });
};

export const getFavouritesByUsername = (username) => {
   return api.get(`/users/username/${username}/favourites`).then(({ data }) => {
      console.log(data);
      return data;
   });
};

export const postFavourite = ({ userId, itineraryId }) => {
   const favourite = {
      user: { userId },
      itinerary: { itineraryId },
   };

   return api.post("/favourites", favourite).then(({ data }) => {
      console.log(data);
      return data;
   });
};

// Itineraries endpoints
export const getItinerariesByUsername = (username) => {
   return api
      .get(`/users/username/${username}/itineraries`)
      .then(({ data }) => {
         console.log(data);
         return data;
      });
};

export const getItinerariesByUserId = (userId) => {
   let usernameToAssign;
   return getUserByUserId(userId)
      .then(({ username }) => {
         usernameToAssign = username;
         return api.get(`/users/userId/${userId}/itineraries`);
      })
      .then(({ data }) => {
         data.forEach(
            (itinerary) => (itinerary.username = usernameToAssign)
         );
         return data;
      })
      .catch((err) => err);
};

export const getItinerariesByCountryName = (countryName) => {
   return api.get(`/countries/${countryName}/itineraries`).then(({ data }) => {
      console.log(data);
      return data;
   });
};

export const postItinerary = ({ title, userId, countryId, isPrivate }) => {
   console.log(userId, countryId, isPrivate);
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

export const patchItinerary = (itineraryID, { title, isPrivate }) => {
   const itineraryPatch = {
      modifiedAt: new Date(),
   };
   if (title) {
      itineraryPatch.itineraryTitle = title;
   }
   if (isPrivate !== null) {
      itineraryPatch.isPrivate = isPrivate;
   }

   return api
      .patch(`/itineraries/${itineraryID}`, itineraryPatch)
      .then(({ data }) => {
         console.log(data);
         return data;
      });
};

export const deleteItinerary = (id) => {
   return api.delete(`/itineraries/${id}`);
};

// Notes endpoints
export const getNotesByActivityId = (activityId) => {
   return api.get(`/activities/${activityId}/notes`).then(({ data }) => {
      return data;
   });
};

export const postNote = ({activityId, text}) => {
   const unixTimestamp = Date.now();
   const isoTimestamp = new Date(unixTimestamp).toISOString();
   return api
      .post(`/notes`, {
         activity: { activityId },
         text,
         modifiedAt: isoTimestamp,
      })
      .then((res) => res)
      .catch((err) => err);
};

export const updateNote = (noteId, text) => {
   const unixTimestamp = Date.now();
   const isoTimestamp = new Date(unixTimestamp).toISOString();
   return api
      .patch(`/notes/${noteId}`, {
         text,
         modifiedAt: isoTimestamp,
      })
      .then((res) => res)
      .catch((err) => err);
};

export const deleteNote = (noteId) => {
   return api.delete(`/notes/${noteId}`);
}

// Photo endpoints
export const getPhotosByActivityId = (activityId) => {
   return api.get(`/activities/${activityId}/photos`).then(({ data }) => {
      return data;
   });
};

export const postPhoto = ({file, caption, activityId}) => {
   const photoObj = caption
      ? { file, caption, activityId }
      : { file, activityId };
   return api
      .post(`/photos`, photoObj)
      .then((res) => res)
      .catch((err) => err);
};

export const updatePhoto = (photoId, file) => {
   return api
      .patch(`/photos/${photoId}`, { photoId, file })
      .then((res) => res)
      .catch((err) => err);
};

export const deletePhoto = (id) => {
   return api.delete(`/photos/${id}`);
};

// User endpoints
export const getUserByUsername = (username) => {
   return api.get(`/users/username/${username}`).then(({ data }) => data);
};

export const getUserByUserId = (userId) => {
   return api
      .get(`/users/userId/${userId}`)
      .then(({ data }) => data)
      .catch((err) => err);
};

export const patchUserById = (userId, updatedUser) => {
  return api
    .patch(`/users/userId/${userId}`, updatedUser)
    .then((res) => res)
    .catch((err) => err);
};
