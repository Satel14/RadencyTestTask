import {
    NOTE_ARCHIVED_VISIBILITY,
    NOTE_EDIT, TO_ARCHIVE_NOTE
} from "./constants/constant"
import {initialState} from "../Components/initialState";

export const notesReducers = (state = initialState, action) => {
    switch (action.type) {
        case NOTE_EDIT:
            return {...state, notes: action.payload}
        case NOTE_ARCHIVED_VISIBILITY:
            return {...state, ...action.payload}
        case TO_ARCHIVE_NOTE:
            return {...state, notes: action.payload}
        default:
            return state
    }
}
