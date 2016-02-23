var app = angular.module('app');

app.controller('PedidosController', function($scope,$rootScope,$location,pedidosFactory,userFactory, ticketFactory){

  $scope.loggedUser = null;
  $scope.editMode = false;
  $scope.pedidos = [];
  $scope.search_data = '';
  $scope.cantidadPaginas=1;
  $scope.cantidadPorPagina=25;
  $scope.paginaActual=1;


  if ($location.path()=='/pedidos/editar'){
    $scope.editMode = true;
    if ($rootScope.editPedido!==undefined){
      pedidosFactory.getPedido($scope.editPedido.id,function(data){
        $scope.pedidoForTicket = data;
        console.log("es el data" + " " + $scope.editPedido.id);
        console.log(data);
      });
     $scope.newPedido=$rootScope.editPedido;
    } else {
      $location.path('/');
    }

  }

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

  $scope.addPedido = function(ticketId){
    $scope.newPedido.ticket = ticketId;
    pedidosFactory.addPedido($scope.newPedido,function(data){
      $scope.newPedido = {};
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Pedido agregado con exito.",5000);
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.deletePedido = function(indice){
    pedidosFactory.deletePedido($scope.pedidos[indice],function(data){
      $scope.pedidos.splice(indice,1);
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Pedido eliminado con exito.",5000);
      $scope.newPedido = {};
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };


  $scope.savePedido = function(){
    $scope.newPedido.ticket = $scope.pedidoForTicket.id;
    pedidosFactory.savePedido($scope.newPedido,function(data){
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Pedido guardado con exito.",5000);
      $scope.newPedido = {};
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.initPagedList = function(){
    pedidosFactory.getCantidadPedidos(function(data){
      aux = ((data / $scope.cantidadPorPagina)|0);
      aux < (data/$scope.cantidadPorPagina) ? $scope.cantidadPaginas = (aux+1) : $scope.cantidadPaginas=aux;
    });
    pedidosFactory.getPagedPedidos(1,$scope.cantidadPorPagina,function(data){
      $scope.pedidos=data;
    });
  };

  $scope.loadPage = function(page){
    if ($scope.search_data==""){
      pedidosFactory.getPagedPedidos(page,$scope.cantidadPorPagina,function(data){
        $scope.paginaActual=page;
        $scope.pedidos=data;
      });
    } else {
      pedidosFactory.searchPedidos($scope.search_data,page,$scope.cantidadPorPagina,function(data){
        $scope.paginaActual=page;
        $scope.pedidos=data;
      });
    }
  };

  $scope.getPages = function(){
    return new Array($scope.cantidadPaginas);
  };


  $scope.updateSearch = function(){
    if ($scope.search_data==""){
      $scope.initPagedList();
    } else {
      pedidosFactory.searchCantidadPedidos($scope.search_data,function(data){
        aux = ((data / $scope.cantidadPorPagina)|0);
        aux < (data/$scope.cantidadPorPagina) ? $scope.cantidadPaginas = (aux+1) : $scope.cantidadPaginas=aux;
      });
      pedidosFactory.searchPedidos($scope.search_data,1,$scope.cantidadPorPagina,function(data){
        $scope.paginaActual=1;
        $scope.pedidos=data;

      });
    }
  };

  $scope.editarPedido = function(pedido){
    $rootScope.editPedido=pedido;
    console.log(pedido);
    $location.path('/pedidos/editar');
  };

});
