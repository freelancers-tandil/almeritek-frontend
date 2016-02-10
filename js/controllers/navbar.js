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
          rolesRequired : ['TECH_ROLE']
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
        { id : 'compras',
          text : 'Compras',
          route : '/admin/compras',
          hasIcon : true,
          icon : 'fa-edit',
          hasSubitems : true,
          subitems : [
            { id: 'urgentes',
              text : 'Ver Urgentes',
              route : '/admin/compras/urgentes',
              hasIcon : true,
              icon : 'fa-exclamation'
            },
            { id : 'agregar',
              text : 'Agregar',
              route : '/admin/compras/agregar',
              hasIcon : true,
              icon : 'fa-plus'
            },
            { id : 'listar',
              text : 'Listar',
              route : '/admin/compras/listar',
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
              text : 'Agregar',
              route : '/usuarios/agregar',
              hasIcon : true,
              icon : 'fa-plus'
            },
            { id : 'listar',
              text : 'Listar',
              route : '/usuarios/listar',
              hasIcon : true,
              icon : 'fa-list'
            }
          ],
          restrictedAccess: false,
          rolesRequired : ['TECH_ROLE']
        },
      ],
  };

  $scope.initDashboard = function(){
    $rootScope.$watch($rootScope.showSidebar,function(){
      $scope.showSidebar = $rootScope.showSidebar;
    });
  };

  $scope.initDashboard();

  $scope.open = function (url){
    $location.path(url);
  };

  $scope.logout = function(){
    userFactory.logout();
    $location.path("/login");
  };

});
