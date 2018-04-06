var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var logger = require("morgan");

var db = require("./models");
var app = express();


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var PORT = 3000;

mongoose.connect("mongodb://localhost/mongoHeadlines", {
  // useMongoClient: true
});

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

require("./controllers/fetch.js")(app);
require("./controllers/headline.js")(app);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
module.exports = app;
