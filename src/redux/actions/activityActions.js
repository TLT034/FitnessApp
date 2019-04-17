const ADD_ACTIVITY = "ADD_ACTIVITY";
const FILTER_ACTIVITIES = "FILTER_ACTIVITES";
const DELETE_ACTIVITY = "DELETE_ACTIVITY";

export {
    ADD_ACTIVITY,
    FILTER_ACTIVITIES,
    DELETE_ACTIVITY
};


export const addActivity = (activityObj) => ({
    type: ADD_ACTIVITY,
    activity: activityObj
})

export const filterActivities = (activities, aType, sortBy, range) => ({
    type: FILTER_ACTIVITIES,
    activities: activities,
    activityType: aType,
    sortBy: sortBy,
    range: range
})

export const deleteActivity = (id) => ({
    type: DELETE_ACTIVITY,
    id: id
})