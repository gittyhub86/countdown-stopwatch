function datePretty() {
	function convertToCivilian(str, hour) {
		var mapHour = { '13': '1', '14': '2', '15': '3',
		'16': '4', '17': '5', '18': '6', '19': '7', '20': '8',
		'21': '9', '22': '10', '23': '11', '24': '12' };
		var arr = str.split(' ');
		var minElem = arr[arr.length-1].split(':')[1];
		arr[arr.length-1] = hour;
		arr[arr.length-1] = mapHour[arr[arr.length-1]];
		var newStr = arr.join(' ');
		return newStr + ':' + minElem;
	}

	return function(val) {
		if (val) {
			var dateStr = val.toString();
			var strPretty = dateStr.replace(/:\d\d\s.+/, '', '')
			var parseHour = dateStr.match(/\d\d\d\d\s\d\d/);
			var hour = parseHour[0].split(' ')[1];
			(hour=='00') ? strPretty=strPretty.replace(hour, '12') + ' ' + 'AM'
			: (hour<'12') ? strPretty=strPretty + ' ' + 'AM'
			: (hour=='12') ? strPretty=strPretty + ' ' + 'PM'
			: strPretty=convertToCivilian(strPretty, hour) + ' ' + 'PM';
			return strPretty;
		}  else {
			return val;
		}
	}
}

function stopWatchPretty() {
	return function(val) {
		if (val) {
			var seconds = Math.floor((val/1000) % 60);
			var minutes = Math.floor((val/1000/60) % 60);
			var hours = Math.floor((val/(1000*60*60)) % 24);
			var ms = Math.floor((val/100) % 10);
			if (hours < 10) hours = '0' + hours;
			if (minutes < 10) minutes = '0' + minutes;
			if (seconds < 10) seconds = '0'+ seconds;
			var str = hours + ':' + minutes + ':' + seconds + '.' + ms;
			return str;
		}  else {
			return val;
		}
	}
}