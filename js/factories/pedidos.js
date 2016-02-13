var app = angular.module('app');

app.factory('pedidosFactory', [ '$http', '$rootScope', function($http,$rootScope){

  var pedidosFactory = {};

  /*
    Solo los administradores deberían poder ver todos los pedidos
    Los tecnicos deberia poder ver solo sus pedidos y cargar pedidos solo
    para sus tickets.
  */

  pedidosFactory.getAllPedidos = function(callback){
    $http.get($rootScope.serverUrl + "/pedido/list").success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  pedidosFactory.getPedidosForLoggedUser = function(callback){
    $http.get($rootScope.serverUrl + "/pedido/list_logged").success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  pedidosFactory.addPedidoLoggedUser = function(pedido,ticketid,callback){

  };

  return pedidosFactory;

}]);
