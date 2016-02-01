var app = angular.module('app');

app.factory('clienteFactory',[ '$http', '$rootScope', function($http,$rootScope){

  var clienteFactory = {};

  clienteFactory.getCantidadClientes = function(callback){
    $http.get($rootScope.serverUrl + "/cliente/cantidad").success(function(data){
      callback(data.cantidad);
    }).error(function(data){
      callback(0);
    });
  };

  clienteFactory.getAllClientes = function(callback){
    $http.get($rootScope.serverUrl + "/cliente/list").success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  return clienteFactory;

}]);
