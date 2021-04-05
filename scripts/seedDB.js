const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Journals collection and inserts the Journals below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/journaldb"
);

const journalSeed = [
  {
    trip: "Europe Trip",
    place: "France",
    date: "April 07, 2021",
    placeDetail:
      "France, in Western Europe, encompasses medieval cities, alpine villages and Mediterranean beaches. Paris, its capital, is famed for its fashion houses, classical art museums including the Louvre and monuments like the Eiffel Tower. The country is also renowned for its wines and sophisticated cuisine. Lascaux’s ancient cave drawings, Lyon’s Roman theater and the vast Palace of Versailles attest to its rich history.",
    lat: 46.70694479172703, 
    lng: 2.204602773717257,
  },
  {
    trip: "Europe Trip",
    place: "Germany",
    date: "April 07, 2021",
    placeDetail:
      "Germany is a Western European country with a landscape of forests, rivers, mountain ranges and North Sea beaches. It has over 2 millennia of history. Berlin, its capital, is home to art and nightlife scenes, the Brandenburg Gate and many sites relating to WWII. Munich is known for its Oktoberfest and beer halls, including the 16th-century Hofbräuhaus. Frankfurt, with its skyscrapers, houses the European Central Bank",
    lat: 51.17994694443065,
    lng: 9.784008822695007,
  },
];

db.Journal
  .remove({})
  .then(() => db.Journal.collection.insertMany(journalSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
