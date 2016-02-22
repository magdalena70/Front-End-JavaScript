//Implement employee module
var app = app || {};

(function(eventsSystem){
	function Employee(name, workHours){
		this._name = this.setName(name);
		this._workHours = this.setWorkhours(workHours);
	}
	
	Employee.prototype.setName = function(name){
		var regex =  /^[A-Za-z\s+]+$/;
		if(typeof(name) !== 'string' || !regex.test(name)){
			throw new Error('Name must be a  string (only letters and whitespace)');
		}
		return this._name = name;
	}
	
	Employee.prototype.getName = function(){
		return this._name;
	}
	
	Employee.prototype.setWorkhours = function(workHours){
		if(typeof(workHours) !== 'number' || workHours < 0){
			throw new Error('Work\'s hours must be a positive number');
		}
		return this._workHours = workHours;
	}
	
	Employee.prototype.getWorkhours = function(){
		return this._workHours;
	}
	
	eventsSystem.employee = Employee;
}(app));