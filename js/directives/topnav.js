var app = angular.module('app');

app.directive("topNavBar",function(){
	return {
		restrict: 'E',
		templateUrl: 'views/navbar.html',
		controller: 'NavBarController',
		replace: true
  };
});
