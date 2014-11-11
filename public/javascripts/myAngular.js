var app = angular.module('catalogApp',['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('store', {
      url: '/store',
      templateUrl: '/store.html',
      controller: 'MainController',	
    })
    .state('productList',{
    	url:'/store/:category',
    	templateUrl: function($stateParams){
    		//if($stateParams.category !== null && $stateParams.category.trim() !== '')
    			//return "/"+$stateParams.category+".html";
    			return "/cars.html"
    	},
    	controller: 'productController'
    	/*controllerProvider: function($stateParams){
    		// console.log($stateParams.category)
    		return $stateParams.category+"Controller";
    	}*/
    })
    .state('productDetails',{
    	url:'/store/:category/:id',
    	templateUrl: function($stateParams){
    		//if($stateParams.category !== null && $stateParams.category.trim() !== '')
    			//console.log("state "+JSON.stringify($stateParams))
    			return "/carsDetail.html";
    	},
    	controller: "productDetailCtrl"
    	   })

  $urlRouterProvider.otherwise('store');
}]);

app.controller('MainController', function($scope, MainService){
	$scope.test = "hello world";
	$scope.categories = MainService.catList;
});

app.controller('productController', function($scope, ProductService, $stateParams) {
	var promise;
	var productList = {};
	var category = $stateParams.category;
	if(category === 'cars'){
		promise = ProductService.getCarList();
	} else if(category === 'televisions'){
		promise = ProductService.getTVList();
	} else if (category === 'routers') {
		promise = ProductService.getRouterList();
	};

	promise.then(function (payload){
		console.log("rendering "+payload.data);
		$scope.productList = payload.data;
	})
	$scope.category = category;
});

app.controller('productDetailCtrl', function($scope, ProductService, $stateParams){
//	console.log('detail controller '+$stateParams.category+" <>><> "+$stateParams.id);
	var promise;
	//console.log($stateParams.category)
	if($stateParams.category === 'cars'){
		console.log('getting car detail')
		promise = ProductService.getCarDetails($stateParams.id);	
	} else if($stateParams.category === 'televisions'){
		console.log('getting Televisions detail')
		promise = ProductService.getTVDetails($stateParams.id);
	} else if($stateParams.category === 'routers') {
		promise = ProductService.getRouterDetails($stateParams.id);
	}
	
	promise.then(function (payload){
		console.log('from promise '+payload);
		$scope.data = payload.data;
	});
});


app.factory('MainService', function(){
	var catData = {
			catList : [{category:'Cars', imgUrl:'/images/cars.jpg'}, {category:'Televisions', imgUrl:'/images/Television.png'}, {category:'Routers',imgUrl:'/images/router.jpg'}]
	}
	return catData;
});

app.factory('ProductService', function($http){
	var productData = {
		carList:[],
		televisionList:[],
		routerList:[]
	}

	productData.getCarList = function(){
		return $http.get('/store/getCars').success(function(data){
			//console.log("carlist from service: "+JSON.stringify(data))
			angular.copy(data,productData.carList);
		});
	}
	productData.getTVList = function(){
		return $http.get('/store/getTelevisions').success(function(data){
			angular.copy(data,productData.televisionList);
		});
	}
	productData.getRouterList = function(){
		return $http.get('/store/getRouters').success(function(data){
			angular.copy(data,productData.routerList);
		});
	}
	productData.getCarDetails = function(carId){
		return $http.get('/store/getCarDetails/'+carId).success(function(data){
			console.log("data from server " + data);		
		});
		
	}
	productData.getTVDetails = function(tvId){
		return $http.get('/store/getTVDetails/'+tvId).success(function(data){
			console.log("data from server " + data);		
		});
		
	}
	productData.getRouterDetails = function(routerId){
		return $http.get('/store/getRouterDetails/'+routerId).success(function(data){
			console.log("data from server " + data);		
		});
		
	}
	return productData;
})

 
