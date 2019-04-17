import {
    ADD_ACTIVITY, DELETE_ACTIVITY,

} from '../actions/activityActions';


nextId = 0;

const activities = (state = [], action) => {
    switch (action.type) {
        case ADD_ACTIVITY:
            return [
                ...state,
                {
                    id: nextId++,
                    ...action.activity
                }
            ]
        case DELETE_ACTIVITY:
            state.forEach((activity, index) => {
                if (activity.id === action.id) {
                    state.splice(index, 1);
                }
            })
            return state;
        default:
            return state;
    }
}

export default activities;