const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const getnotes = 'neverwrote/getnotes';
const CREATE_NOTE = 'neverwrote/CREATE_NOTE';
const GET_NOTES_BY_ID = 'neverwrote/GET_NOTES_BY_ID';
const delete_note_byid = 'neverwrote/delete_note_byid';

const initialState = {
  notes: [],
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch (action.type) {
    /* *** TODO: Put per-action code here *** */
    case getnotes: {
      return Object.assign({}, state, { notes: action.notes });
    }

    case CREATE_NOTE: {
      const arr = state.notes.concat(action.createdNote);
      return Object.assign({}, state, { notes: arr });
    }

    case GET_NOTES_BY_ID: {
      return Object.assign({}, state, { notes: action.notes });
    }

    case delete_note_byid: {
      const arr = state.notes.filter(e => { return e.id != action.id });
      return Object.assign({}, state, { notes: arr });
    }

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */

reducer.loadAllNotes = () => {
  return (dispatch) => {
    api.get('/notes').then((notes) => {
      dispatch({ type: getnotes, notes });
    })
  }
}

reducer.CreateNote = (note) => {
  return (dispatch) => {
    api.post('/notes', note).then((createdNote) => {
      dispatch({ type: CREATE_NOTE, createdNote });
    });
  }
}

reducer.getNotesById = (id) => {
  return (dispatch) => {
    api.get('/notebooks/' + id + '/notes').then((notes) => {
      dispatch({ type: GET_NOTES_BY_ID, notes });
    });
  }
}

reducer.deleteNoteById = (id) => {

  return (dispatch) => {
    api.delete('/notes/' + id).then((response) => {
      dispatch({ type: delete_note_byid, id });
    });
  }
}

// Export the action creators and reducer
module.exports = reducer;
