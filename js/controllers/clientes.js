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
      var index = $rootScope.successNotifications.push('Cliente agregado con exito.');
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

  $scope.saveCliente = function(){
    if ($scope.es_empresa){
      $scope.newClient.apellido_1=null;
      $scope.newClient.apellido_2=null;
    }
    clienteFactory.saveCliente($scope.newClient,function(data){
      var index = $rootScope.successNotifications.push('Cliente guardado con exito.');
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

  $scope.deleteCliente = function(indice){
    clienteFactory.deleteCliente($scope.clientes[indice],function(data){
      $scope.clientes.splice(indice,1);
      var index = $rootScope.successNotifications.push('Cliente eliminado con exito.');
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

  $scope.editarCliente = function(cliente){
    $rootScope.editClient = cliente;
    $location.path('/clientes/editar');
  };

  $scope.crearTicketCliente = function(cliente){
    $rootScope.newTicketClient = cliente;
    $location.path('/tickets/agregar');

  }
});
