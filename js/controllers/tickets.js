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
    });
  };


  $scope.addTicket = function(){
    $scope.newTicket.cliente = $scope.clienteForTicket.id;
    ticketFactory.addTicket($scope.newTicket,function(data){
      $scope.newTicket = {};
      $location.path('/ticket/listar');
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Ticket agregado con exito.",5000);
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.saveTicket = function(){
    $scope.newTicket.cliente = $scope.clienteForTicket.id;
    ticketFactory.saveTicket($scope.newTicket,function(data){
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Ticket guardado con exito.",5000);
      $scope.newTicket = {};
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.deleteTicket = function(indice){
    ticketFactory.deleteTicket($scope.tickets[indice],function(data){
      $scope.tickets.splice(indice,1);
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Ticket eliminado con exito.",5000);
      $scope.newClient = {};
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.editarTicket = function(ticket){
    $rootScope.editTicket = ticket;
    $location.path('/tickets/editar');
  };
});
