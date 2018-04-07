var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var logger = require("morgan");
var exphbs = require("express-handlebars");


var db = require("./models");
var app = express();


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var PORT = 3000;
//
// mongoose.connect("mongodb://localhost/mongoHeadlines", {
//   // useMongoClient: true
// });

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB

mongoose.connect(MONGODB_URI);


app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");

require("./routes/htmlRoutes.js")(app);
require("./controllers/fetch.js")(app);
require("./controllers/headline.js")(app);
require("./controllers/note.js")(app);

app.listen(MONGODB_URI, function() {
  console.log("App running on port " + MONGODB_URI + "!");
});
module.exports = app;
