import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  addNewNote,
  setEditStatus,
  updateNote,
} from "../../actions/noteActions/listOfNotesActions";
import {
  setNewNoteText,
  setNewTitle,
} from "../../actions/noteActions/noteInputActions";
import { typeRootReducer } from "../../reducers/rootReducer";

const CreateNote: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { listOfNotes, noteInputs, isEditable } = useSelector<
    typeRootReducer,
    NoteState
  >((state) => state.note);

  const { title, description } = noteInputs;

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isEditable) {
      const note = listOfNotes.find(
        (n) => n.id === +location.pathname.split("/")[2]
      );
      const updatedNote = {
        ...note,
        title,
        description,
      };
      dispatch(updateNote(updatedNote));
    } else {
      dispatch(addNewNote({ title, description }));
    }
    navigate("/notes");
  };

  const handleFormCancel = () => {
    dispatch(setNewNoteText(""));
    dispatch(setNewTitle(""));
    dispatch(setEditStatus(false));
  };

  return (
    <form
      className="card m-5 p-4 d-flex flex-column align-items-center border-warning"
      onSubmit={(event) => handleFormSubmit(event)}
      data-testid="create-note-form"
    >
      <div className="w-75">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => dispatch(setNewTitle(e.target.value))}
            required
            minLength={3}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            id="noteTextarea"
            rows={3}
            value={description}
            onChange={(e) => dispatch(setNewNoteText(e.target.value))}
            placeholder="Type your note here..."
            required
          />
        </div>
      </div>
      <div className="w-75 d-flex justify-content-between">
        <button
          className="btn btn-success ml-2"
          type="submit"
          data-testid="submit-create-button"
        >
          Submit
        </button>
        <Link
          to="/notes"
          className="btn btn-danger ml-2"
          type="reset"
          onClick={handleFormCancel}
          data-testid="cancel-button"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default CreateNote;
