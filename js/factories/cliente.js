var app = angular.module('app');

app.factory('clienteFactory',[ '$http', '$rootScope', function($http,$rootScope){

  var clienteFactory = {};

  clienteFactory.tipo_cliente = [];
  clienteFactory.tipo_cliente[0] = 'EMPRESA';
  clienteFactory.tipo_cliente[1] = 'PERSONA';


  clienteFactory.getCantidadClientes = function(callback){
    $http.get($rootScope.serverUrl + "/cliente/cantidad").success(function(data){
      callback(data.cantidad);
    }).error(function(data){
      callback(0);
    });
  };

  clienteFactory.getCliente=function(cliente,callback){
    $http.get($rootScope.serverUrl + "/cliente/cliente/"+cliente).success(function(data){
      callback(data);
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

  clienteFactory.getAllTicketsForClient = function(cliente, callback){
    $http.get($rootScope.serverUrl + "/cliente/tickets_cliente/"+cliente).success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  clienteFactory.getPagedClientes = function(page,amount,callback){
    $http.get($rootScope.serverUrl + "/cliente/paginado/"+page+"/"+amount).success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  clienteFactory.addCliente = function(cliente,success,error){
    $http.post($rootScope.serverUrl+"/cliente","json="+JSON.stringify(cliente)).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };

  clienteFactory.saveCliente = function(cliente,success,error){
    $http.put($rootScope.serverUrl+"/cliente","json="+JSON.stringify(cliente)).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };

  clienteFactory.deleteCliente = function(cliente,success,error){
    //"json="+JSON.stringify(cliente)
    $http({
      method: 'DELETE',
      url: $rootScope.serverUrl+"/cliente",
      data: JSON.stringify(cliente)
    }).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };

  clienteFactory.searchClientes = function(data,page,cantidad,callback){
    cliente = {
      nombre: data,
      apellido_1: data,
      apellido_2: data,
      identity_number: data,
      telefono_1: data,
      telefono_2: data,
      direccion: data,
      codigo_postal: data
    };
    $http.get($rootScope.serverUrl + "/cliente/search/"+page+"/"+cantidad+"?json="+JSON.stringify(cliente)).success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  clienteFactory.searchCantidadClientes = function(data,callback){
    cliente = {
      nombre: data,
      apellido_1: data,
      apellido_2: data,
      identity_number: data,
      telefono_1: data,
      telefono_2: data,
      direccion: data,
      codigo_postal: data
    };
    console.log(cliente);
    $http.get($rootScope.serverUrl + "/cliente/searchcantidad?json="+JSON.stringify(cliente)).success(function(data){
      callback(data.cantidad);
    }).error(function(data){
      callback([]);
    });
  };

  return clienteFactory;

}]);
