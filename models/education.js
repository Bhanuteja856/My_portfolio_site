const mongoose = require("mongoose");

const schema = new mongoose.Schema({

id:Number,
title:String,
place:String,
year:String,
grade:String

});

module.exports = mongoose.model("Education", schema);