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
  app.get("/headlines/:id",function(req,res){
    db.Headline.findOne({_id:req.params.id})
    .populate("note")
    .then(function(dbHeadline){
      res.json(dbHeadline);
    })
    .catch(function(err){
      res.json(err);
    });
  });
};
