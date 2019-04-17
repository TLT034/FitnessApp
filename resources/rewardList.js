const nonLvlRewards = [
    {
        name: 'Max Level',
        type: 'Level',
        description: 'Complete 100+ activities',
        earned: false,
        activityId: null
    },
    {
        name: 'Duration',
        type: 'Personal',
        stat: 0,
        description: 'Longest duration in single activity',
        earned: false,
        activityId: null
    },
    {
        name: 'Distance',
        type: 'Personal',
        stat: 0,
        description: 'Longest distance traveled in a single activity',
        earned: false,
        activityId: null
    },
    {
        name: 'Pace',
        type: 'Personal',
        stat: 0,
        description: 'Fastest pace in a single activity',
        earned: false,
        activityId: null
    },
    {
        name: 'Speedy',
        type: 'Achievement',
        description: 'Complete an activity (1+ miles) with a pace of 8 mph or faster',
        earned: false,
        activityId: null
    },
    {
        name: 'The Flash',
        type: 'Achievement',
        description: 'Complete an activity (1+ miles) with a pace of 9 mph or faster',
        earned: false,
        activityId: null
    },
    {
        name: 'Getting There',
        type: 'Achievement',
        description: 'Travel a total of 10 miles',
        earned: false,
        activityId: null
    },
    {
        name: 'Going Places',
        type: 'Achievement',
        description: 'Travel a total of 50 miles',
        earned: false,
        activityId: null
    },
    {
        name: 'Pioneer',
        type: 'Achievement',
        description: 'Travel a total of 100 miles',
        earned: false,
        activityId: null
    },

];


function createRewards() {
    let rewardObjects = [];

    for (let i = 1; i <= 10; i++) {

        rewardObjects.push({
            name: 'Level ' + (i + 1).toString(),
            type: 'Level',
            description: 'Complete ' + (i * 5).toString() + ' activities',
            earned: false,
            activityId: null
        });
    }

    return rewardObjects;
}

const lvlRewards = createRewards();

const rewardList = lvlRewards.concat(nonLvlRewards);

export default rewardList;