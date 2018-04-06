var mongoose = require("mongoose");
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  link:{
    type:String,
    required:true
  },
  img:{
    type:String,
    required:true
  },
  quote:{
    type:String,
    required:true
  },
  note:{
    type:Schema.Types.ObjectId,
    ref:"Note"
  }
});

var Headline = mongoose.model("Headline",HeadlineSchema);

module.exports = Headline;
