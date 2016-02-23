'use strict';
var app = angular.module('app', ['ngRoute',
                                  'ngResource',
                                  'ngMd5',
                                  'ui.bootstrap'
                                        ]);


app.config(function($routeProvider,$httpProvider){

  $httpProvider.interceptors.push('httpInterceptor');

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
      requiresLogin: true,
      requiredPermissions: ['ADMIN_ROLE'],
      permissionType: 'AtLeastOne'
    }
  });

  $routeProvider
  	.when('/clientes/listar', {
  		templateUrl: 'views/clientes_listar.html',
    controller: 'ClientesController',
    access : {
      requiresLogin: true,
      requiredPermissions: ['ADMIN_ROLE'],
      permissionType: 'AtLeastOne'
    }
  });

  $routeProvider
   .when('/clientes/agregar', {
     templateUrl: 'views/clientes_agregar.html',
    controller: 'ClientesController',
    access : {
      requiresLogin: true
    }
   });

   $routeProvider
    .when('/clientes/editar', {
      templateUrl: 'views/clientes_agregar.html',
     controller: 'ClientesController',
     access : {
       requiresLogin: true
     }
    });

    $routeProvider
     .when('/clientes/ver', {
       templateUrl: 'views/clientes_ver.html',
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
  	.when('/usuarios/listar', {
  		templateUrl: 'views/usuarios_listar.html',
      controller: 'UsuariosController',
    access : {
      requiresLogin: true
    }
  });

  $routeProvider
  	.when('/config', {
  		templateUrl: 'views/config.html',
      controller: 'ConfigController',
    access : {
      requiresLogin: true,
      requiredPermissions: ['ADMIN_ROLE'],
      permissionType: 'AtLeastOne'
    }
  });

  $routeProvider
    .when('/usuarios/agregar', {
      templateUrl: 'views/usuarios_agregar.html',
      controller: 'UsuariosController',
    access : {
      requiresLogin: true
    }
  });

  $routeProvider
    .when('/usuarios/editar', {
      templateUrl: 'views/usuarios_agregar.html',
      controller: 'UsuariosController',
    access : {
      requiresLogin: true
    }
  });

  $routeProvider
  	.when('/unauthorized', {
  		templateUrl: 'views/unauthorized.html',
    access : {
      requiresLogin: true
    }
  });

  $routeProvider
    .when('/tickets/listar', {
      templateUrl: 'views/tickets_listar.html',
    controller: 'TicketsController',
    access : {
      requiresLogin: true
    }
  });

  $routeProvider
   .when('/tickets/agregar', {
     templateUrl: 'views/tickets_agregar.html',
    controller: 'TicketsController',
    controllerAs: 'TicketCont',
    access : {
      requiresLogin: true
    }
   });

   $routeProvider
    .when('/tickets/editar', {
      templateUrl: 'views/tickets_agregar.html',
     controller: 'TicketsController',
     access : {
       requiresLogin: true
     }
    });

    $routeProvider
      .when('/pedidos/listar', {
        templateUrl: 'views/pedidos_listar.html',
      controller: 'PedidosController',
      access : {
        requiresLogin: true
      }
    });

    $routeProvider
      .when('/pedidos/editar', {
        templateUrl: 'views/pedidos_agregar.html',
      controller: 'PedidosController',
      access : {
        requiresLogin: true
      }
    });

    $routeProvider
     .when('/tickets/ver', {
       templateUrl: 'views/tickets_ver.html',
      controller: 'TicketsController',
      access : {
        requiresLogin: true
      }
     });

});

app.run(function($location,$rootScope,$timeout,userFactory){

  /*
  * Definicion de constantes
  */
  $rootScope.notifications = {
    list: [],
    ERROR: 'error',
    SUCCESS: 'success',
    last_id: 0
  };
  $rootScope.startPaths = [];
  $rootScope.startPaths[0] = '/';
  $rootScope.startPaths[1] = '/tickets/listar';
  $rootScope.constants = {
    status: {
      RECIBIDO: {code:0,text:"Recibido"},
      PRESUPUESTADO: {code:1,text:"Presupuestado"},
      ENCURSO: {code:2,text:"En Curso"},
      REPARADO: {code:3,text:"Reparado"},
      ENTREGADO: {code:4,text:"Entregado"},
      CANCELADO: {code:5,text:"Cancelado"}
    },
    roles: {
      ADMIN_ROLE: {code: 0, value: "ADMIN_ROLE"},
      TECH_ROLE: {code: 1, value: "TECH_ROLE"}
    }
  };

  /*
  *  Metodos cross aplicacion
  */
  $rootScope.addNotification = function(type,text,time){
    if (type===$rootScope.notifications.SUCCESS){
      var index = $rootScope.successNotifications.push({id: $rootScope.notifications.last_id, message: text});
      $rootScope.notifications.last_id++;
      $timeout(function(){
        $rootScope.successNotifications.splice(index-1,1);
      },time);
    } else if (type===$rootScope.notifications.ERROR){
      var index = $rootScope.errorNotifications.push({id: $rootScope.notifications.last_id, message: text});
      $rootScope.notifications.last_id++;
      $timeout(function(){
        $rootScope.errorNotifications.splice(index-1,1);
      },time);
    }
  };


  $rootScope.serverUrl = 'http://localhost/almeritek-backend/index.php';
  $rootScope.isLogged=false;
  $rootScope.successNotifications = [];
  $rootScope.errorNotifications = [];
  $rootScope.loadComplete=false;
  $rootScope.$watch('loadComplete',function(){
    if ($rootScope.loadComplete){
      $rootScope.$on('$routeChangeStart', function (event,next) {
        var authorized = false;
        $rootScope.showSidebar=false;
        var path;
        if (next==undefined){
          var goto = '/';
          if (userFactory.isLoggedIn()){
            $rootScope.showSidebar=true;
            goto=$rootScope.startPaths[userFactory.loggedUser().rol];
          }
          $location.path(goto);
          return;
        }
        if (next.originalPath=='/'){
          path=$rootScope.startPaths[userFactory.loggedUser().rol];
        } else if (next.originalPath!=='/login')
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
              $rootScope.addNotification($rootScope.notifications.ERROR,"Usted no esta autorizado para acceder a esta funcion del sistema.",5000);
              $location.path($rootScope.startPaths[userFactory.loggedUser().rol]);
            }
          }
        }
        if (!userFactory.isLoggedIn()){
          $rootScope.showSidebar=false;
        } else{
          $rootScope.startNavbar = false;
          $rootScope.startNavbar = true;
        }

      });
      if (!userFactory.isLoggedIn()){
        $rootScope.originalPath=$location.path();
        $location.path('/login');
      } else {
        $rootScope.showSidebar=true;
      }
      $rootScope.startNavbar = true;
    }
  });
  userFactory.initFactory();



});

app.filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    });
