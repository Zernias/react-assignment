import Navbar from "./Navbar";
import ViewNote from "./ViewNote";
import NotesList from "./NotesList";

const NotesEntryPage: React.FC = () => {
  return (
    <div data-testid="notes-page">
      <Navbar />
      <div>
        <ViewNote />
        <NotesList />
      </div>
    </div>
  );
};

export default NotesEntryPage;
