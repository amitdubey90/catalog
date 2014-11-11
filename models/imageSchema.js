var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    img: { data: Buffer, contentType: String }
	});

var A = mongoose.model('images', schema);