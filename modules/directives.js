function timer() {
	return {
		templateUrl: 'templates/main.html',
		controller: 'timerCtrl',
		controllerAs: 'ctrl'
	};
}

function stopWatch() {
	return {
		templateUrl: 'templates/stopwatch.html',
		controller: 'stopWatchCtrl',
		controllerAs: 'stopWatch'
	};
}

function fadeSec() {
	return {
		restrict: 'A',
		controller: 'timerCtrl',
		link: function(scope, element, attrs) {
			let startOpacity = 0.90;
			function fadeSecsFunc(decrement) {
				if (angular.isNumber(decrement) && decrement > 0) {
					startOpacity -= decrement;
					element.css('opacity', startOpacity);
				}
			}
			const watchsecondsFunc = function(watchScope) {
				return watchScope.$eval('ctrl.fadeSecs');
			}
			scope.$watch(watchsecondsFunc, function(newVal, oldVal) {
				if (oldVal !== undefined && newVal >= 0) {
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

function timeComponents(dateService) {
	const requestAnimationFrame = window.requestAnimationFrame ||
								  window.webkitRequestAnimationFrame ||
								  window.mozRequestAnimationFrame ||
								  window.oRequestAnimationFrame ||
								  window.msRequestAnimationFrame;
	const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	let requestId;
	return {
		restrict: 'E',
		controller: 'timerCtrl as ctrl',
		link: function(scope, element, attrs) {
			function resetProperties () {
				cancelAnimationFrame(requestId);
				requestId = undefined;
				scope.$evalAsync(() => {
					if (!scope.ctrl.clickedStop) {
						scope.ctrl.countdownComplete = true;
					}
					scope.ctrl.seconds = '';
					scope.ctrl.minutes = '';
					scope.ctrl.hours = '';
					scope.ctrl.days = '';
					scope.ctrl.validDate = false;
					scope.ctrl.disableButton = false;
					scope.ctrl.fadeSecs = -1;
				});
			}
			function startAnimation () {
				requestAnimationFrame(update);
			}
			function update () {
				const now = new Date();
				const timeRemaining = dateService.getUserDate() - now;
				scope.$evalAsync(() => {
					scope.ctrl.seconds = Math.floor((timeRemaining/1000) % 60);
					scope.ctrl.minutes = Math.floor((timeRemaining/1000/60) % 60);
					scope.ctrl.hours = Math.floor((timeRemaining/(1000*60*60)) % 24);
					scope.ctrl.days = Math.floor(timeRemaining/(1000*60*60*24));

					if (timeRemaining < 11000) {
						scope.ctrl.fadeSecs = scope.ctrl.seconds;
					}
					if (timeRemaining < 0) {
						scope.ctrl.validDate = false;
						scope.ctrl.disableButton = false;
						scope.ctrl.clickedStop = false;
						scope.ctrl.stopCountdown();
						return;
					}
					requestId = requestAnimationFrame(update);
				});
			}
			scope.$on('start', () => {
				startAnimation();
			});
			scope.$on('stop', () => {
				if (requestId) {
					resetProperties();
				}
			});
		}
	}
}

function stopWatchDirective() {
	let requestId;
	const requestAnimationFrame = window.requestAnimationFrame ||
								  window.webkitRequestAnimationFrame ||
								  window.mozRequestAnimationFrame ||
								  window.oRequestAnimationFrame ||
								  window.msRequestAnimationFrame;
	const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	return {
		restrict: 'A',
		controller: 'stopWatchCtrl as stopWatch',
		link: function(scope, element, attrs) {
			function displayTime () {
				const now = new Date();
				if (!scope.stopWatch.startTime) {
					scope.stopWatch.startTime = new Date();
				}
				else {
					scope.stopWatch.time = (now - scope.stopWatch.startTime) + scope.stopWatch.pausedTime;
				}
			}
			function update () {
				scope.$apply(displayTime);
				requestId = requestAnimationFrame(update);
			}
			scope.$on('start', () => {
				scope.$evalAsync(() => {
					scope.stopWatch.started = true;
				});
				requestAnimationFrame(update);
			});
			scope.$on('pause', () => {
				if (requestId) {
					cancelAnimationFrame(requestId);
					scope.$evalAsync(() => {
						scope.stopWatch.pausedTime = scope.stopWatch.time;
						scope.stopWatch.startTime = null;
						scope.stopWatch.started = false;
					});
				}
			});
			scope.$on('reset', () => {
				if (requestId) {
					cancelAnimationFrame(requestId);
					requestId = null;
					scope.$evalAsync(() => {
						scope.stopWatch.startTime = null;
						scope.stopWatch.pausedTime = 0;
						scope.stopWatch.time = '0';
						scope.stopWatch.started = false;
					});
				}
			});
		}
	}
}