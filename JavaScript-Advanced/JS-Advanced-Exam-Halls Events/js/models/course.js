//Implement course module
var app = app || {};

(function(eventsSystem){
	function Course(name, numberOfLectures){
		this._name = this.setName(name);
		this._numberOfLectures = this.setNumberOfLectures(numberOfLectures);
	}
	
	Course.prototype.setName = function(name){
		var regex =  /^[A-Za-z\s+]+$/;
		if(typeof(name) !== 'string' || !regex.test(name)){
			throw new Error('Name must be a  string (only letters and whitespace)');
		}
		return this._name = name;
	}
	
	Course.prototype.getName = function(){
		return this._name;
	}
	
	Course.prototype.setNumberOfLectures = function(numberOfLectures){
		if(typeof(numberOfLectures) !== 'number' || numberOfLectures < 0){
			throw new Error('Number of lectures must be a positive number');
		}
		return this._numberOfLectures = numberOfLectures;
	}
	
	Course.prototype.getNumberOfLectures = function(){
		return this._numberOfLectures;
	}
	
	eventsSystem.course = Course;
}(app));