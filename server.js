// Dependencies
const express = require('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const request = require ('request');

// Scraping tools
const cheerio = require ('cheerio');

// Require models
const db = require('./models')

const PORT = 3000;

// Initialize Express
var app = express();

// Middleware
// Set up a static folder (public) for our web app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


//set up handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Connect to Mongo DB
// mongoose.connect("mongodb://localhost:27017/week18Populater");

// Database configuration
// Save the URL of our database as well as the name of our collection
// var databaseUrl = "zoo";
// var collections = ["animals"];

// Use mongojs to hook the database to the db variable
// var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// Homepage
app.get('/', function(req, res) {
    res.render('home');
  });

app.get('/saved', function(req, res) {
    res.render('saved')
});

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port" + PORT);
});
