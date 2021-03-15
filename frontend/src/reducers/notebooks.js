const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const Get_stats = 'neverwrote/Get_stats';
const get_notebooks = 'neverwrote/get_notebooks';
const create_notebook = 'neverwrote/create_notebook';
const GET_NOTEBOOK_BY_ID = 'neverwrote/GET_NOTEBOOK_BY_ID';
const delete_notebook_byid = 'neverwrote/delete_notebook_byid';

const initialState = {
  notebooks: [],
  notebookById: {},
  stats: {},
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch (action.type) {
    /* *** TODO: Put per-action code here *** */
    case get_notebooks: {
      return Object.assign({}, state, { notebooks: action.notebooks });
    }

    case create_notebook: {
      const arr = state.notebooks.concat(action.createdNotebook);
      return Object.assign({}, state, { notebooks: arr });
    }

    case GET_NOTEBOOK_BY_ID: {
      return Object.assign({}, state, { notebookById: action.notebook });
    }

    case delete_notebook_byid: {
      const arr = state.notebooks.filter(e => { return e.id != action.id });
      return Object.assign({}, state, { notebooks: arr });
    }

    case Get_stats: {
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
      dispatch({ type: Get_stats, stats });
    })
  }
}

reducer.loadAllNoteBooks = () => {
  return (dispatch) => {
    api.get('/notebooks').then((notebooks) => {
      dispatch({ type: get_notebooks, notebooks });
    })
  }
}

reducer.CreateNotebook = (notebook) => {
  return (dispatch) => {
    api.post('/notebooks', notebook).then((createdNotebook) => {
      dispatch({ type: create_notebook, createdNotebook });
    });
  }
}

reducer.getNotebookById = (id) => {
  return (dispatch) => {
    api.get('/notebooks/' + id).then((notebook) => {
      dispatch({ type: GET_NOTEBOOK_BY_ID, notebook });
    });
  }
}

reducer.deleteNotebookById = (id) => {
  return (dispatch) => {
    api.delete('/notebooks/' + id).then((response) => {
      dispatch({ type:delete_notebook_byid , id });
    });
  }
}

// Export the action creators and reducer
module.exports = reducer;
