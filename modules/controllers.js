function TimerCtrl($scope) {
	var now = new Date();
	var requestAnimationFrame;
	var requestId;
	this.monthVal = now.getMonth() + 1;
	this.yearVal = now.getFullYear();
	this.dateVal = now.getDate();
	this.hourVal = now.getHours();
	this.minuteVal = 0;
	this.userDate;
	this.seconds;
	this.minutes;
	this.hours;
	this.days;
	this.invalidTime;
	this.nanTime;
	this.countdownComplete;
	this.clickedStop;
	this.countdown = countdown;
	this.stopCountdown = stopCountdown;
	this.disableButton = false;

	var checkFutureDate = () => {
		return this.userDate > new Date();
	}

	var clockAnimation = (time) => {
		if (!time || isNaN(time) || time == 'Infinity') {
			this.nanTime = true;
			resetProperties();
			this.countdownComplete = false;
			return;
		}
		this.seconds = Math.floor((time/1000) % 60);
		this.minutes = Math.floor((time/1000/60) % 60);
		this.hours = Math.floor((time/(1000*60*60)) % 24);
		this.days = Math.floor(time/(1000*60*60*24));

		if (time < 11000) {
			this.fadeSecs = this.seconds;
		}

		if (time < 0) {
			this.validDate = false;
			this.disableButton = false;
			this.clickedStop = false;
			this.stopCountdown();
			return;
		}
		requestId = requestAnimationFrame(update);
	}

	var resetProperties = () => {
		window.cancelAnimationFrame(requestId);
		requestId = undefined;
		if (!this.clickedStop) {
			this.countdownComplete = true;
		}
		this.validDate = false;
		this.disableButton = false;

	}

	var startAnimation = () => {
		requestAnimationFrame = window.requestAnimationFrame
			|| mozRequestAnimationFrame;
		requestAnimationFrame(update);
	}

	var validateDate = () => {
		if (isNaN(this.monthVal) || this.monthVal < 1
			|| this.monthVal > 12) {
			this.errArr.push(
				"Month must be between 1 and 12"
				);
		}
		if (isNaN(this.dateVal) || this.dateVal < 1 ||
			this.dateVal > 31) {
			this.errArr.push(
				"Day must be between 1 and 31")
		}
		if (isNaN(this.hourVal) || this.hourVal < 0 || this.hourVal > 24) {
			this.errArr.push("Hour value must be an integer between 0 and 24");
		}
		if (isNaN(this.minuteVal) || this.minuteVal < 0 ||
			this.minuteVal > 59) {
			this.errArr.push(
				"Minutes must be between 0 and 59"
				)
		}
		if (isNaN(this.yearVal) || this.yearVal < 0) {
			this.errArr.push(
				"Year must be greater than 1"
				)
		}
		if (this.errArr.length > 0) {
			return false;
		} else {
			return true;
		}
	}

	var update = () => {
		var now = new Date();
		var timeRemaining = this.userDate - now;
		$scope.$apply(clockAnimation(timeRemaining));
	}

	function countdown() {
		this.invalidTime = false;
		this.nanTime = false;
		this.countdownComplete = false;
		this.errArr = [];
		this.userDate = new Date(this.yearVal,
				this.monthVal-1, this.dateVal, this.hourVal,
				this.minuteVal);
		if (!validateDate()) {
			this.userDate = null;
			this.stopCountdown();
			return;
		} else if (!checkFutureDate()) {
			this.validDate = false;
			this.invalidTime = true;
		} else {
			this.validDate = true;
			this.invalidTime = false;
			this.disableButton = true;
			startAnimation();
		}
	}

	function stopCountdown() {
		if (requestId) {
			resetProperties();
		}
	}
}

function StopWatchCtrl($scope) {
	var requestAnimationFrame;
	var requestId;
	this.startTime;
	this.time;
	this.nanTime;
	this.start = start;
	this.pause = pause;
	this.reset = reset;

	var displayTime = (now) => {
		var temp = now - this.startTime;
		if (!temp || isNaN(temp) || temp == 'Infinity') {
			this.nanTime = true;
			//resetProperties();
			//this.countdownComplete = false;
			return;
		} else {
			this.time = now - this.startTime;
		}
	}

	var startRequestAnimationFrame = () => {
		requestAnimationFrame = window.requestAnimationFrame
			|| window.mozRequestAnimationFrame;
		requestAnimationFrame(update);
	}

	var update = () => {
		var now = new Date();
		$scope.$apply(displayTime(now));
		requestId = requestAnimationFrame(update);
	}

	function pause() {
	}
	function reset(){
	}

	function start() {
		this.startTime = new Date();
		startRequestAnimationFrame();
	}
}