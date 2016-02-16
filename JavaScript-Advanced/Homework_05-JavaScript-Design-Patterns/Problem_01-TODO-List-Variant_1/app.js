(function(){
	function getCurrDayName(){
		var currDate = new Date().toDateString(),
		currDay = currDate.split(' ')[0],
		currDayName = '';
		
		switch(currDay){
			case 'Sun': currDayName = 'Sunday'
			break;
			case 'Mon': currDayName = 'Monday'
			break;
			case 'Tue': currDayName = 'Tuesday'
			break;
			case 'Wed': currDayName = 'Wednesday'
			break;
			case 'Thu': currDayName = 'Thursday'
			break;
			case 'Fri': currDayName = 'Friday'
			break;
			case 'Sat': currDayName = 'Saturday'
			break;
			default: break;
		}
		
		return currDayName;
	}
	
	
	var containerTitle = getCurrDayName() + ' <span>TODO</span> List',
	container = models.getContainer(containerTitle)
		.addToDom('#wrapper');
	document.getElementById('date').innerText = new Date().toDateString();
}());