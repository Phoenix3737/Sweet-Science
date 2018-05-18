// Node Dependencies
var express = require('express');
var router = express.Router();


// Import the boxingData model
//var boxer = require('./models/app.js');



// Main GET - This will display the ReactJS application.
router.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/client/public/index.html");
});

// API GET - your components will use this to query MongoDB for all saved Boxers.
router.get("/api/saved", function(req, res) {
  
  // Query Mongo for the Boxers
   boxingData.find({}, function(err, docs){
      // log any errors
      if (err){
        console.log(err);
      } 
      // or send the doc to the browser as a json object
      else {
        res.json(docs);
      }
   });

});


// API POST - your components will use this to save an boxingData to the database.
router.post("/api/saved", function(req, res) {
  
  // Using the boxingData model, create a new entry (note that the "req.body" object has the exact same key-value pairs as the model)
  var entry = new boxingData (req.body);

  // Save the entry to MongoDB
  entry.save(function(err, doc) {
    // log any errors
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } 
    // or log the doc that was saved to the DB
    else {
      console.log(doc);
      res.sendStatus(200);
    }
  });

});


// API DELETE - your components will use this to delete a saved boxingData in the database
router.post("/api/delete/:BoxerMongoId", function(req, res) {
  console.log(req.params.BoxerMongoId)
  boxingData.findByIdAndRemove(req.params.BoxerMongoId, function (err, todo) {
    if (err) {
      // Send Failure Header
      console.log(err);      
      res.sendStatus(400);
    } 
    else {
      // Send Success Header
      res.sendStatus(200);
    }
  });

});


// CATCH ALL "*" - This redirect user to the "/" route for any unknown cases
router.get("*", function(req, res) {
  res.redirect("/");
});


// ================================
// Export Router to Server.js
module.exports = router;