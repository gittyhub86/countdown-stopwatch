function TimerCtrl($scope) {
	var now = new Date();
	var requestAnimationFrame;
	var requestId;
	this.validDate = true;
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
	this.countdown = countdown;
	this.startAnimation = startAnimation;

	function countdown() {
		this.errArr = [];
		if (!validateDate()) {
			return;
		}  else {
			this.userDate = new Date(this.yearVal,
				this.monthVal-1, this.dateVal, this.hourVal,
				this.minuteVal);
			this.startAnimation();
		}
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
		requestId = requestAnimationFrame(update);
	}

	function startAnimation() {
		requestAnimationFrame = window.requestAnimationFrame
			|| mozRequestAnimationFrame;
		requestAnimationFrame(update);
	}

	var clockAnimation = (time) => {
		this.seconds = Math.floor((time/1000) % 60);
		this.minutes = Math.floor((time/1000/60) % 60);
		this.hours = Math.floor((time/(1000*60*60)) % 24);
		this.days = Math.floor(time/(1000*60*60*24));
	}
}