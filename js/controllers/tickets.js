var app = angular.module('app');

app.controller('TicketsController',function($scope,$rootScope,$timeout,$location,ticketFactory,clienteFactory,tallerFactory, userFactory){

  $scope.tickets = [];
  $scope.usuarios = [];
  $scope.search_field_txt = 'Nombre:';
  $scope.search_field = 'nombre';
  $scope.search_data = '';
  $scope.es_empresa = false;
  $scope.newTicket = {};
  $scope.editMode = false;

  $scope.cantidadPaginas=1;
  $scope.cantidadPorPagina=25;
  $scope.paginaActual=1;

  $scope.clienteForTicket = $rootScope.newTicketClient;
  $scope.tecnicoForTicket = $rootScope.newTicketTecnico;
  $scope.tallerForTicket = $rootScope.newTicketTaller;
  $scope.estadoForTicket = $rootScope.newTicketEstado;

  $scope.talleres = [];
  $scope.showModal = false;
  $scope.showNewClientModal = false;
  $scope.showTecnicoModal = false;
  $scope.showTallerModal = false;
  $scope.showEstadoModal = false;
  $scope.showPedidoModal = false;
  $scope.estados =[];
  $scope.ticket =[];




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

  }
  else if ($location.path()=='/tickets/ver'){
   $scope.editMode = false;
   if ($rootScope.ver_Ticket!==undefined){
     $scope.newTicket=$rootScope.ver_Ticket;
   } else {
     $location.path('/');
   }
 };

  $scope.getAllUsuarios = function(){
    userFactory.getAllUsuarios(function(data){
      $scope.usuarios=data;
    });
  };

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
      $location.path('/tickets/agregar');
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

  $scope.addCliente = function(newClient,es_empresa){
    if (es_empresa){
      newClient.apellido_1=null;
      newClient.apellido_2=null;
    }
    clienteFactory.addCliente($scope.newClient,function(data){
      $scope.clienteForTicket = newClient;
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Cliente agregado con exito.",5000);
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.getTicket = function(){
    ticketFactory.get_Ticket($scope.newTicket.id, function(data){
      $scope.ticket=data;
      console.log($scope.ticket);
        console.log($scope.newTicket.id);
    });
  };

  $scope.editarTicket = function(ticket){
    $rootScope.editTicket = ticket;
    $location.path('/tickets/editar');
  };

  $scope.verTicket = function(ticket){
    $rootScope.ver_Ticket = ticket;
    $location.path('/tickets/ver');
  };

  $scope.toggleModal = function(){
    $scope.showModal = !$scope.showModal;
  };

  $scope.toggleNewClientModal = function(){
    $scope.showNewClientModal = !$scope.showNewClientModal;
  };

  $scope.toggleTecnicoModal = function(){
    $scope.showTecnicoModal = !$scope.showTecnicoModal;
  };

  $scope.toggleTallerModal = function(){
    $scope.showTallerModal = !$scope.showTallerModal;
  };

  $scope.toggleEstadoModal = function(){
    $scope.showEstadoModal = !$scope.showEstadoModal;

  };

  $scope.togglePedidoModal = function(){
    $scope.showPedidoModal = !$scope.showPedidoModal;
  };

  $scope.setCliente = function(cliente){
    $scope.clienteForTicket = cliente;
  };

  $scope.setTecnico = function(tecnico){
    $scope.tecnicoForTicket = tecnico;
    $scope.newTicket.tecnico=tecnico.id;
  };

  $scope.setTaller = function(taller){
    $scope.tallerForTicket = taller;
    $scope.newTicket.taller=taller.id;
  };

  $scope.getAllEstados = function(){
    var aux= $rootScope.constants.status;
    $scope.estados=[aux.RECIBIDO, aux.PRESUPUESTADO, aux.ENCURSO, aux.REPARADO,aux.ENTREGADO, aux.CANCELADO];

  }

  $scope.setEstado = function(estado){
    $scope.estadoForTicket = estado;
    $scope.newTicket.estado = estado.code;
  };

  $scope.$on('$viewContentLoaded', function(){
    $tallerSelect = $("#userSelect").select2();
  });

});
