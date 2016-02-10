var app = angular.module('app');

app.controller('DashboardController', function($scope,$location,clienteFactory){

  $scope.clientes={cantidad : 0};

  clienteFactory.getCantidadClientes(function(cantidad){
    $scope.clientes.cantidad=cantidad;
  });
  $scope.goTo = function(data){
    $location.path(data);
  };

});
