var app = angular.module('app');

app.controller('UsuariosController',function($scope,userFactory){

  $scope.usuarios = [];
  $scope.newUsuario = {};



  $scope.getAllUsuarios = function(){
    userFactory.getAllUsuarios(function(data){
      $scope.usuarios=data;
    });
  };

});
