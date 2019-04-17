import { FILTER_REWARDS } from '../actions/rewardActions';



const filteredRewards = (state = [], action) => {
    switch (action.type) {
        case FILTER_REWARDS:
            if (action.rewardType === 'All') {
                return action.rewards;
            }
            else {
                let filtered = [];
                action.rewards.forEach((reward) => {
                    if (reward.type === action.rewardType) {
                        filtered.push(reward);
                    }
                })
                return filtered;
            }

        default:
            return state;
    }
}

export default filteredRewards;