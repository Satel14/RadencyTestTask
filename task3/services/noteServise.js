const notes = require("../repositories/notes");
const getStatistic = require("../helpers/getStatistic");
const noteModel = require("../models/noteModel");

exports.postNote = (req, res) => {
  const note = {
    created: new Date().toDateString(),
    dates: "",
    archived: false,
    ...req.body,
  };

  noteModel.note
    .validate(note)
    .then((ok) => {
      console.log(ok);
      notes.addNote(note);
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.getStats = (req, res) => {
  res.send(getStatistic.get(notes.getAllNotes()));
};

exports.getNote = (req, res) => {
  const actualNoteId = Number(req.params.id);
  const actualNote = notes.getAllNotes().find((el) => el.id === actualNoteId);

  res.send(actualNote);
};

exports.deleteAllNotes = (req, res) => {
  notes.deleteAllNotes();

  res.sendStatus(200);
};

exports.deleteNote = (req, res) => {
  const noteId = Number(req.params.id);
  const note = notes.getAllNotes().find((el) => el.id === noteId);
  const noteIndex = notes.getAllNotes().indexOf(note);

  notes.deleteNote(noteIndex);

  res.sendStatus(200);
};
exports.patchNote = (req, res) => {
  const patch = req.body;

  noteModel.editNote
    .validate(patch)
    .then(() => {
      const noteId = Number(req.params.id);
      const noteIndex = notes
        .getAllNotes()
        .indexOf(notes.getAllNotes().find((el) => el.id === noteId));
      notes.patchNote(noteIndex, req.body);
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.getAllNotes = (req, res) => {
  res.send(notes.getAllNotes());
};
