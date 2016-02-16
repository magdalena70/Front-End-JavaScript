'use strict';

String.prototype.startsWith = function(substring){
	if(typeof(this) === 'string' &&
		typeof(substring) === 'string' &&
		this.indexOf(substring) === 0){
		//console.log(this.indexOf(substring));
		return true;
	}
	
	return false;
}

String.prototype.endsWith = function(substring){
	if(typeof(this) === 'string' && typeof(substring) === 'string'){
		var substrLen = substring.length,
		thisLen = this.length;
	
		if(this.indexOf(substring) > -1 && this.lastIndexOf(substring) === (thisLen - substrLen)){
			//console.log(this.lastIndexOf(substring));
			return true;
		}
	}
	
	return false;
}

String.prototype.left = function(count){
	if(typeof(this) === 'string' && !isNaN(Number(count))){
		var thisLen = this.length, i, result = '';
		
		if(count >= thisLen){
			result = this;
		}else{
			for(i = 0; i < count; i++){
				result += this[i];
			}
		}
		
		return result;
	} else{
		return 'Incorrect input.';
	}
}

String.prototype.right = function(count){
	if(typeof(this) === 'string' && !isNaN(Number(count))){
		var thisLen = this.length, result = '', substrIndex;
	
		if(count >= thisLen){
			result = this;
		}else{	
			substrIndex = thisLen - count;
			result = this.substr(substrIndex, count);
		}
		
		return result;
	} else{
		return 'Incorrect input.';
	}
}

String.prototype.padLeft = function(count, character){
	if(typeof(this) === 'string' && !isNaN(Number(count))){
		var ch = character || ' ', result = '', i;
		for(i = 0; i < count; i++){
			result += ch;
		}
		
		return result + this;
	} else{
		return 'Incorrect input.';
	}
}

String.prototype.padRight = function(count, character){
	if(typeof(this) === 'string' && !isNaN(Number(count))){
		var ch = character || ' ', result = this, i;
		for(i = 0; i < count; i++){
			result += ch;
		}
		
		return result;
	} else{
		return 'Incorrect input.';
	}
}

String.prototype.repeat = function(count){
	if(typeof(this) === 'string' && !isNaN(Number(count))){
		var result = '', i;
		for(i = 0; i < count; i++){
			result += this;
		}
		
		return result;
	} else{
		return 'Incorrect input.';
	}
}

var example = "This is an example string used only for demonstration purposes.";
console.log(example.startsWith("This"));
console.log(example.startsWith("this"));
console.log(example.startsWith("other"));
//console.log(example.startsWith(6)); // return false

var example = "This is an example string used only for demonstration purposes.";
console.log(example.endsWith("poses."));
console.log(example.endsWith ("example"));
console.log(example.startsWith("something else"));
//console.log(example.startsWith(6)); // return false

var example = "This is an example string used only for demonstration purposes.";
console.log(example.left(9));
console.log(example.left(90));
//console.log(example.left('str')); // return Incorrect input

var example = "This is an example string used only for demonstration purposes.";
console.log(example.right(9));
console.log(example.right(90));

// Combinations must also work
var example = "abcdefgh";
console.log(example.left(5).right(2));

var hello = "hello";
console.log(hello.padLeft(5));
console.log(hello.padLeft(10));
console.log(hello.padLeft(5, "."));
console.log(hello.padLeft(10, "."));
console.log(hello.padLeft(2, "."));
//console.log(hello.padLeft()); // return Incorrect input.

var hello = "hello";
console.log(hello.padRight(5) + '// There are 5 spaces here');
console.log(hello.padRight(10));
console.log(hello.padRight(5, "."));
console.log(hello.padRight(10, "."));
console.log(hello.padRight(2, "."));

var character = "*";
console.log(character.repeat(5));
//console.log(character.repeat()); // return Incorrect input.
// Alternative syntax
console.log("~".repeat(3));

// Another combination
console.log("*".repeat(5).padLeft(10, "-").padRight(15, "+"));