function dateTimeProperty(){
	var refresh = 1000; // Refresh in milli seconds
	setTimeout('displayCurrentTime()',refresh)
}

function displayCurrentTime() {
	var date = new Date();
	var currentDate = date.toDateString();
	var currentHours = date.getHours();
	if(currentHours < 10){
		currentHours = "0" + currentHours;
	}

	var currentMinutes = date.getMinutes();
	if(currentMinutes < 10){
		currentMinutes = "0" + currentMinutes;
	}

	var currentSeconds = date.getSeconds();
	if(currentSeconds < 10){
		currentSeconds = "0" + currentSeconds;
	}

	var currentTime = currentHours + ":" + currentMinutes + ":" + currentSeconds;
	document.getElementById('date').innerHTML = currentDate;
	document.getElementById('clock').innerHTML = currentTime;

	dateTimeProperty();
}