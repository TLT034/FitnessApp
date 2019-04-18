import { UPDATE_TOTALS, LOAD_TOTALS } from '../actions/totalActions';
import dataController from '../../services/DataController';


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

            let newState = { ...state, distance: newDist, duration: newDur };
            switch (action.activityType) {
                case 'Run':
                    newState = { ...newState, runs: newRuns };
                    break;
                case 'Bike':
                    newState = { ...newState, bikes: newBikes };
                    break;
                case 'Hike':
                    newState = { ...newState, hikes: newHikes };
                    break;
            }

            dataController.updateStorageItem('totals', newState)
                .then(() => dataController.getStorageItem('totals'))
                .then(result => {
                    console.log(`totals updated!`);
                    console.log(result);
                })
                .catch(error => console.error('Add Activity Error:', error));

            return newState;

        case LOAD_TOTALS:
            return action.loadedTotals;

        default:
            return state;
    }
}

export default totals;