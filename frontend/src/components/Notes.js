import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')!==undefined){
      getAllNotes();
    }
    else{
       navigate("/login") 
    }
  }, []);

  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const updateNote = (currentNote) => {
    modalRef.current.click();

    // Setting default note data
    setNote(currentNote);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Updated Note", note);
    editNote(note._id, note.title, note.description, note.tag);
    closeRef.current.click();
    props.showAlert("Editted successfully", "success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        ref={modalRef}
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    value={note.title}
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={note.description}
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={note.tag}
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                ref={closeRef}
                data-dismiss="modal"
              >
                Close
              </button>
              <button
               disabled={note.title.length<5 ||note.description.length<5 } 
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="row my-3">
        <h2>Your Note</h2>
        <div className="container mx-1">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              showAlert = {props.showAlert}
              key={note._id}
              updateNote={updateNote}
              note={note}
            ></NoteItem>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
