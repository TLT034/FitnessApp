const UPDATE_TOTALS = "UPDATE_TOTALS";

export {
    UPDATE_TOTALS
};


export const updateTotals = (uType, dist, dur, aType) => ({
    type: UPDATE_TOTALS,
    updateType: uType,
    distance: dist,
    duration: dur,
    activityType: aType
})