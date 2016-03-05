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
  $scope.checkedStatus = 0;

  $scope.cantidadPaginas=1;
  $scope.cantidadPorPagina=25;
  $scope.paginaActual=1;

  $scope.clienteForTicket = $rootScope.newTicketClient;
  $scope.tecnicoForTicket = $rootScope.newTicketTecnico;
  $scope.tallerForTicket = $rootScope.newTicketTaller;
  $scope.estadoForTicket = $rootScope.newTicketEstado

  $scope.recibido = true;
  $scope.presupuestado = true;
  $scope.encurso = true;
  $scope.reparado = false;
  $scope.entregado = false;
  $scope.cancelado = false;
  // console.log($scope.cancelado);


  $scope.talleres = [];
  $scope.showModal = false;
  $scope.showNewClientModal = false;
  $scope.showTecnicoModal = false;
  $scope.showTallerModal = false;
  $scope.showEstadoModal = false;
  $scope.showPedidoModal = false;
  $scope.estados =[];
  $scope.ticket =[];

  $scope.estadoForButtons = 0;


  if ($location.path()=='/tickets/editar'){
    $scope.editMode = true;
    if ($rootScope.editTicket!==undefined){
      clienteFactory.getCliente($rootScope.editTicket.cliente,function(data){
        $scope.clienteForTicket = data;
      });
      tallerFactory.getTaller($rootScope.editTicket.taller,function(data){
        $scope.tallerForTicket = data;
      });
      userFactory.getUser($rootScope.editTicket.tecnico,function(data){
        $scope.tecnicoForTicket = data;
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
     $scope.estadoForButtons=$scope.newTicket.estado;
     $scope.$watch('newTicket.estado',function(newValue,oldValue){
       if (oldValue != newValue){
         ticketFactory.saveTicket($scope.newTicket,function(data){
           $rootScope.addNotification($rootScope.notifications.SUCCESS,"Estado de ticket " + $scope.newTicket.num_ticket + " cambiado a " + $scope.estados[newValue].text + " con exito.",5000);
         },function(data){
           $scope.newTicket.estado = oldValue;
           $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
         });
       }
     });
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
    return $scope.estados;
  }

  $scope.setEstado = function(estado){
    $scope.estadoForTicket = estado;
    $scope.newTicket.estado = estado.code;
  };

  $scope.$on('$viewContentLoaded', function(){
    $tallerSelect = $("#userSelect").select2();
    checkedStatus=$scope.newTicket.estado;
    $scope.getAllEstados();
  });

  $scope.initPagedList = function(){
    ticketFactory.getCantidadTickets(function(data){
      aux = ((data / $scope.cantidadPorPagina)|0);
      aux < (data/$scope.cantidadPorPagina) ? $scope.cantidadPaginas = (aux+1) : $scope.cantidadPaginas=aux;
    });
    var estados = [];
    if($scope.recibido){
      estados.push(0);
    }
    if($scope.presupuestado){
      estados.push(1);
    }
    if($scope.encurso){
      estados.push(2);
    }
    if($scope.reparado){
      estados.push(3);
    }
    if($scope.entregado){
      estados.push(4);
    }
    if($scope.cancelado){
      estados.push(5);
    }
    ticketFactory.getPagedTickets(1,$scope.cantidadPorPagina,estados,function(data){
      $scope.tickets=data;
    });
  };

  $scope.loadPage = function(page){
    if ($scope.search_data==""){
      ticketFactory.getPagedTickets(page,$scope.cantidadPorPagina,function(data){
        $scope.paginaActual=page;
        $scope.tickets=data;
      });
    } else {
      ticketFactory.searchTickets($scope.search_data,page,$scope.cantidadPorPagina,function(data){
        $scope.paginaActual=page;
        $scope.tickets=data;
      });
    }
  };

  $scope.update=function(){
    if($scope.search_data==""){
      $scope.initPagedList();
    } else {
      updateSearch();
    }
  };

  $scope.getPages = function(){
    return new Array($scope.cantidadPaginas);
  };


  $scope.updateSearch = function(){
    if ($scope.search_data==""){
      $scope.initPagedList();
    } else {
      ticketFactory.searchCantidadTickets($scope.search_data,function(data){
        aux = ((data / $scope.cantidadPorPagina)|0);
        aux < (data/$scope.cantidadPorPagina) ? $scope.cantidadPaginas = (aux+1) : $scope.cantidadPaginas=aux;
      });
      var estados = [];
      if($scope.recibido){
        estados.push(0);
      }
      if($scope.presupuestado){
        estados.push(1);
      }
      if($scope.encurso){
        estados.push(2);
      }
      if($scope.reparado){
        estados.push(3);
      }
      if($scope.entregado){
        estados.push(4);
      }
      if($scope.cancelado){
        estados.push(5);
      }
      ticketFactory.searchTickets($scope.search_data,1,$scope.cantidadPorPagina,estados,function(data){
        $scope.paginaActual=1;
        $scope.tickets=data;

      });
    }
  };

  $scope.initEstados = function(){
    var estados = $scope.getAllEstados();
    for (var estado in estados) {
      $scope.checkEstados[estados[estado].code]=$scope.newTicket.estado==estados[estado].code;
    }
  }

  $scope.changeStatus = function(newStatus){

  }

});
