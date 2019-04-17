import {
    ADD_ACTIVITY_TYPE,
    ADD_START_WEATHER,
    ADD_END_WEATHER,
    ADD_STATS,
    ADD_ROUTE_COORDS,
    ADD_FEELING,
    ADD_IMAGE,
    CLEAR_ACTIVITY,
    SET_ACTIVITY
} from '../actions/currentActivityActions';


let initialState = {
    type: 'Type not defined!',
    distance: -1,
    duration: -1,
    pace: -1,
    routeCoordinates: [],
    startWeather: {},
    endWeather: {},
    feeling: 'No Feeling',
    imgPath: 'No Image',
    date: {}
}

const currentActivity = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ACTIVITY_TYPE:
            return {
                ...state,
                type: action.activityType,
                
            }
        case ADD_START_WEATHER:
            return {
                ...state,
                startWeather: action.startWeather,
                date: action.date
            }
        case ADD_END_WEATHER:
            return {
                ...state,
                endWeather: action.endWeather
            }
        case ADD_STATS:
            return {
                ...state,
                distance: action.distance,
                duration: action.duration,
                pace: action.pace
            }
        case ADD_ROUTE_COORDS:
            return {
                ...state,
                routeCoordinates: action.routeCoordinates
            }
        case ADD_FEELING:
            return {
                ...state,
                feeling: action.feeling
            }
        case ADD_IMAGE:
            return {
                ...state,
                imgPath: action.imgPath
            }
        case CLEAR_ACTIVITY:
            return initialState;
        case SET_ACTIVITY:
            return action.activity
        default:
            return state;
    }
}

export default currentActivity;