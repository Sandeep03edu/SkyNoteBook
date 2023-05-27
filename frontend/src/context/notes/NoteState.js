import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

    const json = await response.json();
    console.log("Fetched Notes", json);
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

    console.log("Deleting note with Id: " + id);
    const leftNotes = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(leftNotes);
  };

  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let allNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < allNotes.length; index++) {
      const element = allNotes[index];
      if (element._id === id) {
        allNotes[index].title = title;
        allNotes[index].description = description;
        allNotes[index].tag = tag;
        break;
      }
    }

    setNotes(allNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, getAllNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
