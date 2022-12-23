import { noteInputConstants } from "../../constants/noteConstants";

const {SET_NEW_NOTE_TEXT, SET_NEW_NOTE_TITLE, SET_NOTE_PREVIEW_ID } = noteInputConstants;

export function setNewTitle(name: string): Action {
  return {
    type: SET_NEW_NOTE_TITLE,
    payload: name,
  };
}

export function setNewNoteText(text: string): Action {
  return {
    type: SET_NEW_NOTE_TEXT,
    payload: text,
  };
}

export function setNotePreviewId(id: number|null): Action {
  return {
    type: SET_NOTE_PREVIEW_ID,
    payload: id,
  };
}
