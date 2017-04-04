var app = angular.module('components', [])
	.directive('timer', timer)
	.controller('timerCtrl',TimerCtrl);