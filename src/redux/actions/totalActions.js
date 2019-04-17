const UPDATE_TOTALS = "UPDATE_TOTALS";

export {
    UPDATE_TOTALS
};


export const updateTotals = (dist, dur, type) => ({
    type: UPDATE_TOTALS,
    distance: dist,
    duration: dur,
    activityType: type
})