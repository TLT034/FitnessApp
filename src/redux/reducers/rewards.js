import rewardList from '../../../resources/rewardList';
import { TOGGLE_EARNED, PERSONAL_BEST, FILTER_REWARDS, LOAD_REWARDS } from '../actions/rewardActions';
import dataController from '../../services/DataController';

let initialState = rewardList;

const rewards = (state = initialState, action) => {
    let newState;
    let stateObj;
    switch (action.type) {

        case TOGGLE_EARNED:
            newState = state.map((reward) =>
                (reward.name === action.name) ?
                    {
                        ...reward,
                        earned: action.earned,
                        activityId: action.id
                    } : reward);

            // make state an object from array for async storage
            stateObj = newState.reduce((obj, item) => {
                obj[item.name] = item;
                return obj;
            }, {});

            dataController.updateStorageItem('rewards', stateObj);

            return newState;


        case PERSONAL_BEST:
            newState = state.map((reward) =>
                (reward.name === action.name) ?
                    {
                        ...reward,
                        earned: action.earned,
                        activityId: action.id,
                        stat: action.stat
                    } : reward);

            // make state an object from array for async storage
            stateObj = newState.reduce((obj, item) => {
                obj[item.name] = item;
                return obj;
            }, {});

            dataController.updateStorageItem('rewards', stateObj);

            return newState;

        case LOAD_REWARDS:
            return Object.values(action.loadedRew);

        default:
            return state;
    }
}

export default rewards;