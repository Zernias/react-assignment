import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setNewTitle,
  setNewNoteText,
  setNotePreviewId,
} from "../../actions/noteActions/noteInputActions";
import {
  setEditStatus,
  deleteNote,
} from "../../actions/noteActions/listOfNotesActions";
import { typeRootReducer } from "../../reducers/rootReducer";

const ViewNote: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listOfNotes, previewId } = useSelector<typeRootReducer, NoteState>(
    (state) => state.note
  );
  const notePreview = listOfNotes.filter(({ id }) => id === previewId)[0];

  if (listOfNotes.length === 0) {
    return (
      <div>
        <p className="text-light m-2" data-testid="no-notes-message">
          You have no notes yet!
        </p>
      </div>
    );
  }

  if (!notePreview) {
    return (
      <div>
        <p className="text-light m-2" data-testid="click-note-message">
          Click a note to preview it.
        </p>
      </div>
    );
  }

  const { title, description } = notePreview;

  const onNoteEdit = () => {
    dispatch(setEditStatus(true));
    dispatch(setNewTitle(title));
    dispatch(setNewNoteText(description));
  };

  const handleClose = () => {
    navigate("/notes");
    dispatch(setNotePreviewId(null));
  };
  return (
    <div className="view-note-container" data-testid="view-note">
      <div className="col-7 mt-2">
        <div className="card w-100 bg-muted border-warning">
          <div className="card-body">
            <button
              type="button"
              className="btn-close btn-close-white float-end"
              aria-label="Close"
              onClick={handleClose}
              data-testid="view-close-button"
            />

            <h5
              className="card-title text-light border-bottom border-light"
              data-testid="view-title"
            >{`${title}`}</h5>
            <p className="card-text text-light" data-testid="view-description">
              {description}
            </p>
            <div
              className="d-flex justify-content-between"
              data-testid="view-buttons"
            >
              <Link
                to={`/edit/${notePreview.id}`}
                className="btn btn-success"
                onClick={() => onNoteEdit()}
                data-testid="edit-button"
              >
                Edit note
              </Link>
              <Link
                to="/notes"
                className="btn btn-danger"
                onClick={() => dispatch(deleteNote(notePreview.id))}
                data-testid="delete-button"
              >
                Delete note
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
