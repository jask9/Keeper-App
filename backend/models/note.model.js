const mongoose = require("mongoose");

// create schema
const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

// create model
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;