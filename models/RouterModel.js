var mongoose = require('mongoose');

var RouterSchema = new mongoose.Schema({
  
  make: String,
  model: String,
  year: Number,
  speed: String,
  description: String,
});

mongoose.model('routers', RouterSchema);