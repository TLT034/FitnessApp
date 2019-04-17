import {
    FILTER_ACTIVITIES

} from '../actions/activityActions';


const msPerWeek = 604800000;
const msPerMonth = 2629746000;
const msPerYear = 31556952000;

const filteredActivities = (state = [], action) => {
    switch (action.type) {
        case FILTER_ACTIVITIES:

            let activities = action.activities;
            let filtered = [];

            const today = new Date();
            let minDateNum;
            switch (action.range) {
                case 'Week':
                    minDateNum = today.getTime() - msPerWeek;
                    break;
                case 'Month':
                    minDateNum = today.getTime() - msPerMonth;
                    break;
                case 'Year':
                    minDateNum = today.getTime() - msPerYear;
                    break;
            }

            activities.forEach((activity) => {
                if ((activity.type === action.activityType || action.activityType === 'All' ) &&
                    activity.date.dateNum >= minDateNum) {
                    filtered.push(activity);
                }
            });

            filtered.sort(compare(action.sortBy.toLowerCase()));

            return filtered;

        default:
            return state;
    }
}

function compare(key) {

    return function (a, b) {
        let varA = a[key];
        let varB = b[key];

        if (key === 'date') {
            varA = a.date.dateNum;
            varB = b.date.dateNum;
        }
        
        if (varA > varB) {
            return -1;
        } else if (varA < varB) {
            return 1;
        }
    };
}

export default filteredActivities;