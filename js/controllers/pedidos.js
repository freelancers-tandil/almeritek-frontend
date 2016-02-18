var app = angular.module('app');

app.controller('PedidosController', function($scope,$rootScope,pedidosFactory,userFactory){

  $scope.loggedUser = null;

  $scope.pedidos = [];


  $scope.initAllPedidos = function(){
    $scope.loggedUser = userFactory.loggedUser();
    if ($scope.loggedUser.rol == $rootScope.constants.roles.ADMIN_ROLE.code){
      pedidosFactory.getAllPedidos(function(data){
        $scope.pedidos=data;
      });
    } else {
      pedidosFactory.getPedidosForLoggedUser(function(data){
        $scope.pedidos=data;
      });
    }

  };

  $scope.initPedidosForTicket = function(ticketId){
    $scope.loggedUser = userFactory.loggedUser();
    if ($scope.loggedUser.rol == $rootScope.constants.roles.ADMIN_ROLE.code){
      pedidosFactory.getPedidosForLoggedUserAndTicket(ticketId,function(data){
        $scope.pedidos=data;
      });
    } else {
      pedidosFactory.getPedidosForLoggedUser(function(data){
        $scope.pedidos=data;
      });
    }
  };

});
