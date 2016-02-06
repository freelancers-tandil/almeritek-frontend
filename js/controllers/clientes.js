var app = angular.module('app');

app.controller('ClientesController',function($scope,$rootScope,$timeout,$location,clienteFactory){

  $scope.clientes = [];
  $scope.search_field_txt = 'Nombre:';
  $scope.search_field = 'nombre';
  $scope.search_data = '';
  $scope.es_empresa = false;
  $scope.newClient = {};
  $scope.editMode = false;

  if ($location.path()=='/clientes/editar'){
    $scope.editMode = true;
    if ($rootScope.editClient!==undefined){
      $scope.newClient
      $scope.newClient=$rootScope.editClient;
      console.log($scope.editClient);
    } else {
      $location.path('/');
    }
  }

  $scope.getAllClientes = function(){
    clienteFactory.getAllClientes(function(data){
      $scope.clientes=data;
    });
  };

  $scope.addCliente = function(){
    if ($scope.es_empresa){
      $scope.newClient.apellido_1=null;
      $scope.newClient.apellido_2=null;
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

  $scope.crearTicketCliente = function(cliente){
    $rootScope.newTicketClient = cliente;
    $location.path('/tickets/agregar');

  }
});
