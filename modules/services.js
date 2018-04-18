function dateService() {
	let userDate;
	let month;
	let day;
	let hour;
	let minute;
	let year;
	return {
		createUserDate: function() {
			userDate = new Date(year,
				month-1, day, hour,
				minute);
		},
		getUserDate: function() {
			return userDate;
		},
		validDate: function(yearVal, monthVal, dayVal, hourVal, minuteVal) {
			const errArr = [];
			if (isNaN(monthVal) || monthVal < 1 || monthVal > 12) {
				errArr.push("Month must be between 1 and 12");
			} else {
				month = monthVal;
			}
			if (isNaN(dayVal) || dayVal < 1 || dayVal > 31) {
				errArr.push("Day must be between 1 and 31");
			} else {
				day = dayVal;
			}
			if (isNaN(hourVal) || hourVal < 0 || hourVal > 24) {
				errArr.push("Hour value must be an integer between 0 and 24");
			} else {
				hour = hourVal;
			}
			if (isNaN(minuteVal) || minuteVal < 0 || minuteVal > 59) {
				errArr.push("Minutes must be between 0 and 59");
			} else {
				minute = minuteVal;
			}
			if (isNaN(yearVal) || yearVal < 0) {
				errArr.push("Year must be greater than 1");
			} else {
				year = yearVal;
			}
			return errArr;
		},
		checkFutureDate: function() {
			return userDate - new Date();
		}
	}
}