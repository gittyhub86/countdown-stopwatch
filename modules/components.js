var app = angular.module('components', [])
	.directive('timer', timer)
	.directive('stopWatch', stopWatch)
	.directive('fadeSec', fadeSec)
	.controller('timerCtrl', ['$scope', TimerCtrl])
	.controller('stopWatchCtrl', ['$scope', StopWatchCtrl])
	.filter('datePretty', datePretty);