const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema({
  place: { type: String, required: true },
  date: { type: Date, default: Date.now },
  placeDetail: String,
  
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
