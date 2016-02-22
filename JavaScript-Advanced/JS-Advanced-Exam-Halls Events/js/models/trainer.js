//Implement trainer module
var app = app || {};

(function(eventsSystem){
	function Trainer(name, workHours){
		eventsSystem.employee.call(this, name, workHours);
		this.courses = [];
		this.feedbacks = [];
	}
	
	Trainer.extend(eventsSystem.employee);
	
	Trainer.prototype.addFeedback = function(feedback){
		if(typeof(feedback) === 'string'){
			this.feedbacks.push(feedback);
		}
	}
	
	Trainer.prototype.addCourse = function(course){
		if(course.constructor.name === 'Course'){
			this.courses.push(course);
		}
	}
	
	eventsSystem.trainer = Trainer;
}(app));