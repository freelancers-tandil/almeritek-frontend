var app = angular.module('app');

app.controller('LoginController',function($scope,$rootScope,$location,userFactory,md5){

  $scope.username="";
  $scope.password="";

  $scope.checkLogged = function(){

  }

  $scope.checkLogged();

  $scope.login = function(){
    userFactory.login($scope.username,$scope.password,function(logged){
      if (logged!==false){
        $location.path($rootScope.startPaths[userFactory.loggedUser().rol]);
      }
    },function(data){
      $scope.password="";
      $rootScope.addNotification($rootScope.notifications.ERROR,data.error.message,5000);
    });
  };


  $scope.checkEnabled = function(){
    if (($scope.username!="") && ($scope.password!="")){
      return true;
    } else {
      return false;
    }
  }

});
