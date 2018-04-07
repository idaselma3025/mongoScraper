var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
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
  app.post("/headlines/:id",function(req,res){
    db.Note.create(req.body)
    .then(function(dbNote){
      return db.Headline.findOneAndUpdate({_id:req.params.id},{note:dbNote._id},{new:true});
    })
    .then(function(dbHeadline){
      res.json(dbHeadline);
    })
    .catch(function(err){
      res.json(err);
    });
  });
};
