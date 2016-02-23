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

  pedidosFactory.deletePedido = function(pedido,success,error){
    //"json="+JSON.stringify(cliente)
    $http({
      method: 'DELETE',
      url: $rootScope.serverUrl+"/pedido",
      data: JSON.stringify(pedido)
    }).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };
  pedidosFactory.getCantidadPedidos = function(callback){
    $http.get($rootScope.serverUrl + "/pedido/cantidad").success(function(data){
      callback(data.cantidad);
    }).error(function(data){
      callback(0);
    });
  };

  pedidosFactory.getPagedPedidos = function(page,amount,callback){
    $http.get($rootScope.serverUrl + "/pedido/paginado/"+page+"/"+amount).success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  pedidosFactory.searchPedidos = function(data,page,cantidad,callback){
    pedido = {
      descripcion: data,
      link: data,
      fecha_pedido: data,
      proveedor: data,
      fecha_entrega: data,
      precio: data
    };
    $http.get($rootScope.serverUrl + "/pedido/search/"+page+"/"+cantidad+"?json="+JSON.stringify(pedido)).success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  pedidosFactory.searchCantidadPedidos = function(data,callback){
    pedido = {
      descripcion: data,
      link: data,
      fecha_pedido: data,
      proveedor: data,
      fecha_entrega: data,
      precio: data
    };
    console.log(pedido);
    $http.get($rootScope.serverUrl + "/pedido/searchcantidad?json="+JSON.stringify(pedido)).success(function(data){
      callback(data.cantidad);
    }).error(function(data){
      callback([]);
    });
  };


  pedidosFactory.getPedido=function(pedido, callback){
    $http.get($rootScope.serverUrl + "/pedido/pedido/"+pedido).success(function(data){
      callback(data);
    }).error(function(data){
      callback(0);
    });
  };

  pedidosFactory.savePedido = function(pedido,success,error){
    $http.put($rootScope.serverUrl+"/pedido","json="+JSON.stringify(pedido)).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };

  return pedidosFactory;

}]);
