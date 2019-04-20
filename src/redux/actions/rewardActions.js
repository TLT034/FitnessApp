const TOGGLE_EARNED = "TOGGLE_EARNED";
const PERSONAL_BEST = "PERSONAL_BEST";
const FILTER_REWARDS = "FILTER_REWARDS";
const LOAD_REWARDS = "LOAD_REWARDS";

export {
    TOGGLE_EARNED,
    PERSONAL_BEST,
    FILTER_REWARDS,
    LOAD_REWARDS
};


export const toggleEarned = (name, id, earned) => ({
    type: TOGGLE_EARNED,
    name: name,
    id: id,
    earned: earned
})

export const personalBest = (name, id, stat, earned) => ({
    type: PERSONAL_BEST,
    name: name,
    id: id,
    stat: stat,
    earned: earned
})

export const filterRewards = (rewards, type) => ({
    type: FILTER_REWARDS,
    rewards: rewards,
    rewardType: type
})

export const loadRewards = (loadedRew) => ({
    type: LOAD_REWARDS,
    loadedRew: loadedRew
})