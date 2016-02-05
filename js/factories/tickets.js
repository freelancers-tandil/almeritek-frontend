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

  return ticketFactory;

}]);
