var app = angular.module('app');

app.controller('TicketsController',function($scope,$rootScope,$timeout,$location,ticketFactory){

  $scope.tickets = [];
  $scope.search_field_txt = 'Nombre:';
  $scope.search_field = 'nombre';
  $scope.search_data = '';
  $scope.es_empresa = false;
  $scope.newTickets = {};
  $scope.editMode = false;
  $scope.clienteForTicket = $rootScope.newTicketClient;

  $scope.getAllTickets = function(){
    ticketFactory.getAllTickets(function(data){
      $scope.tickets=data;
    });
  };

  $scope.addTicket = function(){
    ticketFactory.addTicket($scope.newTicket,function(data){
      var index = $rootScope.successNotifications.push('Ticket agregado con exito.');
      $timeout(function(){
        $rootScope.successNotifications.splice(index,1);
      },5000,index);
      $scope.newTicket = {};
    },function(data){
      var index = $rootScope.errorNotifications.push(data.error.message);
      $timeout(function(){
        $rootScope.errorNotifications.splice(index-1,1);
      },5000,index);
    });
  };

  $scope.saveTicket = function(){
    ticketFactory.saveTicket($scope.newTicket,function(data){
      var index = $rootScope.successNotifications.push('Ticket guardado con exito.');
      $timeout(function(){
        $rootScope.successNotifications.splice(index,1);
      },5000,index);
      $scope.newTicket = {};
    },function(data){
      var index = $rootScope.errorNotifications.push(data.error.message);
      $timeout(function(){
        $rootScope.errorNotifications.splice(index-1,1);
      },5000,index);
    });
  };

  $scope.deleteTicket = function(indice){
    ticketFactory.deleteTicket($scope.tickets[indice],function(data){
      $scope.tickets.splice(indice,1);
      var index = $rootScope.successNotifications.push('Ticket eliminado con exito.');
      $timeout(function(){
        $rootScope.successNotifications.splice(index,1);
      },5000,index);
      $scope.newClient = {};
    },function(data){
      var index = $rootScope.errorNotifications.push(data.error.message);
      $timeout(function(){
        $rootScope.errorNotifications.splice(index-1,1);
      },5000,index);
    });
  };

  $scope.editarTicket = function(ticket){
    $rootScope.editTicket = ticket;
    $location.path('/tickets/editar');
  };
});
