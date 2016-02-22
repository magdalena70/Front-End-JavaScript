(function(){
	function getCurrYear(){
		var currDate = new Date().toDateString(),
		currYear = currDate.split(' ')[3];
		
		return currYear;
	}

	function getCurrMonthName(){
		var currDate = new Date().toDateString(),
		currMonth = currDate.split(' ')[1],
		currMonthName = '';
			
		switch(currMonth){
			case 'Jan': currMonthName = 'January'
			break;
			case 'Feb': currMonthName = 'February'
			break;
			case 'Mar': currMonthName = 'March'
			break;
			case 'Apr': currMonthName = 'April'
			break;
			case 'May': currMonthName = 'May'
			break;
			case 'Jun': currMonthName = 'June'
			break;
			case 'Jul': currMonthName = 'July'
			break;
			case 'Aug': currMonthName = 'August'
			break;
			case 'Sep': currMonthName = 'September'
			break;
			case 'Oct': currMonthName = 'October'
			break;
			case 'Nov': currMonthName = 'November'
			break;
			case 'Dec': currMonthName = 'December'
			break;
			default: break;
		}
			
		return currMonthName;
	}

	function getCurrDayName(date){
		var currDate = date,
		currDay = currDate.getDay(),
		currDayName = '';
			
		switch(currDay){
			case 0: currDayName = 'Sun'
			break;
			case 1: currDayName = 'Mon'
			break;
			case 2: currDayName = 'Tue'
			break;
			case 3: currDayName = 'Wed'
			break;
			case 4: currDayName = 'Thu'
			break;
			case 5: currDayName = 'Fri'
			break;
			case 6: currDayName = 'Sat'
			break;
			default: break;
		}
			
		return currDayName;
	}

	function currMonthDayCount(){
		var dayCount = 0, currMonth = getCurrMonthName();
		
		switch(currMonth){
			case 'January': dayCount = 31;
			break;
			case 'February': dayCount = 29;
			break;
			case 'March': dayCount = 31;
			break;
			case 'April': dayCount = 30;
			break;
			case 'May': dayCount = 31;
			break;
			case 'June': dayCount = 30;
			break;
			case 'July': dayCount = 31;
			break;
			case 'August': dayCount = 31;
			break;
			case 'September': dayCount = 30;
			break;
			case 'October': dayCount = 31;
			break;
			case 'November': dayCount = 30;
			break;
			case 'December': dayCount = 31;
			break;
			default: break;
		}
		
		return dayCount;
	}

	// create Calendar
	var title = getCurrMonthName(),
	calendarContainer = models.getContainer(title),	
	currMonth= new Date().getMonth(),
	dayCount = currMonthDayCount(),
	wrapperTitle = document.getElementById('wrapperTitle'),
	dayContainer, count, day, dayToHtmlElem, itemsLength, i, divEmpty;
	
	for(count = 0; count < dayCount; count++){
		dayContainer = models.getItem(getCurrDayName(new Date(getCurrYear(), currMonth, count+1)));
		calendarContainer.addItem(dayContainer);
	}
	
	wrapperTitle.innerText = 'Calendar ' + getCurrYear();
	calendarContainer.addToDom('wrapper');
	
	if(calendarContainer.getItems()[0] !== 'Mon'){
		var countEmpty = new Date(getCurrYear(), currMonth, 0).getDay();
		
		for(i = 0; i < countEmpty; i++){
			divEmpty = document.createElement('div');
			divEmpty.setAttribute('class', 'divEmpty');
			document.getElementById('container').appendChild(divEmpty);
		}
	}
	
	itemsLength = calendarContainer.getItems().length;
	for(count = 0; count < itemsLength; count++){
		day = calendarContainer.getItems()[count],
		dayToHtmlElem = document.createElement('div'),
		title = document.createElement('h4');		
		title.innerText = (count + 1) + ' ' + day.getTitle();
		dayToHtmlElem.setAttribute('class', 'dayContainer');
		dayToHtmlElem.setAttribute('day-id', count);
		dayToHtmlElem.appendChild(title);
		if(day._title === 'Sun' || day._title === 'Sat'){
			title.style.color = 'red';
		}
		
		document.getElementById('container').appendChild(dayToHtmlElem);
	}
}());