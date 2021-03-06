var app = angular.module('app');

app.factory('userFactory', [ '$http', '$rootScope', '$location', 'md5', function($http,$rootScope,$location,md5){

  var userFactory = {};
  userFactory.user = null;
  userFactory.isLogged = false;
  userFactory.role_constants = [];
  userFactory.role_constants[0] = 'ADMIN_ROLE';
  userFactory.role_constants[1] = 'TECH_ROLE';

  userFactory.checkServerLogin = function(success,error){
    $http.post($rootScope.serverUrl+'/user/checklogin').then(success,error);
  }

  userFactory.initFactory = function(){
    userFactory.checkServerLogin(function(data){
      userFactory.isLogged=true;
      $rootScope.isLogged=true;
      userFactory.user=data.data;
      $rootScope.loadComplete=true;
    },function(data){
      userFactory.isLogged=false;
      $rootScope.isLogged=false;
      $rootScope.loadComplete=true;
    });
  };

  userFactory.login = function(user, password,success,error){
    var pass=
    usuario = {
      username:user,
      password:md5.createHash(password)
    };
    $http.post($rootScope.serverUrl+'/user/login',"json="+JSON.stringify(usuario)).success(function(data){
      userFactory.user = data;
      userFactory.isLogged = true;
      $rootScope.isLogged=true;
      success(userFactory.user);
    }).error(function(data){
      error(data);
    });
  };

  userFactory.isLoggedIn = function () {
    return userFactory.isLogged;
  }

  userFactory.loggedUser = function(){
    return userFactory.user;
  }

  userFactory.hasAuthorization = function(route){
    if (route.access !== undefined){
      var accessRules = route.access;
      if ((accessRules.requiresLogin)){
        if ((userFactory.isLogged)){
          if (accessRules.requiredPermissions!==undefined){
            var auth=false;
            for (var role in accessRules.requiredPermissions) {
              if (accessRules.requiredPermissions[role]==userFactory.role_constants[userFactory.user.rol]) {
                auth=true;
              }
            }
            return auth;
          }
        } else {
          return false;
        }
      }
    }
    return true;
  }

  userFactory.hasRole = function(role){
    return role==userFactory.role_constants[userFactory.user.rol];
  }

  userFactory.getAllUsuarios = function(callback){
    $http.get($rootScope.serverUrl+'/user/list').success(function(data){
      callback(data);
    }).error(function(){
      callback(false);
    });
  };

  userFactory.getUser=function(user, callback){
    $http.get($rootScope.serverUrl + "/user/user/"+user).success(function(data){
      callback(data);
    }).error(function(data){
      callback(0);
    });
  };


  userFactory.addUsuario = function(user,success,error){
    user.password = md5.createHash(user.password);
    $http.post($rootScope.serverUrl+"/user","json="+JSON.stringify(user)).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };

  userFactory.saveUsuario = function(user,success,error){
    $http.put($rootScope.serverUrl+"/user","json="+JSON.stringify(user)).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };

  userFactory.deleteUsuario = function(user,success,error){
    $http({
      method: 'DELETE',
      url: $rootScope.serverUrl+"/user",
      data: JSON.stringify(user)
    }).success(function(data){
      success(data);
    }).error(function(data){
      error(data);
    });
  };

  userFactory.logout = function(){
    $http.get($rootScope.serverUrl+'/user/logout');
    userFactory.user={};
    userFactory.isLogged = false;
    $rootScope.startNavbar=true;
    $location.path('/login');
  }

  return userFactory;

}]);
