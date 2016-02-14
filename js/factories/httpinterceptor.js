var app = angular.module('app');

app.factory('httpInterceptor', [ '$location','$rootScope','$q',function($location,$rootScope,$q){

  var httpInterceptor = {
    responseError: function(response) {
            // Session has expired
            if (response.status == 401){
                if ($rootScope.isLogged){
                  $rootScope.addNotification($rootScope.notifications.ERROR,"Usted no esta autorizado a acceder a este contenido del sistema.",5000);
                  $location.path('/');
                } else{
                  $location.path('/login');
                }
            }
            return $q.reject(response);
        }

  };
  return httpInterceptor;

}]);
