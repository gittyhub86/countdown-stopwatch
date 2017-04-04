function TimerCtrl() {
	var now = new Date();
	this.monthVal = now.getMonth() + 1;
	this.yearVal = now.getFullYear();
	this.dateVal = now.getDate();
	this.hourVal = now.getHours();
	this.minuteVal = 0;
	this.userDate;
	this.countdown = countdown;

	function countdown() {
		this.errArr = [];
		if (!validateDate()) {
			console.log('This is not a valid date');
			return;
		}  else {
			console.log('That is a valid date');
			this.userDate = new Date(this.yearVal,
				this.monthVal-1, this.dateVal, this.hourVal,
				this.minuteVal);
			console.log(this.userDate);
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
				"Hour must be between 0 and 24")
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
}