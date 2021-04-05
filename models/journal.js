const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema({
  trip: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: String, required: true },
  // date: { type: Date, default: Date.now },
  placeDetail: String,
  // center: {
  //   lat: { type: Number, required: true },
  //   lng: { type: Number, required: true },
  // },
  lat: Number,
  lng: Number,
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
