var app = angular.module('app');

app.controller('PedidosController', function($scope,$rootScope,pedidosFactory,userFactory){

  $scope.loggedUser = null;
  // $scope.editMode = false;
  $scope.pedidos = [];


  // if ($location.path()=='/pedidos/editar'){
  //   $scope.editMode = true;
  //   if ($rootScope.editPedido!==undefined){
  //     pedidosFactory.getPedido($scope.editPedido.ticket,function(data){
  //       $scope.pedidoForTicket = data;
  //       console.log(data);
  //     });
  //    $scope.newPedido=$rootScope.editPedido;
  //   } else {
  //     $location.path('/');
  //   }
  //
  // }

  $scope.crearPedidoTicket = function(pedido){
    $rootScope.newPedidoTicket = pedido;
    $location.path('/pedidos/agregar');
  };

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

  // $scope.editarPedido = function(pedido){
  //   $rootScope.editPedido=pedido;
  //   $location.path('/pedidos/editar');
  // };

});
