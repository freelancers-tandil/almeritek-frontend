var app = angular.module('app');

app.controller('TicketsController',function($scope,$rootScope,$timeout,$location,ticketFactory,clienteFactory,tallerFactory){

  $scope.tickets = [];
  $scope.search_field_txt = 'Nombre:';
  $scope.search_field = 'nombre';
  $scope.search_data = '';
  $scope.es_empresa = false;
  $scope.newTicket = {};
  $scope.editMode = false;
  $scope.clienteForTicket = $rootScope.newTicketClient;
  $scope.talleres = [];


  if ($location.path()=='/tickets/editar'){
    $scope.editMode = true;
    if ($rootScope.editTicket!==undefined){
      clienteFactory.getCliente($scope.editTicket.cliente,function(data){
        $scope.clienteForTicket = data;
        console.log(data);
      });
     $scope.newTicket=$rootScope.editTicket;
    } else {
      $location.path('/');
    }

  };

  // $(function () {
  //     $('#datetimepicker1').datetimepicker({
  //       format : "YYYY-MM-DD HH:mm:ss"
  //     });
  //     $('#datetimepicker1 input').on("dp.change", function(){
  //       $scope.newTicket.fecha=$('#datetimepicker1 input').val();
  //       console.log($scope.newTicket.fecha);
  //     });
  //
  // });

  $scope.getAllTickets = function(){
    ticketFactory.getAllTickets(function(data){
      $scope.tickets=data;
    });
  };

  $scope.getAlltalleres = function(){
    tallerFactory.getAlltalleres(function(data){
      $scope.talleres=data;
      console.log(data);
    });
  };


  $scope.addTicket = function(){
    $scope.newTicket.cliente = $scope.clienteForTicket.id;
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
    $scope.newTicket.cliente = $scope.clienteForTicket.id;
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
