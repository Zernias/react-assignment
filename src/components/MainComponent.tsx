import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./loginComponents/LoginPage";
import NotesEntryPage from "./noteComponents/NotesEntryPage";
import CreateNote from "./noteComponents/CreateNote";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../actions/noteActions/listOfNotesActions";
import { typeRootReducer } from "../reducers/rootReducer";
import ProtectedRoute from "./ProtectedRoute";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { listOfNotes } = useSelector<typeRootReducer, NoteState>(
    (state) => state.note
  );
  const { token, isLogged } = useSelector<typeRootReducer, LoginState>(
    (state) => state.login
  );

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem(`notes:${token}`) || "[]");
    dispatch(fetchNotes(notes));
  }, [dispatch, token]);

  useEffect(() => {
    isLogged &&
      localStorage.setItem(`notes:${token}`, JSON.stringify(listOfNotes));
  }, [listOfNotes, token, isLogged]);

  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute loggedIn={isLogged}>
              <NotesEntryPage />
            </ProtectedRoute>
          }
        />
        <Route path="/view/:id" element={<NotesEntryPage />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/edit/:id" element={<CreateNote />} />
      </Routes>
    </>
  );
};

export default Main;
