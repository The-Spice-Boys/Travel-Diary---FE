import axios from "axios";

const api = axios.create({
  baseURL: "https://travel-diary-be-jfxt.onrender.com/api",
});

export const postNote = (activityId, text) => {
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
