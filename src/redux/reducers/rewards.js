import rewardList from '../../../resources/rewardList';
import { TOGGLE_EARNED, PERSONAL_BEST, FILTER_REWARDS } from '../actions/rewardActions';

let initialState = rewardList;

const rewards = (state = initialState, action) => {
    switch (action.type) {

        case TOGGLE_EARNED:
            return state.map((reward) =>
                (reward.name === action.name) ?
                    {
                        ...reward,
                        earned: true,
                        activityId: action.id
                    } : reward);

        case PERSONAL_BEST:
            return state.map((reward) =>
                (reward.name === action.name) ?
                    {
                        ...reward,
                        earned: true,
                        activityId: action.id,
                        stat: action.stat
                    } : reward);

        default:
            return state;
    }
}

export default rewards;