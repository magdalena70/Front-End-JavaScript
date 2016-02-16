'use strict';

var Vector = (function(){
	function Vector(dimensionsArr){
		if(!dimensionsArr || !dimensionsArr.length){
			throw new Error('Invalid input. Arguments can not be empty.');
		}
		
		this._dimensions = dimensionsArr;
	}
	
	Vector.prototype.toString = function(){
		return '(' + this._dimensions.join(', ') + ')';
	}
	
	Vector.prototype.add = function(other){
		//sum =  (1, 2, 3) + (4, 5, 6) = (5, 7, 9)
		var i, newVector = [],
		thisArgsLen = this._dimensions.length,
		otherArgsLen = other._dimensions.length;
		
		if(thisArgsLen === otherArgsLen){
			for(i = 0; i < thisArgsLen; i++){
				newVector.push(this._dimensions[i] + other._dimensions[i]);
			}
		}else{
			throw new Error('Error');
		}
		
		return new Vector(newVector);
	}
	
	Vector.prototype.subtract = function(other){
		//difference = (1, 2, 3) - (4, 5, 6) = (-3, -3, -3)
		var i, newVector = [],
		thisArgsLen = this._dimensions.length,
		otherArgsLen = other._dimensions.length;
		
		if(thisArgsLen === otherArgsLen){
			for(i = 0; i < thisArgsLen; i++){
				newVector.push(this._dimensions[i] - other._dimensions[i]);
			}
		}else{
			throw new Error('Error');
		}
		
		return new Vector(newVector);
	}
	
	Vector.prototype.dot = function(other){
		//result = (1, 2, 3) . (4, 5, 6) = 1 * 4 + 2 * 5 + 3 * 6 = 32
		var i, result = 0,
		thisArgsLen = this._dimensions.length,
		otherArgsLen = other._dimensions.length;
		
		if(thisArgsLen === otherArgsLen){
			for(i = 0; i < thisArgsLen; i++){
				result +=(this._dimensions[i] * other._dimensions[i]);
			}
		}else{
			throw new Error('Error');
		}
		
		return result;
	}
	
	Vector.prototype.norm = function(){
		// norm((1, 2, 3)) = sqrt(1 * 1 + 2 * 2 + 3 * 3) = sqrt(14) = 3.7416573867…
		var i, result = 0,
		thisArgsLen = this._dimensions.length;
		
		for(i = 0; i < thisArgsLen; i++){
			result += (this._dimensions[i] * this._dimensions[i]);
		}
		
		return Math.sqrt(result);
	}
	
	return Vector;
}());

var a = new Vector([1, 2, 3]);
var b = new Vector([4, 5, 6]);
var c = new Vector([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

console.log(a.toString());
console.log(c.toString());
// The following throw errors
//var wrong = new Vector();
//var anotherWrong = new Vector([]);

var result = a.add(b);
console.log(result.toString());
//a.add(c); // Error

result = a.subtract(b);
console.log(result.toString());
//a.subtract(c); // Error

result = a.dot(b);
console.log(result.toString());
//a.dot(c); // Error

console.log(a.norm()); // 3.7416573867739413
console.log(b.norm()); // 8.774964387392123
console.log(c.norm()); // 3.1622776601683795
console.log(a.add(b).norm()); // 12.449899597988733