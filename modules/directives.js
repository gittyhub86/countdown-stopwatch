function timer() {
	return {
		templateUrl: 'templates/main.html',
		controller: 'timerCtrl',
		controllerAs: 'ctrl'
	};
}

function fadeSec() {
	return {
		restrict: 'A',
		controller: 'timerCtrl',
		link: function(scope, element, attrs) {
			var startOpacity = 0.90;
			function fadeSecsFunc(decrement) {
				console.log(startOpacity)
				if (angular.isNumber(decrement) && decrement > 0) {
					startOpacity -= decrement;
					element.css('opacity', startOpacity);
				}
			}
			var watchsecondsFunc = function(watchScope) {
				return watchScope.$eval('ctrl.fadeSecs');
			}
			scope.$watch(watchsecondsFunc, function(newVal, oldVal) {
				if (oldVal !== undefined) {
					fadeSecsFunc(0.05);
				}
				if (newVal < 0) {
					element.css('opacity', 1);
					startOpacity = 0.90;
				}
			});
		}
	};
}