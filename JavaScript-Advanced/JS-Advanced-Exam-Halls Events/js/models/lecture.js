//Implement lecture module
var app = app || {};

(function(eventsSystem){
	function Lecture(options){
		eventsSystem.event.call(this, options);
		this._course = this.setCourse(options.course);
		this._trainer = this.setTrainer(options.trainer);
	}
	
	Lecture.extend(eventsSystem.event);
	
	Lecture.prototype.setCourse = function(course){
		if(course.constructor.name !== 'Course'){
			throw new Error('Input must be Course instance only');
		}
		return this._course = course;
	}
	
	Lecture.prototype.getCourse = function(){
		return this._course;
	}
	
	Lecture.prototype.setTrainer = function(trainer){
		if(trainer.constructor.name !== 'Trainer'){
			throw new Error('Input must be Trainer instance only');
		}
		return this._trainer = trainer;
	}
	
	Lecture.prototype.getTrainer = function(){
		return this._trainer;
	}
	
	eventsSystem.lecture = Lecture;
}(app));