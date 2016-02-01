var app = angular.module('app');

app.controller('ClientesController',function($scope,clienteFactory){

  $scope.clientes = [];
  $scope.search_field_txt = 'Nombre:';
  $scope.search_field = 'nombre';
  $scope.search_data = '';
  $scope.es_empresa = false;

  $scope.getAllClientes = function(){
    clienteFactory.getAllClientes(function(data){
      $scope.clientes=data;
    });
  }

});
