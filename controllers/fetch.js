
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
module.exports = function(app) {
  app.get("/scrape",function(req,res){
  axios.get("https://www.tinybuddha.com/blog-posts")

    .then(function(response){
      var $ = cheerio.load(response.data);
      $("div.post").each(function(i,element){
        var post = {};
        post.title = $(this)
        .children("a")
        .attr("title");
        post.link = $(this)
        .children("a")
        .attr("href");
        post.img = $(this)
        .children("a")
        .children("img")
        .attr("src");
        post.quote = $(this)
        .children("div.entry-content")
        .children("p")
        .contents()
        .text();

        db.Headline.create(post)
        .then(function(dbHeadline){
          console.log(dbHeadline);
        })
        .catch(function(err){
          return res.json(err)
        });
      });
      res.send("Scrape Complete!");
    });
  });
};
