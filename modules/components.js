var app = angular.module('components', [])
	.directive('timer', timer)
	.directive('fadeSec', fadeSec)
	.controller('timerCtrl', ['$scope', TimerCtrl])
	.filter('datePretty', datePretty);