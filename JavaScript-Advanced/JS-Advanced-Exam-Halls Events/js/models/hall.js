//Implement hall module
var app = app || {};

(function(eventsSystem){
	function Hall(name, capacity){
		this._name = this.setName(name);
		this._capacity  = this.setCapacity(capacity);
		this.parties = [];
		this.lectures = [];
	}	
	
	Hall.prototype.setName = function(name){
		var regex =  /^[A-Za-z\s+]+$/;
		if(typeof(name) !== 'string' || !regex.test(name)){
			throw new Error('Name must be a  string (only letters and whitespace)');
		}
		return this._name = name;
	}
	
	Hall.prototype.getName = function(){
		return this._name;
	}
	
	Hall.prototype.setCapacity = function(capacity){
		if(typeof(capacity) !== 'number' || capacity < 0){
			throw new Error('Capacity must be a positive number');
		}
		return this._capacity = capacity;
	}
	
	Hall.prototype.getCapacity = function(){
		return this._capacity;
	}
	
	Hall.prototype.addEvent = function(event){
		if(event.constructor.name === 'Party'){
			this.parties.push(event);
		}
		
		if(event.constructor.name === 'Lecture'){
			this.lectures.push(event);
		}
	}
	
	eventsSystem.hall = Hall;
}(app));