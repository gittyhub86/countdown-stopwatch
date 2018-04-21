function TimerCtrl($scope, dateService) {
	const now = new Date();
	const requestAnimationFrame = window.requestAnimationFrame ||
								  window.webkitRequestAnimationFrame ||
								  window.mozRequestAnimationFrame ||
								  window.oRequestAnimationFrame ||
								  window.msRequestAnimationFrame;
	const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	this.monthVal = now.getMonth() + 1;
	this.yearVal = now.getFullYear();
	this.dateVal = now.getDate();
	this.hourVal = now.getHours();
	this.minuteVal = 0;
	this.seconds;
	this.minutes;
	this.hours;
	this.days;
	this.invalidTime;
	this.countdownComplete;
	this.clickedStop;
	this.countdown = countdown;
	this.stopCountdown = stopCountdown;
	this.disableButton = false;
	this.getUserDate = getUserDate;

	function countdown() {
		this.invalidTime = false;
		this.countdownComplete = false;
		this.errArr = [];
		let errs = dateService.validDate(this.yearVal, this.monthVal,this.dateVal,
												this.hourVal, this.minuteVal);
		if (errs.length > 0) {
			this.userDate = null;
			this.errArr = [...errs];
			this.stopCountdown();
			return;
		}
		dateService.createUserDate();
		if (dateService.checkFutureDate() < 0) {
			this.validDate = false;
			this.invalidTime = true;
		}
		else {
			this.validDate = true;
			this.invalidTime = false;
			this.disableButton = true;
			$scope.$emit('start');
		}

	}
	function getUserDate() {
		return dateService.getUserDate();
	}

	function stopCountdown() {
		$scope.$emit('stop');
	}
}

function StopWatchCtrl($scope) {
	this.started;
	this.startTime;
	this.time = '0';
	this.start = start;
	this.pause = pause;
	this.pausedTime = 0;
	this.reset = reset;

	function pause() {
		$scope.$emit('pause');
	}
	function reset(){
		$scope.$emit('reset');
	}
	function start(){
		$scope.$emit('start');
	}
}