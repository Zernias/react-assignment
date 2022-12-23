import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotePreviewId } from "../../actions/noteActions/noteInputActions";
import { typeRootReducer } from "../../reducers/rootReducer";

const NoteCard: React.FC<INote> = ({ description, title, date, id }) => {
  const dateValue = new Date(date);
  const notePreviewId = useSelector<typeRootReducer, number | null>(
    (state) => state.note.previewId
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNoteClick = () => {
    navigate(`/view/${id}`);
    dispatch(setNotePreviewId(id));
  };

  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = dateValue
    .toLocaleDateString("sg", dateFormat)
    .split(",");

  const displayDate = formattedDate[1];

  const textPreview =
    description?.length > 40
      ? description.slice(0, 40).concat("...")
      : description;

  let noteStyles = "list-group-item";

  if (notePreviewId === id) {
    noteStyles += " active";
  }

  return (
    <div
      className={noteStyles}
      onClick={handleNoteClick}
      data-testid={`note-${id}`}
    >
      <div className="card d-flex justify-content-between m-2 p-2 border-warning rounded-3">
        <h5
          className="text-light mb-1 border-bottom border-light"
          data-testid={`card-title-${id}`}
        >{`${title}`}</h5>
        <p className="mb-1" data-testid={`card-preview-${id}`}>
          {textPreview}
        </p>
        <small data-testid={`card-date-${id}`}>{displayDate}</small>
      </div>
    </div>
  );
};

export default NoteCard;
