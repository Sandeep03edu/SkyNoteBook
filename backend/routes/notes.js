const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1 : Fetch all the notes of logged in user using GET : /api/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const allNotes = await Notes.find({ user: req.user.id });
    res.json(allNotes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("An error occurred!!");
  }
});

// Route 2 : Add new notes of logged in user using POST : /api/notes/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title should have a min length of 5").isLength({
      min: 5,
    }),
    body("description", "description should have a min length of 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Checking data vaildation and sending bad req for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const note = new Notes({ title, description, tag, user: req.user.id });
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("An error occurred!!");
    }
  }
);

// Route 3 : Updating note of logged in user , Login required using POST : /api/notes/updatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newnote = {};
    if (title) {
      newnote.title = title;
    }

    if(description){
      newnote.description = description;
    }

    if(tag){
      newnote.tag = tag;
    }

    // finding note by id
    const oldnote = await Notes.findById(req.params.id);
    if(!oldnote){
      res.status(404).send("Note not found!!")
    }

    const noteUserId = oldnote.user.toString();
    const loggedInUserId = req.user.id;
    if(noteUserId!==loggedInUserId){
      return res.status(401).send("Access Denied!!")
    }

    updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set :  newnote}, {new : true});
    res.status(200).json(updatedNote);

  }  catch (err) {
    console.log(err.message);
    res.status(500).send("An error occurred!!");
  }
});


// Route 4 : Deleting note of logged in user , Login required using POST : /api/notes/deletenote
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // finding note by id
    const oldnote = await Notes.findById(req.params.id);
    if(!oldnote){
      res.status(404).send("Note not found!!")
    }

    const noteUserId = oldnote.user.toString();
    const loggedInUserId = req.user.id;
    if(noteUserId!==loggedInUserId){
      return res.status(401).send("Access Denied!!")
    }

    // Notes.findByIdAndDelete()
    deletedNote = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({"Success" : "Note deleted!!", note : deletedNote});

  }  catch (err) {
    console.log(err.message);
    res.status(500).send("An error occurred!!");
  }
});
module.exports = router;
