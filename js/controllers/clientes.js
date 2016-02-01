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
    //$rootScope.successNotifications.push('Cliente agregado con exito.');
  };

  $scope.editarCliente = function(cliente){
    $rootScope.editClient = cliente;
    $location.path('/clientes/editar');
  };
});
