import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteEdit } from "../Components/constants/noteEdit";
import { getDateFromString } from "./Utils";

const NewNote = (props) => {
  const store = useSelector((state) => state.notes);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(store.categories[0]);
  const dispatch = useDispatch();
  const confirm = (e) => {
    e.preventDefault();
    if (name && content) {
      const date = new Date();
      const note = [
        ...store.notes,
        {
          name: name,
          created:
            date.toLocaleString("default", { month: "long" }) +
            " " +
            date.getDate() +
            ", " +
            date.getFullYear(),
          category: category,
          content: content,
          dates: getDateFromString(content),
          isArchived: false,
          editable: false,
        },
      ];
      dispatch(noteEdit(note));
      setName("");
      setContent("");
      setCategory("");
      props.visible(false);
    } 
  };
  const cancel = () => {
    setName("");
    setContent("");
    setCategory("");
    props.visible(false);
  };

  return (
    <div className="boxWrapper" onMouseDown={(e) => e.stopPropagation()}>
      <div className="box">
        <form onSubmit={(e) => confirm(e)}>
          <div>Add Note</div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Category</label>
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
          <label>Content</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></input>
          <div className="formsButtons">
            <button type="submit">Add</button>
            <button type="button" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewNote;

