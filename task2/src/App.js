import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import file from "./img/file.svg";
import archive from "./img/archive.svg";
import AddNote from "./Components/NewNote";
import { noteArchivedVisibility } from "./Components/constants/noteEdit";
import Table from "./Components/NotesTableRow";

const App = () => {
  const store = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [newNote, SetNewNote] = useState(false);
  const showHideArchived = () => {
    const temp = { ...store };
    temp.archivedVisibility = !store.archivedVisibility;
    dispatch(noteArchivedVisibility(temp));
  };
  const hideModal = (boolean, e) => {
    SetNewNote(boolean);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="row listHeader">
          <div className="notesIcon" />
          <div className="notesName">Name</div>
          <div className="notesCreated">Created</div>
          <div className="notesCategory">Category</div>
          <div className="notesContent">Content</div>
          <div className="notesDates">Dates</div>
          <div className="notesEdit" />
          <div className="notesArchive">
            <img className="icon" src={archive} alt="archive" />
          </div>
          <div className="notesDelete">
            <img className="icon" src={file} alt="delete" />
          </div>
        </div>
        
        <Table data={store.notes} />
        
      </div>
      <div className="container createButton">
        <button onClick={() => SetNewNote(!newNote)}>Create note</button>
        <button className="archivedVisibility" onClick={() => showHideArchived()}>Show Archived</button>
      </div>
      <div className="container ">
        <div className="row listHeader">
          <div className="notesIcon" />
          <div className="summaryNotesCategory">Note Category</div>
          <div className="summaryActive">Active</div>
          <div className="summaryArchived">Archived</div>
        </div>
        <Table data={store.categories} />
      </div>
      <div
        className={"modal " + (!newNote ? "hidden" : "")}
        onMouseDown={(e) => hideModal(false)}
      >
        <AddNote visible={() => hideModal()} />
      </div>
    </div>
  );
};

export default App;
