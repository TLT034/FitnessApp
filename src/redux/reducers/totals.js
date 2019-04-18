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

            let newDist = state.distance;
            let newDur = state.duration;
            let newRuns = state.runs;
            let newBikes = state.bikes;
            let newHikes = state.hikes

            if (action.updateType === 'Increment') {
                newDist += action.distance;
                newDur += action.duration;
                newRuns += 1;
                newHikes += 1;
                newBikes += 1;
            }
            else if (action.updateType === 'Decrement') {
                newDist -= action.distance;
                newDur -= action.duration;
                newRuns -= 1;
                newHikes -= 1;
                newBikes -= 1;
            }

            switch (action.activityType) {
                case 'Run':
                    return {
                        ...state,
                        distance: newDist,
                        duration: newDur,
                        runs: newRuns
                    };
                case 'Bike':
                    return {
                        ...state,
                        distance: newDist,
                        duration: newDur,
                        bikes: newBikes
                    };
                case 'Hike':
                    return {
                        ...state,
                        distance: newDist,
                        duration: newDur,
                        hikes: newHikes
                    };
                default:
                    return state;
            }

        default:
            return state;
    }
}

export default totals;