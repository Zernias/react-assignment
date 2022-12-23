import {
  noteInputConstants,
  noteListConstants,
} from "../constants/noteConstants";

const {
  SET_NEW_NOTE_TITLE,
  SET_NEW_NOTE_TEXT,
  SET_NOTE_PREVIEW_ID,
  SET_SEARCH_TEXT,
} = noteInputConstants;

const { ADD_NEW_NOTE, FETCH_NOTES, DELETE_NOTE, UPDATE_NOTE, IS_EDIT } =
  noteListConstants;

const initialState: NoteState = {
  token: "",
  listOfNotes: [],
  noteInputs: {
    title: "",
    description: "",
  },
  previewId: null,
  searchInput: "",
  isEditable: false,
};

function updateNoteInputs(
  state: NoteState,
  payload: Action["payload"],
  fieldName: string
) {
  return {
    ...state,
    noteInputs: {
      ...state.noteInputs,
      [fieldName]: payload,
    },
  };
}

const resetNoteFields = () => ({ title: "", description: "" });

export const reducer = (
  state: NoteState = initialState,
  action: Action
): NoteState => {
  switch (action.type) {
    case SET_NEW_NOTE_TITLE:
      return updateNoteInputs(state, action.payload, "title");
    case SET_NEW_NOTE_TEXT:
      return updateNoteInputs(state, action.payload, "description");
    case ADD_NEW_NOTE:
      const { title, description } = action.payload;

      if (state.isEditable) {
        return {
          ...state,
          isEditable: false,
        };
      } else {
        const newNote: Note = {
          title,
          description: description,
          id: Date.now(),
          date: new Date(),
        };
        return {
          ...state,
          listOfNotes: [newNote, ...state.listOfNotes],
          noteInputs: resetNoteFields(),
        };
      }
    case SET_NOTE_PREVIEW_ID:
      return {
        ...state,
        previewId: action.payload,
      };
    case FETCH_NOTES:
      return {
        ...state,
        listOfNotes: action.payload,
      };
    case DELETE_NOTE:
      return {
        ...state,
        previewId: null,
        listOfNotes: state.listOfNotes.filter(
          ({ id }) => id !== action.payload
        ),
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        previewId: null,
        searchInput: action.payload,
      };
    case UPDATE_NOTE:
      const note = state.listOfNotes.find((n) => n.id === action.payload.id);
      const updatedNote = {
        ...note,
        title: action.payload.title,
        description: action.payload.description,
        date: new Date(),
      };
      const noteIndex = state.listOfNotes.findIndex(
        (n) => n.id === action.payload.id
      );
      const updatedNotesList = [
        ...state.listOfNotes.slice(0, noteIndex),
        updatedNote,
        ...state.listOfNotes.slice(noteIndex + 1),
      ];
      return {
        ...state,
        listOfNotes: updatedNotesList,
        noteInputs: resetNoteFields(),
        isEditable: false,
      };
    case IS_EDIT:
      return {
        ...state,
        isEditable: action.payload,
      };
    default:
      return state;
  }
};
