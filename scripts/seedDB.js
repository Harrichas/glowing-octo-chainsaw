const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Journals collection and inserts the Journals below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/journaldb"
);

const journalSeed = [
  {
    place: "UT Austin",
    placeDetail:
      "The University of Texas at Austin, shortened to UT Austin, UT, or Texas, is a public research university in Austin, Texas and the flagship institution of the University of Texas System.",
    date: new Date(Date.now()),
    lat: 30.285159344585896, 
    lng: -97.73407849215118
  },
  {
    place: "Franklin Barbecue",
    placeDetail:
      "Long lines form early for brisket, pulled pork & other smoked meats at this lunch-only spot.",
    date: new Date(Date.now()),
    lat: 30.27029481906284, 
    lng: -97.7313370539002
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
