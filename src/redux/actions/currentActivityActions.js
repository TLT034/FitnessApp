const ADD_ACTIVITY_TYPE = 'ADD_ACTIVITY_TYPE';
const ADD_START_WEATHER = 'ADD_START_WEATHER';
const ADD_END_WEATHER = 'ADD_END_WEATHER';
const ADD_STATS = 'ADD_STATS';
const ADD_ROUTE_COORDS = 'ADD_ROUTE_COORDS';
const ADD_FEELING = 'ADD_FEELING';
const ADD_IMAGE = 'ADD_IMAGE';
const CLEAR_ACTIVITY = 'CLEAR_ACTIVITY';
const SET_ACTIVITY = 'SET_ACTIVITY';

export {
    ADD_ACTIVITY_TYPE,
    ADD_START_WEATHER,
    ADD_END_WEATHER,
    ADD_STATS,
    ADD_ROUTE_COORDS,
    ADD_FEELING,
    ADD_IMAGE,
    CLEAR_ACTIVITY,
    SET_ACTIVITY
};


let nextId = 0;

export const addActivityType = (activityType) => ({
    type: ADD_ACTIVITY_TYPE,
    activityType: activityType,
})

export const addStartWeather = (startWeather, date) => ({
    type: ADD_START_WEATHER,
    startWeather: startWeather,
    date: date
})

export const addEndWeather = (endWeather) => ({
    type: ADD_END_WEATHER,
    endWeather: endWeather
})

export const addStats = (duration, distance, pace) => ({
    type: ADD_STATS,
    duration: duration,
    distance: distance,
    pace: pace
})

export const addRouteCoords = (routeCoords) => ({
    type: ADD_ROUTE_COORDS,
    routeCoordinates: routeCoords
})

export const addFeeling = (feeling) => ({
    type: ADD_FEELING,
    feeling: feeling
})

export const addImage = (img) => ({
    type: ADD_IMAGE,
    imgPath: img
})

export const clearActivity = () => ({
    type: CLEAR_ACTIVITY,
})

export const setActivity = (activityObj) => ({
    type: SET_ACTIVITY,
    activity: activityObj
})