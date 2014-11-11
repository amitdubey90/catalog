.state('cars', {
      url: '/store/cars',
      templateUrl: "/cars.html",  
      resolve: {
            carData: ['ProductService', function(ps){
              return ps.getCarList();
            }]
            },
      controller: "CarController"
    })
.state('carDetail', {
      url: '/store/cars/{carId}',
      template: "<div>{{carDetail}}</div>",
      resolve: {
  					carData: ['ProductService','$stateParams', function(ps,$stateParams){
    					return ps.getCarDetails($stateParams.carId);
 				 		}
 				]},	
      controller: 'CarController',	
    })
    .state('televisions', {
      url: '/store/televisions',
      templateUrl: "/televisions.html",
      controller: "TVController",	
    })
    .state('televsionDetail', {
      url: '/store/televisions/{tvId}',
      template: "<div>TV details:{{tvId}}</div>",
      controller: "TVController",
    })
    .state('routers', {
      url: '/store/routers',
      templateUrl: "/routers.html",
      controller: "RouterController",	
    })
    .state('routerDetail', {
      url: '/store/routers/{routerId}',
      template: "<div>Router details:{{routerId}}</div>",
      controller: "RouterController",	
    })
app.controller('carsController', function($scope, ProductService){
  //$stateParams.carId
  console.log('inside controller')
  var carData = ProductService.getCarList();
  console.log(JSON.stringify(ProductService));
  $scope.productList = ProductService.carList;
  $scope.carDetail = carData.data;
});

app.controller('TVController', function($scope, ProductService){
  console.log("populating tv")
  ProductService.getTVList(); 
  $scope.productList = ProductService.televisionList;
});

app.controller('RouterController', function($scope, ProductService){
  console.log("populating routers")
  ProductService.getRouterList();
  $scope.productList = ProductService.routerList;
});