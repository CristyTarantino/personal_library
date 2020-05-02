// External Dependancies
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  comments: [String]
});

module.exports = mongoose.model('Books', bookSchema);