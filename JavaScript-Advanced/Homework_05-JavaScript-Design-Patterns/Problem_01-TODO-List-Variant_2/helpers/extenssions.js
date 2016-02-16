'use strict';

Function.prototype.extend = function(parent){
	if(!Object.create){
		Object.create = function(proto){
			function F(){};
			F.prototype = proto;
			return new F();
		};
	};
	
	this.prototype = Object.create(parent.prototype);
	this.prototype.constructor = this;
}

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
	
function errorMessage(message, messageId, targetId){
	var errMess, wrapper = document.getElementById(targetId);
	
	if(!document.getElementById(messageId)){
		errMess = document.createElement('p');
		errMess.innerText = message;
		errMess.setAttribute('id', messageId);
		document.body.insertBefore(errMess, wrapper);
	}
		
	if(errMess){
		errMess.addEventListener('click', function(e){
			this.parentNode.removeChild(this);
		});
	}
}
	
function removeErrorMessage(messageId){
	var errMess = document.getElementById(messageId);
		
	if(errMess){
		errMess.parentNode.removeChild(errMess);
	}
}