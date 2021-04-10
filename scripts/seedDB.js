const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Journals collection and inserts the Journals below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/journaldb"
);

const journalSeed = [
  {
    trip: "Seven Wonders Trip",
    place: "Great Wall of China, China",
    date: "April 07, 2021",
    placeDetail:
      "The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe.",
    lat: 40.43282235302986,  
    lng: 116.57058947967205,
    googleId: 105744847954497147641,
  },
  {
    trip: "Seven Wonders Trip",
    place: "Christ the Redeemer Statue, Brazil",
    date: "April 11, 2021",
    placeDetail:
      "Christ the Redeemer is an Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil, created by French sculptor Paul Landowski and built by Brazilian engineer Heitor da Silva Costa, in collaboration with French engineer Albert Caquot. Romanian sculptor Gheorghe Leonida fashioned the face",
    lat: -22.950849018064677,
    lng: -43.21027262496956,
    googleId: 105744847954497147641,

  },
  {
    trip: "Seven Wonders Trip",
    place: "Machu Picchu, Peru",
    date: "April 17, 2021",
    placeDetail:
      "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it’s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar, intriguing buildings that play on astronomical alignments and panoramic views. Its exact former use remains a mystery.",
    lat: -13.161929354591251, 
    lng: -72.54504873026595,
    googleId: 105744847954497147641,

  },
  {
    trip: "Seven Wonders Trip",
    place: "Chichen Itza, Mexico",
    date: "April 19, 2021",
    placeDetail:
      "Chichén Itzá is a complex of Mayan ruins on Mexico's Yucatán Peninsula. A massive step pyramid, known as El Castillo or Temple of Kukulcan, dominates the ancient city, which thrived from around 600 A.D. to the 1200s. Graphic stone carvings survive at structures like the ball court, Temple of the Warriors and the Wall of the Skulls. Nightly sound-and-light shows illuminate the buildings' sophisticated geometry",
    lat: 20.68560981902568, 
    lng: -88.56799717861972,
    googleId: 105744847954497147641,

  },
  {
    trip: "Seven Wonders Trip",
    place: "The Roman Colosseum, Italy",
    date: "April 22, 2021",
    placeDetail:
      "The Colosseum, is an oval amphitheatre in the centre of the city of Rome, Italy, just east of the Roman Forum and is the largest ancient amphitheatre ever built, and is still the largest standing amphitheater in the world today, despite its age.",
    lat: 41.89097693481352,
    lng: 12.492273815865227,
    googleId: 105744847954497147641,

  },
  {
    trip: "Seven Wonders Trip",
    place: "Taj Mahal, India",
    date: "April 25, 2021",
    placeDetail:
      "The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
    lat: 27.175373868738713,
    lng: 78.0421421999922,
    googleId: 105744847954497147641,

  },
  {
    trip: "Seven Wonders Trip",
    place: "Petra, Jordan",
    date: "April 30, 2021",
    placeDetail:
      "Petra is a famous archaeological site in Jordan's southwestern desert. Dating to around 300 B.C., it was the capital of the Nabatean Kingdom. Accessed via a narrow canyon called Al Siq, it contains tombs and temples carved into pink sandstone cliffs, earning its nickname, the Rose City, Perhaps its most famous structure is 45m-high Al Khazneh, a temple with an ornate, Greek-style facade, and known as The Treasury.",
    lat: 30.32915820100207, 
    lng: 35.44449094693965,
    googleId: 105744847954497147641,

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
