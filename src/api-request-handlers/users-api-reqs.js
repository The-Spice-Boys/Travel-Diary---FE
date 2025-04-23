import axios from "axios";

const api = axios.create({
  baseURL: "https://travel-diary-be-jfxt.onrender.com/api",
});

export const updateUserById = (userId, updatedUser) => {
  return api
    .patch(`/users/userId/${userId}`, updatedUser)
    .then((res) => res)
    .catch((err) => err);
};
