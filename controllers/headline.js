var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
module.exports = function(app) {
  app.get("/headlines",function(req,res){
    db.Headline.find({})
    .then(function(dbHeadline){
      res.json(dbHeadline);
    })
    .catch(function(err){
      res.json(err);
    });
  });
};
