import axios from "axios";

const api = axios.create({
   baseURL: "https://travel-diary-be-jfxt.onrender.com/api",
});

export const getFavouritesByUserId = ({ userId }) => {
   return api.get(`/users/userId/${userId}/favourites`).then(({ data }) => {
      console.log(data);
      return data;
   });
};

export const getFavouritesByUsername = ({ username }) => {
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

   return api.post("/favourites", favourite).then(({data}) => {
    console.log(data);
    return data;
   })
};