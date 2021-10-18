import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteEdit, toArchiveNote } from "./constants/noteEdit";
import file from "../img/file.svg";
import archive from "../img/archive.svg";
import Edit from "../img/edit.svg";
import Idea from "../img/idea.svg";
import Task from "../img/task.svg";
import RandomThought from "../img/question.svg";
import { getDateFromString } from "./Utils";

const NotesTableRow = ({ data }) => {
  const store = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const images = { Idea, Task, RandomThought };
  const edit = (row, i) => {
    const editable = [...store.notes];
    editable[i] = { ...row };
    editable.forEach((note, index) => (editable[index].editable = false));
    editable[i].editable = !row.editable;
    dispatch(noteEdit(editable));
    setName(row.name);
    setContent(row.content);
    setCategory(row.category);
  };
  const deleteNote = (i) => {
    const temp = store.notes.filter((key, index) => i !== index);
    dispatch(noteEdit(temp));
  };
  const confirmChanges = (row, i) => {
    const editable = [...store.notes];
    editable[i] = { ...row };
    editable[i].name = name;
    editable[i].dates = getDateFromString(content);
    editable[i].content = content;
    editable[i].category = category;
    editable[i].editable = false;
    dispatch(noteEdit(editable));
  };
  const archiveNote = (row, i) => {
    const editable = [...store.notes];
    editable[i].isArchived = !store.notes[i].isArchived;
    dispatch(toArchiveNote(editable));
  };
  if (data && data[0] && data[0].category) {
    return data.map(
      (key, i) =>
        (key.isArchived === store.archivedVisibility ||
          key.isArchived === false) &&
        (key.editable === false ? (
          <div
            className={"row note" + (key.isArchived === true ? "archived" : "")}
            key={key.name + i}
          >
            <div className="notesIcon ">
              <img
                className="icon"
                src={images[key.category]}
                alt={key.category}
              />
            </div>
            <div className="notesName">{key.name}</div>
            <div className="notesCreated">{key.created}</div>
            <div className="notesCategory">{key.category}</div>
            <div className="notesContent">{key.content}</div>
            <div className="notesDates">{key.dates}</div>
            <div className="notesEdit">
              <img
                className="icon"
                src={Edit}
                alt={Edit}
                onClick={() => edit(key, i)}
              />
            </div>
            <div className="notesArchive" onClick={() => archiveNote(key, i)}>
              <img className="icon" src={archive} alt={archive} />
            </div>
            <div className="notesDelete" onClick={() => deleteNote(i)}>
              <img className="icon" src={file} alt={file} />
            </div>
          </div>
        ) : (
          <div className="row note" key={key.name + i}>
            <div className="notesIcon">
              <img
                className="icon"
                src={images[key.category]}
                alt={key.category}
              />
            </div>
            <div className="notesName">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="notesCreated">{key.created}</div>
            <div className="notesCategory">
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                defaultValue={category}
              >
                {store.categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="notesContent">
              <input
                type="text"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <div className="notesDates">{key.dates}</div>
            <div className="notesEdit" onClick={() => confirmChanges(key, i)}>
              Confirm
            </div>
            <div className="notesArchive">
              <img className="icon" src={archive} alt={archive} />
            </div>
            <div className="notesDelete">
              <img className="icon" src={file} alt={file} />
            </div>
          </div>
        ))
    );
  } else if (data && typeof data[0] === "string") {
    const summaryActive = (bool, category) => {
      const arr = store.notes.filter(
        (key) => key.isArchived === bool && key.category === category
      ).length;
      return arr !== 0 ? arr : "";
    };
    summaryActive();
    return data.map((key) => (
      <div className="row note" key={key}>
        <div className="notesIcon">
          <img className="icon" src={images[key]} alt={key} />
        </div>
        <div className="summaryNotesCategory">{key}</div>
        <div className="summaryActive">{summaryActive(false, key)}</div>
        <div className="summaryArchived">{summaryActive(true, key)}</div>
      </div>
    ));
  } else {
    return <></>;
  }
};

export default NotesTableRow;
