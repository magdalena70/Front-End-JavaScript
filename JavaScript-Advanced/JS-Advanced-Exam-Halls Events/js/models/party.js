//Implement party module
var app = app || {};

(function(eventsSystem){
	function Party(options){
		eventsSystem.event.call(this, options);
		this._isCatered = options.isCatered;
		this._isBirthday = options.isBirthday;
		this._organiser = this.setOrganiser(options.organiser);
	}
	
	Party.extend(eventsSystem.event);
	
	Party.prototype.checkIsBirthday = function(){
		if(this._isBirthday == true){
			return true;
		}else{
			return false;
		}
	}
	
	Party.prototype.checkIsCatered = function(){
		if(this._isCatered === true){
			return true;
		}else{
			return false;
		}
	}
	
	Party.prototype.setOrganiser = function(organiser){
		if(organiser.constructor.name !== 'Employee'){
			throw new Error('Organiser must be Employee instance only');
		}
		return this._organiser = organiser;
	}
	
	Party.prototype.getOrganiser = function(){
		return this._organiser;
	}
	
	eventsSystem.party = Party;
}(app));