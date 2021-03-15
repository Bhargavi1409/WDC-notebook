const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const LOAD_STATS = 'neverwrote/stats';

const initialState = {
    stats: {},
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
    state = state || initialState;
    action = action || {};

    switch (action.type) {
        /* *** TODO: Put per-action code here *** */

        case LOAD_STATS: {
            return Object.assign({}, state, { stats: action.stats });
        }

        default: return state;
    }
}

// Action creators
/* *** TODO: Put action creators here *** */

reducer.getStats = () => {
    return (dispatch) => {
        api.get('/stats').then((stats) => {
            dispatch({ type: LOAD_STATS, stats });
        })
    }
}

// Export the action creators and reducer
module.exports = reducer;
