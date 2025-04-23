import axios from "axios";

const api = axios.create({
   baseURL: "https://travel-diary-be-jfxt.onrender.com/api",
});

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

export const patchActivity = ({activityId, title, completionStatus}) => {
    const activityPatch = {};
    if (title) {
        activityPatch.title = title;
    }
    if (completionStatus !== null) {
        activityPatch.completionStatus = completionStatus;
    }

    return api.patch(`/activities/${activityId}`, activityPatch).then(({data}) => {
        return data;
    })
};

export const deleteActivity = ({activityId}) => {
    return api.delete(`/activities/${activityId}`).then(({data}) => {
        return data;
    })
}