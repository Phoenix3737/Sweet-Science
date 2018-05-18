const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require('morgan'); // for debugging
const path = require('path');

// const routes = require("./routes/controller");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
// Initialize Express for debugging & body parsing

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));


// Serve Static Content
app.use(express.static(process.cwd() + '/public'));
// Add routes, both API and view
// app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/boxingData");

var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Import the Boxer model
var boxer = require('./models/app.js');
// ---------------------------------------------------------------------------------------------------------------



// Import Routes/Controller
var router = require('./routes/controller.js');
app.use('/', router);


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
