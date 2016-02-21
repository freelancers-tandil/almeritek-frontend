var app = angular.module('app');

app.factory('ticketFactory',[ '$http', '$rootScope', function($http,$rootScope){

  var ticketFactory = {};


  ticketFactory.getCantidadTickets = function(callback){
    $http.get($rootScope.serverUrl + "/ticket/cantidad").success(function(data){
      callback(data.cantidad);
    }).error(function(data){
      callback(0);
    });
  };

  ticketFactory.getAllTickets = function(callback){
    $http.get($rootScope.serverUrl + "/ticket/list").success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  ticketFactory.addTicket = function(ticket,success,error){
    $http.post($rootScope.serverUrl+"/ticket","json="+JSON.stringify(ticket)).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };

  ticketFactory.get_Ticket = function(ticket, callback){
    $http.get($rootScope.serverUrl + "/ticket/ticket/"+ticket).success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  ticketFactory.saveTicket = function(ticket,success,error){
    $http.put($rootScope.serverUrl+"/ticket","json="+JSON.stringify(ticket)).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };

  ticketFactory.deleteTicket = function(ticket,success,error){
    //"json="+JSON.stringify(cliente)
    $http({
      method: 'DELETE',
      url: $rootScope.serverUrl+"/ticket",
      data: JSON.stringify(ticket)
    }).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };


  ticketFactory.getPagedTickets = function(page,amount,callback){
    $http.get($rootScope.serverUrl + "/ticket/paginado/"+page+"/"+amount).success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  ticketFactory.searchTickets = function(data,page,cantidad,callback){
    ticket = {
      num_ticket: data,
      fecha: data,
      equipo: data,
      modelo: data,
      marca: data,
      imei: data,
      cliente: data,
      costo_reparacion: data,
      tecnico: data,
      avisado: data,
      estado: data
    };
    $http.get($rootScope.serverUrl + "/ticket/search/"+page+"/"+cantidad+"?json="+JSON.stringify(ticket)).success(function(data){
      callback(data);
    }).error(function(data){
      callback([]);
    });
  };

  ticketFactory.searchCantidadTickets = function(data,callback){
    ticket = {
      num_ticket: data,
      fecha: data,
      equipo: data,
      modelo: data,
      marca: data,
      imei: data,
      cliente: data,
      costo_reparacion: data,
      tecnico: data,
      avisado: data,
      estado: data
    };
    console.log(ticket);
    $http.get($rootScope.serverUrl + "/ticket/searchcantidad?json="+JSON.stringify(ticket)).success(function(data){
      callback(data.cantidad);
    }).error(function(data){
      callback([]);
    });
  };


  return ticketFactory;

}]);
