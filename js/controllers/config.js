var app = angular.module('app');

app.controller('ConfigController',function($scope,configFactory){

  $scope.configuration = [];
  $scope.oldValue=[];
  $scope.editing=[];

  $scope.initConfigurationArray = function(){
    configFactory.retrieveConfiguration(function(data){
      $scope.configuration=data;
      console.log(data);
    }, function(data){

    });
  };

  $scope.saveItem = function(index){
    configFactory.saveConfiguration($scope.configuration[index],function(){
      $scope.editing[index]=false;
    },function(){
      $scope.configuration[index].valor=oldValue[index];
      $scope.editing[index]=false;
    });
  };

});
