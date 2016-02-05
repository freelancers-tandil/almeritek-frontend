var app = angular.module('app');

app.factory('tallerFactory',[ '$http', '$rootScope', function($http,$rootScope){

  var tallerFactory = {};

  tallerFactory.getAlltalleres = function(callback){
    $http.get($rootScope.serverUrl + "/taller/list").success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  return tallerFactory;

}]);
