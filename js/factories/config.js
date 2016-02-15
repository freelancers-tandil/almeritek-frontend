var app = angular.module('app');

app.factory('configFactory', ['$http','$rootScope', function($http,$rootScope){

  var configFactory = {};


  configFactory.retrieveConfiguration = function(success,error){
    $http.get($rootScope.serverUrl+'/config').success(function(data){
        success(data);
    }).error(function(data){
      error(data);
    });
  };

  configFactory.saveConfiguration = function(item,success,error){
    $http.put($rootScope.serverUrl+'/config',"json="+JSON.stringify(item)).success(function(){
      success();
    }).error(function(){
      error();
    });
  };


  return configFactory;

}]);
