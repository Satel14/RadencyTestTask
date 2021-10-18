import { createStore, combineReducers} from "redux";
import {notesReducers} from './NotesReducers'

const reducers = combineReducers({
  notes: notesReducers,
})

export const store = createStore(reducers,{})
