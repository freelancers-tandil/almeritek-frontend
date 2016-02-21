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

  pedidosFactory.getPedidosForLoggedUserAndTicket = function(ticketId,callback){
    $http.get($rootScope.serverUrl + "/pedido/list_logged_for_ticket/"+ticketId).success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  pedidosFactory.addPedidoLoggedUser = function(pedido,ticketid,callback){

  };


  pedidosFactory.addPedido = function(pedido,success,error){
    $http.post($rootScope.serverUrl+"/pedido","json="+JSON.stringify(pedido)).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };

  // pedidosFactory.getPedido=function(pedido, callback){
  //   $http.get($rootScope.serverUrl + "/pedido/editar/"+pedido).success(function(data){
  //     callback(data);
  //   }).error(function(data){
  //     callback(0);
  //   });
  // };

  return pedidosFactory;

}]);
