const UPDATE_TOTALS = "UPDATE_TOTALS";
const LOAD_TOTALS = "LOAD_TOTALS";

export {
    UPDATE_TOTALS,
    LOAD_TOTALS
};


export const updateTotals = (uType, dist, dur, aType) => ({
    type: UPDATE_TOTALS,
    updateType: uType,
    distance: dist,
    duration: dur,
    activityType: aType
})

export const loadTotals = (totals) => ({
    type: LOAD_TOTALS,
    loadedTotals: totals
})