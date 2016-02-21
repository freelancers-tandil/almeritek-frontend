var app = angular.module('app');

app.controller('ClientesController',function($scope,$rootScope,$timeout,$location,clienteFactory, ticketFactory){

  $scope.clientes = [];
  $scope.search_field_txt = 'Nombre:';
  $scope.search_field = 'nombre';
  $scope.search_data = '';
  $scope.es_empresa = false;
  $scope.newClient = {};
  $scope.editMode = false;
  $scope.cantidadPaginas=1;
  $scope.cantidadPorPagina=25;
  $scope.paginaActual=1;
  $scope.ticketsCliente =[];

  if ($location.path()=='/clientes/editar'){
    $scope.editMode = true;
    if ($rootScope.editClient!==undefined){
      $scope.newClient=$rootScope.editClient;
    } else {
      $location.path('/');
    }
  } else if ($location.path()=='/clientes/ver'){
    $scope.editMode = false;
    if ($rootScope.verClient!==undefined){
      $scope.newClient=$rootScope.verClient;
      if ($scope.newClient.tipo_cliente!=0) {
        $scope.es_empresa=true;
      } else{
        $scope.es_empresa=false;
      }
    } else {
      $location.path('/');
    }
  }

  $scope.getAllTicketsForClient=function(){
    clienteFactory.getAllTicketsForClient($scope.newClient.id, function(data){
      $scope.ticketsCliente=data;
      console.log($scope.ticketsCliente);
        console.log($scope.newClient.id);
    });
  };

  $scope.initPagedList = function(){
    clienteFactory.getCantidadClientes(function(data){
      aux = ((data / $scope.cantidadPorPagina)|0);
      aux < (data/$scope.cantidadPorPagina) ? $scope.cantidadPaginas = (aux+1) : $scope.cantidadPaginas=aux;
    });
    clienteFactory.getPagedClientes(1,$scope.cantidadPorPagina,function(data){
      $scope.clientes=data;
    });
  };

  $scope.loadPage = function(page){
    if ($scope.search_data==""){
      clienteFactory.getPagedClientes(page,$scope.cantidadPorPagina,function(data){
        $scope.paginaActual=page;
        $scope.clientes=data;
      });
    } else {
      clienteFactory.searchClientes($scope.search_data,page,$scope.cantidadPorPagina,function(data){
        $scope.paginaActual=page;
        $scope.clientes=data;
      });
    }
  };

  $scope.getPages = function(){
    return new Array($scope.cantidadPaginas);
  };

  $scope.getAllClientes = function(){
    clienteFactory.getAllClientes(function(data){
      $scope.clientes=data;
    });
  };

  $scope.addCliente = function(){
    if ($scope.es_empresa){
      $scope.newClient.apellido_1=null;
      $scope.newClient.apellido_2=null;
      $scope.newClient.tipo_cliente=1;
    } else{
      $scope.newClient.tipo_cliente=0;
    }
    clienteFactory.addCliente($scope.newClient,function(data){
      $scope.newClient = {};
      $location.path('/clientes/listar');
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Cliente agregado con exito.",5000);
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.saveCliente = function(){
    if ($scope.es_empresa){
      $scope.newClient.apellido_1=null;
      $scope.newClient.apellido_2=null;
      $scope.newClient.tipo_cliente=1;
    } else{
      $scope.newClient.tipo_cliente=0;
    }
    clienteFactory.saveCliente($scope.newClient,function(data){
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Cliente guardado con exito.",5000);
      $scope.newClient = {};
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.deleteCliente = function(indice){
    clienteFactory.deleteCliente($scope.clientes[indice],function(data){
      $scope.clientes.splice(indice,1);
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Cliente eliminado con exito.",5000);
      $scope.newClient = {};
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.editarCliente = function(cliente){
    $rootScope.editClient = cliente;
    $location.path('/clientes/editar');
  };

  $scope.verCliente = function (cliente){
    $rootScope.verClient = cliente;
    $location.path ('/clientes/ver');
  };

  $scope.crearTicketCliente = function(cliente){
    $rootScope.newTicketClient = cliente;
    $location.path('/tickets/agregar');
  };

  $scope.updateSearch = function(){
    if ($scope.search_data==""){
      $scope.initPagedList();
    } else {
      clienteFactory.searchCantidadClientes($scope.search_data,function(data){
        aux = ((data / $scope.cantidadPorPagina)|0);
        aux < (data/$scope.cantidadPorPagina) ? $scope.cantidadPaginas = (aux+1) : $scope.cantidadPaginas=aux;
      });
      clienteFactory.searchClientes($scope.search_data,1,$scope.cantidadPorPagina,function(data){
        $scope.paginaActual=1;
        $scope.clientes=data;

      });
    }
  };
});
