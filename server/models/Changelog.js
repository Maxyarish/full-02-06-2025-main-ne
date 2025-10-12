const mongoose = require("mongoose");

const changelogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Changelog = mongoose.model("Changelog", changelogSchema);

module.exports = Changelog;
