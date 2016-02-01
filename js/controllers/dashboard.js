var app = angular.module('app');

app.controller('DashboardController', function($scope,clienteFactory){

  $scope.clientes={cantidad : 0};

  clienteFactory.getCantidadClientes(function(cantidad){
    $scope.clientes.cantidad=cantidad;
  });

});
