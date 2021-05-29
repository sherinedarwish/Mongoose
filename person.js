const mongoose = require('mongoose');

let personSchema = new mongoose.Schema({
    name: String,
    favoritefoods: [String],
    age: Number
  });

module.exports = mongoose.model('person', personSchema)