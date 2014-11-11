var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var carModel = mongoose.model('Car');
var tvModel = mongoose.model('televisions');
var imgModel = mongoose.model('images');
var routerModel = mongoose.model('routers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/store/getCars', function(req, res){
	
	carModel.find().exec(function(err, data){
			if (err) { return next(err); }
   			if (!data) { return next(new Error("can't find car list")); }
		   // console.log("data from api:"+data);
		    res.json(data);
		});
});

router.get('/store/getCarDetails/:carId', function(req, res, next){
	var carId = req.param('carId');
	carModel.findById(carId).exec(function(err, data){
			if (err) { return next(err); }
   			if (!data) { return next(new Error("can't find car details")); }
		   // console.log("data from api:"+data);
		    res.json(data);
		});
})

router.get('/store/getTelevisions', function(req, res){
	
	tvModel.find().exec(function(err, data){
			if (err) { return next(err); }
   			if (!data) { return next(new Error("can't find tv list")); }
		   // console.log("data from api:"+data);
		    res.json(data);
		});
});

router.get('/store/getTVDetails/:tvId', function(req, res, next){
	var tvId = req.param('tvId');
	tvModel.findById(tvId).exec(function(err, data){
			if (err) { return next(err); }
   			if (!data) { return next(new Error("can't find tv details")); }
		   // console.log("data from api:"+data);
		    res.json(data);
		});
});


router.get('/store/getRouters', function(req, res){
	
	routerModel.find().exec(function(err, data){
			if (err) { return next(err); }
   			if (!data) { return next(new Error("can't find router list")); }
		   // console.log("data from api:"+data);
		    res.json(data);
		});
});

router.get('/store/getRouterDetails/:routerId', function(req, res, next){
	var routerId = req.param('routerId');
	routerModel.findById(routerId).exec(function(err, data){
			if (err) { return next(err); }
   			if (!data) { return next(new Error("can't find router details")); }
		   // console.log("data from api:"+data);
		    res.json(data);
		});
});

router.post('/store/addCar',function(req, res, next){
	//console.log(req.body);

	var car = new carModel(req.body);
	car.save(function(err, post){
   		if(err){ return next(err); }
	    res.json(post);
  	});
});

router.post('/store/addTV',function(req, res, next){
	//console.log(req.body);

	var tv = new tvModel(req.body);
	tv.save(function(err, post){
   		if(err){ return next(err); }
	    res.json(post);
  	});
});

router.get('/addImage', function(req, res){
	
	var fs = require('fs');
	var a = new imgModel();
	var imgPath = './image.jpg';
    a.img.data = fs.readFileSync(imgPath);
    a.img.contentType = 'image/jpg';
    a.save(function (err, a) {
      if (err) throw err;
      console.error('saved img to mongo');
 	  res.json('image inserted');
 	});   
});

router.get('/getImage', function (req, res, next) {
        imgModel.findOne().exec(function (err, doc) {
          if (err) return next(err);
          //console.log('img  '+doc)
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        })
    });
module.exports = router;
