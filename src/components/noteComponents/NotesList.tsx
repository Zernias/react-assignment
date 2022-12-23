import React from "react";
import { useSelector } from "react-redux";
import { typeRootReducer } from "../../reducers/rootReducer";
import NoteCard from "./NoteCard";

const NotesList: React.FC = () => {
  const { listOfNotes, searchInput } = useSelector<typeRootReducer, NoteState>(
    (state) => state.note
  );

  return (
    <div className="col-5" data-testid="list-of-notes">
      {listOfNotes
        .filter((n) =>
          searchInput
            ? n.title.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
            : n
        )
        .map((n) => (
          <NoteCard
            key={n.id}
            id={n.id}
            date={n.date}
            description={n.description}
            title={n.title}
          />
        ))}
    </div>
  );
};

export default NotesList;
