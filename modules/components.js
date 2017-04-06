var app = angular.module('components', [])
	.directive('timer', timer)
	.controller('timerCtrl', ['$scope', TimerCtrl])
	.filter('datePretty', datePretty);