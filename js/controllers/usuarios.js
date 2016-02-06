var app = angular.module('app');

app.controller('UsuariosController',function($scope,$location,$rootScope,$timeout,userFactory){

  $scope.usuarios = [];
  $scope.newUsuario = {};
  $scope.search_field_txt = 'Nombre:';
  $scope.search_field = 'nombre';
  $scope.search_data = '';
  $scope.es_admin = false;
  $scope.editMode = false;
  


  if ($location.path()=='/usuarios/editar'){
    $scope.editMode = true;
    if ($rootScope.editUsuario!==undefined){
      $scope.newUsuario=$rootScope.editUsuario;
    } else {
      $location.path('/');
    }
  }

  $scope.getAllUsuarios = function(){
    userFactory.getAllUsuarios(function(data){
      $scope.usuarios=data;
    });
  };


  $scope.addUsuario = function(){
    if ($scope.es_admin){
      $scope.newUsuario.rol=0;
    } else {
      $scope.newUsuario.rol=1;
    }
    userFactory.addUsuario($scope.newUsuario,function(data){
      $scope.newClient = {};
      $location.path('/usuarios/listar');
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Usuario agregado con exito.",5000);
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.saveUsuario = function(){
    if ($scope.es_admin){
      $scope.newUsuario.rol=0;
    } else {
      $scope.newUsuario.rol=1;
    }
    userFactory.saveUsuario($scope.newClient,function(data){
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Usuario guardado con exito.",5000);
      $scope.newClient = {};
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.deleteUsuario = function(indice){
    userFactory.deleteUsuario($scope.usuarios[indice],function(data){
      $scope.usuarios.splice(indice,1);
      $rootScope.addNotification($rootScope.notifications.SUCCESS,"Usuario eliminado con exito.",5000);
      $scope.newClient = {};
    },function(data){
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };

  $scope.editarUsuario = function(user){
    $rootScope.editUsuario = user;
    $location.path('/usuarios/editar');
  };

});
