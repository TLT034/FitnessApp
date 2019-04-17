const TOGGLE_EARNED = "TOGGLE_EARNED";
const PERSONAL_BEST = "PERSONAL_BEST";
const FILTER_REWARDS = "FILTER_REWARDS";

export {
    TOGGLE_EARNED,
    PERSONAL_BEST,
    FILTER_REWARDS
};


export const toggleEarned = (name, id) => ({
    type: TOGGLE_EARNED,
    name: name,
    id: id
})

export const personalBest = (name, id, stat) => ({
    type: PERSONAL_BEST,
    name: name,
    id: id,
    stat: stat
})

export const filterRewards = (rewards, type) => ({
    type: FILTER_REWARDS,
    rewards: rewards,
    rewardType: type
})