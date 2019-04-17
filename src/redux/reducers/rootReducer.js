import { combineReducers } from 'redux';
import totals from './totals';
import rewards from './rewards';
import activities from './activities';
import currentActivity from './currentActivity';
import filteredActivities from './filteredActivities';
import filteredRewards from './filteredRewards';

export default combineReducers({
    totals,
    rewards,
    activities,
    currentActivity,
    filteredActivities,
    filteredRewards
})