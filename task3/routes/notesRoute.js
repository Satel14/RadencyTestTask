const express = require("express");
const notesRouter = express.Router();
const noteService = require("../services/noteServise");

notesRouter
  .route("/")
  .post(noteService.postNote)
  .get(noteService.getAllNotes)
  .delete(noteService.deleteAllNotes);

notesRouter.route("/stats").get(noteService.getStats);

notesRouter
  .route("/:id")
  .get(noteService.getNote)
  .patch(noteService.patchNote)
  .delete(noteService.deleteNote);

module.exports = notesRouter;
