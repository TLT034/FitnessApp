const ADD_ACTIVITY = "ADD_ACTIVITY";
const FILTER_ACTIVITIES = "FILTER_ACTIVITES";
const DELETE_ACTIVITY = "DELETE_ACTIVITY";
const LOAD_ACTIVITIES = "LOAD_ACTIVITIES";

export {
    ADD_ACTIVITY,
    FILTER_ACTIVITIES,
    DELETE_ACTIVITY,
    LOAD_ACTIVITIES
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

export const loadActivities = (loadedActs) => ({
    type: LOAD_ACTIVITIES,
    loadedActs: loadedActs
})