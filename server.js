require('dotenv').config();
const express = require("express");
const passport = require('passport');
const mongoose = require("mongoose");
const cookieSession = require('cookie-session'); // cookie session
require('./config/passport.js');
const routes = require("./routes");
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3001;


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// cookie session middleware // from document 
app.use(cookieSession({
  name: 'check-session',
  keys: ['key1', 'key2']
}));

//  passport and passport sessions are initialized here and these are middleware functions
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/journaldb");

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
