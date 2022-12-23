import { noteInputConstants } from "../../constants/noteConstants";

const { SET_SEARCH_TEXT } = noteInputConstants;

export function setSearchText(text: string): Action {
  return {
    type: SET_SEARCH_TEXT,
    payload: text,
  };
}
