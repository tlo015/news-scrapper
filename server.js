// Dependencies
const express = require('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const request = require ('request');

// Scraping tools
const cheerio = require ('cheerio');

// Require models
// const Headline = require('./models/Headline.js');
// const Note = require ('./models/Note.js');

// connect to mongoose database
const db = require("./models")

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Middleware
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Connect to Mongo DB
mongoose.connect("mongodb://localhost:27017/NewYorkTimesScaper");

//set up handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// Scrape button 
app.get('/scrape', function(req, res) {
    request('https://www.nytimes.com/', function(error, response, html) {
        var $ = cheerio.load(html);

        var results = [];

        //grab articles with an h2 tag 
        $('article').each(function(i, element) {

            var title = $(this)
                .children('h2, a')
                .text();
            var link = $(this)
                .children('h2, a')
                .attr('href');
            var summary = $(this)
                .children('.summary')
                .text();
            
            if (title !== ""  && link !== "" && summary !== "") {
                results.push({
                    title: title,
                    link: link,
                    summary: summary
                });
            };
  
        });
        res.render('home', {headlines: results});
        console.log(results);
        });

        //grab articles with an h2 tag 
        // $('article').each(function(i, element) {

        //     var result = {};

        //     result.title = $(this)
        //         .children('h2, a')
        //         .text();
        //     result.link = $(this)
        //         .children('h2, a')
        //         .attr('href');
        //     result.summary = $(this)
        //         .children('.summary')
        //         .text();

        //     // Create a new Article using the `result` object built from scraping
        //     db.Headline.create(result)
        //         .then(function(dbArticle) {
        //         // View the added result in the console
        //         console.log(dbArticle);
        //         })
        //         .catch(function(err) {
        //         // If an error occurred, send it to the client
        //         return res.json(err);
        //         });   
        // });
        
    //});         
});

//get 
app.get('/', function(req, res) {
    // db.Headline.find({}, function(error, found) {
    //     if (error) {
    //         console.log(error);
    //     }
    //     else {
    //         res.render('home');
    //     }
    // });
    res.render('home');
});

// save articles to database
app.get('/saved', function(req, res) {

    res.render('saved')
});

// save article with note


// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port" + PORT);
});
