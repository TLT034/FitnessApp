import { ADD_ACTIVITY, DELETE_ACTIVITY, LOAD_ACTIVITIES } from '../actions/activityActions';
import dataController from '../../services/DataController';

let date = new Date();
let nextId = date.getTime();

const activities = (state = [], action) => {
    switch (action.type) {
        case ADD_ACTIVITY:
            activityId = nextId++;
            /********************************* Async Storage **************************************/
            dataController.addElementToStorageItem(
                'activities',
                activityId,
                {
                    id: activityId,
                    ...action.activity
                });
            /**************************************************************************************/

            return [
                ...state,
                {
                    id: activityId,
                    ...action.activity
                }
            ]


        case DELETE_ACTIVITY:
            state.forEach((activity, index) => {
                if (activity.id === action.id) {
                    state.splice(index, 1);
                }
            })
            /********************************* Async Storage **************************************/
            if (state.length === 0) {
                dataController.removeStorageItem('activities');
            }
            else {
                // turn state array into object with the activity ids as the keys, so we can update 'activities' storage item.
                let updatedActivities = {};
                state.forEach((activity) => {
                    updatedActivities[activity.id] = activity;
                })

                dataController.updateStorageItem('activities', updatedActivities);
            }
            /***************************************************************************************/

            return state;

        case LOAD_ACTIVITIES:
            return Object.values(action.loadedActs);

        default:
            return state;
    }
}

export default activities;