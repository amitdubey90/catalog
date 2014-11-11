var mongoose = require('mongoose');

var CarSchema = new mongoose.Schema({
  
  make: String,
  model: String,
  imgUrl: String,
  shortDesc: String
});
mongoose.model('Car', CarSchema);