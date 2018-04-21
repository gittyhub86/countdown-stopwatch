function TimerCtrl($scope, dateService) {
	const now = new Date();
	const requestAnimationFrame = window.requestAnimationFrame ||
								  window.webkitRequestAnimationFrame ||
								  window.mozRequestAnimationFrame ||
								  window.oRequestAnimationFrame ||
								  window.msRequestAnimationFrame;
	const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	let requestId;
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
	const requestAnimationFrame = window.requestAnimationFrame ||
								  window.webkitRequestAnimationFrame ||
								  window.mozRequestAnimationFrame ||
								  window.oRequestAnimationFrame ||
								  window.msRequestAnimationFrame;
	const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	let requestId;
	this.started;
	this.startTime;
	this.time = '0';
	this.start = start;
	this.pause = pause;
	this.pausedTime = 0;
	this.reset = reset;

	const displayTime = () => {
		const now = new Date();
		if (!this.startTime) {
			this.startTime = new Date();
		}
		else {
			this.time = (now - this.startTime) + this.pausedTime;
		}
	}

	const update = () => {
		$scope.$apply(displayTime);
		requestId = requestAnimationFrame(update);
	}

	function pause() {
		if (requestId) {
			cancelAnimationFrame(requestId);
			this.pausedTime = this.time;
			this.startTime = null;
			this.started = false;
		}
	}
	function reset(){
		if (requestId) {
			cancelAnimationFrame(requestId);
			requestId = null;
			this.startTime = null;
			this.pausedTime = 0;
			this.time = '0';
			this.started = false;
		}
	}

	function start(){
		this.started = true;
		requestAnimationFrame(update);
	}
}