//TODO: Implement event module
var app = app || {};

(function(eventsSystem){
	function Event(options){
		if(this.constructor === Event){
			throw new Error("Can't instantiate abstract class!");
		}

		this._title = this.setTitle(options.title);
		this._type = this.setType(options.type);
		this._duration = this.setDuration(options.duration);
		this._date = this.setDate(options.date);
	}
	
	Event.prototype.setTitle = function(title){
		var regex =  /^[A-Za-z\s+]+$/;
		if(typeof(title) !== 'string' || !regex.test(title)){
			throw new Error('Title must be a  string (only letters and whitespace)');
		}
		return this._title = title;
	}
	
	Event.prototype.getTitle = function(){
		return this._title;
	}
	
	Event.prototype.setType = function(type){
		var regex =  /^[A-Za-z\s+]+$/;
		if(typeof(type) !== 'string' || !regex.test(type)){
			throw new Error('Type must be a  string (only letters and whitespace)');
		}
		return this._type = type;
	}
	
	Event.prototype.getType = function(){
		return this._type;
	}
	
	Event.prototype.setDuration = function(duration){
		if(typeof(duration) !== 'number' || duration < 0){
			throw new Error('Duration must be a positive number');
		}
		return this._duration = duration;
	}
	
	Event.prototype.getDuration = function(){
		return this._duration;
	}
	
	Event.prototype.setDate = function(date){
		if(date.constructor.name !== 'Date'){
			throw new Error('Input must be Date instance only');	
		}
		return this._date = date;
	}
	
	Event.prototype.getDate = function(){
		return this._date;
	}
	
	eventsSystem.event = Event;
}(app));