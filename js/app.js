'use strict';
var app = angular.module('app', ['ngRoute',
                                  'ngResource',
                                  'ngMd5'
                                        ]);

app.config(function($routeProvider,$httpProvider){

     $routeProvider
     	.when('/login', {
     		templateUrl: 'views/login.html',
         access : {
           requiresLogin: false
         }
     	});

     $routeProvider
     	.when('/', {
     		templateUrl: 'views/admin.html',
        controller: 'DashboardController',
        access : {
          requiresLogin: true
        }
     	});

       $routeProvider
       	.when('/clientes/listar', {
       		templateUrl: 'views/clientes_listar.html',
          controller: 'ClientesController',
          access : {
            requiresLogin: true
          }
       	});

      $routeProvider
      	.when('/user', {
      		templateUrl: 'views/admin.html',
        access : {
          requiresLogin: true,
          requiredPermissions: ['TECH_ROLE'],
          permissionType: 'AtLeastOne'
        }
      });

      $routeProvider
      	.when('/unauthorized', {
      		templateUrl: 'views/unauthorized.html',
        access : {
          requiresLogin: true
        }
      });

});

app.run(function($location,$rootScope,userFactory){
  $rootScope.serverUrl = 'http://localhost/almeritek-backend/index.php';
  $rootScope.isLogged=false;

  $rootScope.loadComplete=false;
  $rootScope.$watch('loadComplete',function(){
    if ($rootScope.loadComplete){
      $rootScope.$on('$routeChangeStart', function (event,next) {
        var authorized = false;
        $rootScope.showSidebar=false;
        var path;
        if (next==undefined){
          if (userFactory.isLoggedIn()){
            $rootScope.showSidebar=true;
          }
          $location.path('/');
          return;
        }
        if (next.originalPath!=='/login')
          path = next.originalPath;
        if ((next.access!==undefined)&&(next.access.requiresLogin)){
          if (userFactory.hasAuthorization(next)){
            $rootScope.showSidebar=true;
            $rootScope.originalPath=path;
          } else {
            $rootScope.showSidebar=false;
            $rootScope.originalPath=path;
            if (!userFactory.isLoggedIn()){
              $location.path('/login');
            }else {
              $location.path('/unauthorized');
            }
          }
        }
        if (!userFactory.isLoggedIn()){
          $rootScope.showSidebar=false;
        }
      });
      if (!userFactory.isLoggedIn()){
        $rootScope.originalPath=$location.path();
        $location.path('/login');
      } else {
        $rootScope.showSidebar=true;
      }
    }
  });
  userFactory.initFactory();
});
