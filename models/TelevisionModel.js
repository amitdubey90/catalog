var mongoose = require('mongoose');

var TelevisionSchema = new mongoose.Schema({
  
  make: String,
  model: String,
  year: Number,
  diagonal_width: Number,
  price: Number,
  description: String,
});

mongoose.model('televisions', TelevisionSchema);