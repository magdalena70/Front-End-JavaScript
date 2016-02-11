'use strict';

if(!Object.create){
	Object.create = function(proto){
		function F() {};
		F.prototype = proto;
		return new F;
	}
}

Object.prototype.extend = function (properties) {
    function f() {};
    f.prototype = Object.create(this);
	for(var prop in properties){
		f.prototype[prop] = properties[prop];
	}
			
	f.prototype._super = this;
    return new f();
}

var CreateShape = (function(){
	var shape = {
		init: function Shape(x, y, color){
			if(isNaN(Number(x)) || isNaN(Number(y))){
				throw new Error('Invalid input! Coordinates x and y must be numbers.');
			}
			
			this._x = x;
			this._y = y;
			this._color = color;
		},
		toString: function(){
			return '( x = ' + this._x + ', y = ' + this._y + ' )\r\nColor: ' + this._color;
		}
	};
	
	var circle = shape.extend({
		init: function Circle(x, y, color, radius){
			if(isNaN(Number(radius))){
				throw new Error('Invalid input! Radius must be a number.');
			}
			
			this._super.init.call(shape, x, y, color);
			this._radius = radius;
			return this;
		},
		toString: function(){
			return this.init.name + ':\r\nO' + this._super.toString.call(this);
		}
	});
	
	var rectangle = shape.extend({
		init: function Rectangle(x, y, color, width, height){
			if(isNaN(Number(width)) || isNaN(Number(height))){
				throw new Error('Invalid input! Width and height must be numbers.');
			}
			
			this._super.init.call(shape, x, y, color);
			this._width = width;
			this._height = height;
			return this;
		},
		toString: function(){
			return this.init.name + ':\r\nA' + this._super.toString.call(this) +
				'\r\nWidth: ' + this._width + '\r\nHeight: ' + this._height;
		}
	});
	
	var triangle = shape.extend({
		init: function Triangle(x, y, color, x2, y2, x3, y3){
			if(isNaN(Number(x2)) || isNaN(Number(y2)) || isNaN(Number(x3)) || isNaN(Number(y3))){
				throw new Error('Invalid input! Coordinates must be numbers.');
			}
			
			this._super.init.call(shape, x, y, color);
			this._x2 = x2;
			this._y2 = y2;
			this._x3 = x3;
			this._y3 = y3;
			return this;
		},
		toString: function(){
			return this.init.name + 
				': \r\nA( x = ' + this._x + ', y = ' + this._y +
				' )\r\nB( x = ' + this._x2 + ', y = ' + this._y2 +
				' )\r\nC( x = ' + this._x3 + ', y = ' + this._y3 +
				' )\r\nColor: ' + this._color;
		}
	});
	
	var line = shape.extend({
		init: function Line(x, y, color, x2, y2){
			if(isNaN(Number(x2)) || isNaN(Number(y2))){
				throw new Error('Invalid input! Coordinates must be numbers.');
			}
		
			this._super.init.call(this, x, y, color);
			this._x2 = x2;
			this._y2 = y2;
			return this;
		},
		toString: function(){
			return this.init.name + ': \r\nA' + this._super.toString.call(this) +
				'\r\nB( x = ' + this._x2 + ', y = ' + this._y2 + ' )';
		}
	});
	
	var segment = shape.extend({
		init: function Segment(x, y, color, x2, y2){
			if(isNaN(Number(x2)) || isNaN(Number(y2))){
				throw new Error('Invalid input! Coordinates must be numbers.');
			}
		
			this._super.init.call(this, x, y, color);
			this._x2 = x2;
			this._y2 = y2;
			return this;
		},
		toString: function(){
			return this.init.name + ': \r\nA' + this._super.toString.call(this) +
				'\r\nB( x = ' + this._x2 + ', y = ' + this._y2 + ' )';
		}
	});
	
	return CreateShape = {
		circle: circle,
		rectangle: rectangle,
		triangle: triangle,
		line: line,
		segment: segment
	};
	
}());

var newCircle = Object.create(CreateShape.circle).init(10, 15.5, '#000', 5);
document.getElementById('circle').innerText = newCircle.toString();
console.log('What the __proto__ is Circle: ', newCircle.__proto__);

var newRectangle = Object.create(CreateShape.rectangle).init(20, 20, '#FFF', 10, 10);
document.getElementById('rectangle').innerText = newRectangle.toString();
console.log('What the __proto__ is Rectangle: ', newRectangle.__proto__);

var newTriangle = Object.create(CreateShape.triangle).init(30, 20, '#FF0000', 35, 25, 40, 30);
document.getElementById('triangle').innerText = newTriangle.toString();
console.log('What the __proto__ is Triangle: ', newTriangle.__proto__);

var newLine = Object.create(CreateShape.line).init(35, 40, '#EEE', 55, 70);
document.getElementById('line').innerText = newLine.toString();
console.log('What the __proto__ is Line: ', newLine.__proto__);

var newSegment = Object.create(CreateShape.segment).init(15, 30, '#333', 25, 50);
document.getElementById('segment').innerText = newSegment.toString();
console.log('What the __proto__ is Segment: ', newSegment.__proto__);