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