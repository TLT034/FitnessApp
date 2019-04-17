import { UPDATE_TOTALS } from '../actions/totalActions';


let initialState = {
    distance: 0,
    duration: 0,
    runs: 0,
    bikes: 0,
    hikes: 0
};

const totals = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TOTALS:
            switch (action.activityType) {
                case 'Run':
                    return {
                        ...state,
                        distance: state.distance + action.distance,
                        duration: state.duration + action.duration,
                        runs: state.runs + 1
                    };
                case 'Bike':
                    return {
                        ...state,
                        distance: state.distance + action.distance,
                        duration: state.duration + action.duration,
                        bikes: state.bikes + 1
                    };
                case 'Hike':
                    return {
                        ...state,
                        distance: state.distance + action.distance,
                        duration: state.duration + action.duration,
                        hikes: state.hikes + 1
                    };
                default :
                    return state;
            }
        default:
            return state;
    }
}

export default totals;