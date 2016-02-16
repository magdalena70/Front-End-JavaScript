'use strict';

function Person(firstName, lastName){
	this.firstName = firstName;
	this.lastName = lastName;
	var fullName; // private member
	Object.defineProperty(this,"fullName",{
		get: function() { return this.firstName + ' ' + this.lastName; },
		set: function(fullName) { 
			var names = fullName.split(' ');
			this.firstName = names[0];
			this.lastName = names[1];
			return this.firstName + ' ' + this.lastName;
		}
  });
}

var person = new Person("Peter", "Jackson");

// Getting values
console.log('set firstName: ' + person.firstName);
console.log('set lastName: ' + person.lastName);
console.log('fullName is: ' + person.fullName);
console.log('\r\n');
// Changing values
person.firstName = "Michael";
console.log('change firstName: ' + person.firstName);
console.log('fullName is: ' + person.fullName);
person.lastName = "Williams";
console.log('change lastName: ' + person.lastName);
console.log('fullName is: ' + person.fullName);
console.log('\r\n');
// Changing the full name should work too
person.fullName = "Alan Marcus";
console.log('change fullName: ' + person.fullName);
console.log('firstName is: ' + person.firstName);
console.log('lastName is: ' + person.lastName);