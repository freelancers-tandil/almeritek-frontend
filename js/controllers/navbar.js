var app = angular.module('app');

app.controller('NavBarController', function($scope,$location,$rootScope,userFactory){


  $scope.sidebar = {
      items : [
        {
          id : 'dashboard',
          text : 'Cuadro de Mando',
          route : '/',
          hasIcon : true,
          icon : 'fa-dashboard',
          hasSubitems : false,
          restrictedAccess: false
        },
        { id : 'clientes',
          text : 'Clientes',
          route : '/clientes',
          hasIcon : true,
          icon : 'fa-money',
          hasSubitems : true,
          subitems : [
            { id: 'agregar',
              text : 'Agregar',
              route : '/clientes/agregar',
              hasIcon : true,
              icon : 'fa-plus'
            },
            { id : 'listar',
              text : 'Listar',
              route : '/clientes/listar',
              hasIcon : true,
              icon : 'fa-list'
            }
          ],
          is_open : false,
          restrictedAccess: true,
          rolesRequired : ['ADMIN_ROLE']
        },
        { id : 'tickets',
          text : 'Tickets',
          route : '/tickets',
          hasIcon : true,
          icon : 'fa-list-alt',
          hasSubitems : true,
          subitems : [
            { id : 'agregar',
              text : 'Agregar',
              route : '/tickets/agregar',
              hasIcon : true,
              icon : 'fa-plus'
            },
            { id : 'listar',
              text : 'Listar',
              route : '/tickets/listar',
              hasIcon : true,
              icon : 'fa-list'
            }
          ],
          is_open : false,
          restrictedAccess: false,
          rolesRequired : ['TECH_ROLE']
        },
        { id : 'pedidos',
          text : 'Pedidos',
          route : '/pedidos',
          hasIcon : true,
          icon : 'fa-edit',
          hasSubitems : true,
          subitems : [
            { id: 'urgentes',
              text : 'Ver Urgentes',
              route : '/pedidos/urgentes',
              hasIcon : true,
              icon : 'fa-exclamation'
            },
            { id : 'listar',
              text : 'Listar',
              route : '/pedidos/listar',
              hasIcon : true,
              icon : 'fa-list'
            }
          ],
          is_open : false,
          restrictedAccess: false,
          rolesRequired : ['TECH_ROLE']
        },
        { id: 'configuracion',
          text : 'Configuracion',
          route : '/configuracion',
          hasIcon : true,
          icon : 'fa-wrench',
          hasSubitems : true,
          subitems : [
            { id : 'agregar',
              text : 'Agregar Usuarios',
              route : '/usuarios/agregar',
              hasIcon : true,
              icon : 'fa-plus'
            },
            { id : 'listar',
              text : 'Listar Usuarios',
              route : '/usuarios/listar',
              hasIcon : true,
              icon : 'fa-list'
            }
          ],
          restrictedAccess: true,
          rolesRequired : ['ADMIN_ROLE']
        },
      ],
  };

  $scope.initDashboard = function(){
    $rootScope.$watch($rootScope.showSidebar,function(){
      $scope.showSidebar = $rootScope.showSidebar;
      if ($scope.showSidebar){
        $scope.sidebar.items.forEach(function(item,index,ar){
          if (item.hasSubitems){
            item.subitems.forEach(function(subitem,index,ar){
              subitem.visible = $scope.canView(subitem);
            });
          }
          item.visible = $scope.canView(item);
        });
      }
    });
  };

  $rootScope.$watch('startNavbar',function(){
    if ($rootScope.startNavbar){
      $scope.initDashboard();
      $rootScope.startNavbar=false;
    }
  });

  $scope.open = function (url){
    $location.path(url);
  };

  $scope.logout = function(){
    userFactory.logout();
    $location.path("/login");
  };

  $scope.canView = function(menu){
    if ((menu.restrictedAccess!=undefined)&&(menu.restrictedAccess)){
      for (var role in menu.rolesRequired){
          if (userFactory.hasRole(menu.rolesRequired[role])){
            return true;
          }
      }
      return false;
    } else {
      return true;
    }
  };

});
