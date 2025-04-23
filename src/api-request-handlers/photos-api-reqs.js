import axios from "axios";

const api = axios.create({
  baseURL: "https://travel-diary-be-jfxt.onrender.com/api",
});

export const postPhoto = (file, caption, activityId) => {
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
