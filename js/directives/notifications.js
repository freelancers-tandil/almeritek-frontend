var app = angular.module('app');

app.directive("notifications",function(){
	return {
		restrict: 'E',
		templateUrl: 'views/notifications.html',
		replace: true
  };
});
