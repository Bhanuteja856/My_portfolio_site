const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

id:Number,
title:String,
tech:String,
desc:String,
link:String

});

module.exports = mongoose.model("Project", projectSchema);