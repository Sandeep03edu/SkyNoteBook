import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNote, showAlert } = props;

  const context = useContext(noteContext);
  const {deleteNote} = context;

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-file-pen mx-2" onClick={()=>{
              updateNote(note);
            }}></i>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{
                deleteNote(note._id);
                showAlert("Deleted successfully", "success")
            }}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
