import { useContext } from "react";
import { UserContext } from "../context/User";
import { getUserByUsername } from "../api";

export const dateFormatter = (date) => {
  const timeElapsed = (Date.now() - date.getTime()) / 1000;

  let value;
  let unit;

  if (timeElapsed < 60) {
    return "a few seconds ago";
  } else if (timeElapsed < 3600) {
    value = Math.floor(timeElapsed / 60);
    unit = value === 1 ? "minute" : "minutes";
  } else if (timeElapsed < 86400) {
    value = Math.floor(timeElapsed / 3600);
    unit = value === 1 ? "hour" : "hours";
  } else if (timeElapsed < 2_506_000) {
    value = Math.floor(timeElapsed / 86_400);
    unit = value === 1 ? "day" : "days";
  } else if (timeElapsed < 31_540_000) {
    value = Math.floor(timeElapsed / 2_628_000);
    unit = value === 1 ? "month" : "months";
  } else {
    value = Math.round(timeElapsed / 31_540_000);
    unit = value === 1 ? "year" : "years";
  }
  return `${value} ${unit} ago`;
};

export const editEnabled = (userId) => {
  const { loggedInUser } = useContext(UserContext);
  const user = getUserByUsername(loggedInUser);
  if (user) {
    const {loggedInUserId} = user.user_id;
    return loggedInUserId === userId;
  }
  return false;
}