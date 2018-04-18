var app = angular.module('components', [])
	.directive('timer', timer)
	.directive('stopWatch', stopWatch)
	.directive('fadeSec', fadeSec)
	.controller('timerCtrl', ['$scope', 'dateService', TimerCtrl])
	.controller('stopWatchCtrl', ['$scope', StopWatchCtrl])
	.service('dateService', dateService)
	.filter('datePretty', datePretty)
	.filter('stopWatchPretty', stopWatchPretty);