import { noteListConstants } from "../../constants/noteConstants";

const {ADD_NEW_NOTE, FETCH_NOTES, DELETE_NOTE, IS_EDIT, UPDATE_NOTE} = noteListConstants

export function addNewNote(fields: {}): Action {
  return {
    type: ADD_NEW_NOTE,
    payload: fields,
  };
}

export function fetchNotes(notes: any): Action {
  return {
    type: FETCH_NOTES,
    payload: notes,
  };
}

export function deleteNote(id: number): Action {
  return {
    type: DELETE_NOTE,
    payload: id,
  };
}

export function updateNote(note: INote): Action {
  return {
    type: UPDATE_NOTE,
    payload: note,
  }
}

export function setEditStatus(isEdit:boolean): Action {
  return {
    type: IS_EDIT,
    payload: isEdit,
  }
}