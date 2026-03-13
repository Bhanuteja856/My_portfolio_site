const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  icon: String,
  pdfUrl: String
});

module.exports = mongoose.model("Certificate", schema);