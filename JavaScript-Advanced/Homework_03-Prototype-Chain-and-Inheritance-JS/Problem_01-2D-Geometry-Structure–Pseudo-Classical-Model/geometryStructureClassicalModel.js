'use strict';

Function.prototype.extends = function (parent) {
    if (!Object.create) {
        Object.create = function (proto) {
            function F() { }            ;
            F.prototype = proto;
            return new F();
        };
    };
    
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
}

var CreateShape = (function(){
	var Shape = (function(){
		function Shape(x, y, color){
			if(isNaN(Number(x)) || isNaN(Number(y))){
				throw new Error('Invalid input! Coordinates x and y  must be numbers.');
			}
		
			this._x = x;
			this._y = y;
			this._color = color;
		}
		
		Shape.prototype.toString = function(){
			return '(x = ' + this._x + ', y = ' + this._y + ')\r\nColor: ' + this._color;
		}
		
		return Shape;
	}());
	
	var Circle = (function(){
		function Circle(x, y, color, radius){
			if(isNaN(Number(radius))){
				throw new Error('Invalid input! Radius must be a number.');
			}
			
			Shape.call(this, x, y, color);
			this._radius = radius;
		}
		
		Circle.extends(Shape);
		Circle.prototype.toString = function(){
			return  this.constructor.name + ':\r\nO' + Shape.prototype.toString.call(this) +
				'\r\nRadius: ' + this._radius;
		}
		
		return Circle;
	}());
	
	var Rectangle = (function(){
		function Rectangle(x, y, color, width, height){
			if(isNaN(Number(width)) || isNaN(Number(height))){
				throw new Error('Invalid input! Width and height must be numbers.');
			}
			
			Shape.call(this, x, y, color);
			this._width = width;
			this._height = height;
		}
		
		Rectangle.extends(Shape);
		Rectangle.prototype.toString = function(){
			return this.constructor.name + ':\r\nA' + Shape.prototype.toString.call(this) +
				'\r\nWidth: ' + this._width + '\r\nHeight: ' + this._height;
		}
		
		return Rectangle;
	}());
	
	var Triangle = (function(){
		function Triangle(x, y, color, x2, y2, x3, y3){
			if(isNaN(Number(x2)) || isNaN(Number(y2)) || isNaN(Number(x3)) || isNaN(Number(y3))){
				throw new Error('Invalid input! Coordinates must be numbers.');
			}
			
			Shape.call(this, x, y, color);
			this._x2 = x2;
			this._y2 = y2;
			this._x3 = x3;
			this._y3 = y3;
		}
		
		Triangle.extends(Shape);
		Triangle.prototype.toString = function(){
			return this.constructor.name + 
				': \r\nA( x = ' + this._x + ', y = ' + this._y +
				' )\r\nB( x = ' + this._x2 + ', y = ' + this._y2 +
				' )\r\nC( x = ' + this._x3 + ', y = ' + this._y3 +
				' )\r\nColor: ' + this._color;
		}
		
		return Triangle;
	}());
	
	var Line = (function(){
		function Line(x, y, color, x2, y2){
			if(isNaN(Number(x2)) || isNaN(Number(y2))){
				throw new Error('Invalid input! Coordinates must be numbers.');
			}
		
			Shape.call(this, x, y, color);
			this._x2 = x2;
			this._y2 = y2;
		}
		
		Line.extends(Shape);
		Line.prototype.toString = function(){
			return this.constructor.name + ': \r\nA' + Shape.prototype.toString.call(this) +
				'\r\nB( x = ' + this._x2 + ', y = ' + this._y2 + ' )';
		}
		
		return Line;
	}());
	
	var Segment = (function(){
		function Segment(x, y, color, x2, y2){
			Line.call(this, x, y, color, x2, y2);
		}
		
		Segment.extends(Line);
		Segment.prototype.toString = function(){
			return this.constructor.name + ':\r\nA' + Shape.prototype.toString.call(this) +
				'\r\nB( x = ' + this._x2 + ', y = ' + this._y2 + ' )';
		}
		
		return Segment;
	}());
	
	return CreateShape = {
		Circle: Circle,
		Rectangle: Rectangle,
		Triangle: Triangle,
		Line: Line,
		Segment: Segment
	};
}());

var circle = new CreateShape.Circle(50, 50, '#000', 20);
//var circle = new CreateShape.Circle(50, 50, '#000', 'str'); // invalid radius
document.getElementById('circle').innerText = circle.toString();
console.log('What the __proto__ is ', circle.__proto__);

var rectangle = new CreateShape.Rectangle(20, 20, '#FFF', 10, 10);
//var rectangle = new CreateShape.Rectangle(20, 20, '#FF0000', 'str', 10); // invalid width
document.getElementById('rectangle').innerText = rectangle.toString();
console.log('What the __proto__ is ', rectangle.__proto__);

var triangle = new CreateShape.Triangle(30, 20, '#FF0000', 35, 25, 40, 30);
//var triangle = new CreateShape.Triangle(30, 20, '#FF0000', 35, 25, 'str', 30); // invalid x3
document.getElementById('triangle').innerText = triangle.toString();
console.log('What the __proto__ is ', triangle.__proto__);

var line = new CreateShape.Line(35, 40, '#EEE', 55, 70);
document.getElementById('line').innerText = line.toString();
console.log('What the __proto__ is ', line.__proto__);

var segment = new CreateShape.Segment(15, 30, '#333', 25, 50);
document.getElementById('segment').innerText = segment.toString();
console.log('What the __proto__ is ', segment.__proto__);