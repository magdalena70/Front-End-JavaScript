require(['container', 'section', 'item', 'errorMessage'],function(Container, Section, Item){
	'use strict'
	
	function getCurrDayName(date){
		var currDate = date,
		currDay = currDate.getDay(),
		currDayName = '';
			
		switch(currDay){
			case 0: currDayName = 'Sunday'
			break;
			case 1: currDayName = 'Monday'
			break;
			case 2: currDayName = 'Tuesday'
			break;
			case 3: currDayName = 'Wednesday'
			break;
			case 4: currDayName = 'Thurstday'
			break;
			case 5: currDayName = 'Friday'
			break;
			case 6: currDayName = 'Saturday'
			break;
			default: break;
		}
			
		return currDayName;
	}
		
	var currentDayName = getCurrDayName(new Date()),
		container = new Container(currentDayName + ' TODO List');
		
	container.addToDom('wrapper');
	console.log(container);
});
