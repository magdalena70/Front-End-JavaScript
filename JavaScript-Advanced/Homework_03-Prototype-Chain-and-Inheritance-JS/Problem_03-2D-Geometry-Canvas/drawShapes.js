'use strict';

var canvas = document.getElementById('myCanvas'),
ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 380;

Object.prototype.extends = function(parent) {
    if (!Object.create) {
        Object.prototype.create = function(proto) {
            function F() {}
            F.prototype = proto;
            return new F();
        };
    }

    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};

function isValidHexColor(color) {
    var acceptedCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f'],
	colorLength = color.length,
	i;
		
    for (i = 1; i < colorLength; i++) {
        if (acceptedCharacters.indexOf(color[i].toLowerCase()) === -1) {
            return false;
        }
    }

    return true;
}

var CreateShape = (function(){
	var Shape = (function(){
		function Shape(x, y, color){
			if(isNaN(Number(x)) || isNaN(Number(y))){
				throw new Error('Invalid input! Coordinates x and y  must be numbers.');
			}
			
			if(color.length !== 7 || color[0] !== '#' || !isValidHexColor(color)){
				throw new SyntaxError('Invalid color: color must be in hex format!');
			}
		
			this._x = x;
			this._y = y;
			this._color = color;
		}
		
		Shape.prototype.toString = function(){
			return '(x = ' + this._x + ', y = ' + this._y + ')\r\nColor: ' + this._color;
		}
		
		Shape.prototype.draw = function() {
            ctx.beginPath();
            ctx.fillStyle = this._color;
        };
		
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
		
		Circle.prototype.draw = function() {
            Shape.prototype.draw.call(this);
            ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        };
		
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
		
		Rectangle.prototype.draw = function() {
            Shape.prototype.draw.call(this);
            ctx.rect(this._x, this._y, this._width, this._height);
            ctx.fill();
            ctx.stroke();
        };
		
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
		
		Triangle.prototype.draw = function() {
            Shape.prototype.draw.call(this);
            ctx.moveTo(this._x, this._y);
            ctx.lineTo(this._x2, this._y2);
            ctx.lineTo(this._x3, this._y3);
            ctx.fill();
            ctx.stroke();
        };
		
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
		
		Line.prototype.draw = function() {
            Shape.prototype.draw.call(this);
            ctx.moveTo(this._x, this._y);
            ctx.lineTo(this._x2, this._y2);
            ctx.fill();
            ctx.stroke();
        };
		
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
		
		Segment.prototype.draw = function() {
            Shape.prototype.draw.call(this);
            ctx.moveTo(this._x, this._y);
            ctx.lineTo(this._x2, this._y2);
            ctx.fill();
            ctx.stroke();
        };
		
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

var circle = new CreateShape.Circle(250, 80, '#FF0000', 65);
//console.log(circle.toString());
document.getElementById('circle').innerText = circle.toString();
circle.draw();

var rectangle = new CreateShape.Rectangle(50, 160, '#FFFF00', 210, 180);
//console.log(rectangle.toString());
document.getElementById('rectangle').innerText = rectangle.toString();
rectangle.draw();

var triangle = new CreateShape.Triangle(300, 220, '#33AABB', 350, 350, 640, 110);
//console.log(triangle.toString());
document.getElementById('triangle').innerText = triangle.toString();
triangle.draw();

var line = new CreateShape.Line(400, 50, '#FFFF00', 500, 100);
//console.log(line.toString());
document.getElementById('line').innerText = line.toString();
line.draw();

var segment = new CreateShape.Segment(550, 200, '#FF0000', 690, 350);
//console.log(segment.toString());
document.getElementById('segment').innerText = segment.toString();
segment.draw();