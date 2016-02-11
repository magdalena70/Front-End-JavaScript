'use strict';

var count = 0,
shapesList = {},
canvas = document.getElementById('myCanvas'),
ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 360;

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

var CreateShape = (function(){
	var Shape = (function(){
		function Shape(x, y, color){
			if(isNaN(Number(x)) || isNaN(Number(y))){
				throw new Error('Invalid input! Coordinates x and y  must be numbers.');
			}
		
			this._x = x;
			this._y = y;
			this._color = color || '#000';
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
	
	return {
		Circle: Circle,
		Rectangle: Rectangle,
		Triangle: Triangle,
		Line: Line,
		Segment: Segment
	};
}());

document.getElementById('addShape').addEventListener('click', submitForm);
document.getElementById('remove').addEventListener('click', removeShape);

function submitForm() {
    var shape = document.getElementById("shape").value,
	x = parseInt(document.getElementById("x").value),
    y = parseInt(document.getElementById("y").value),
    color = document.getElementById("color").value,
    radius = parseInt(document.getElementById("radius").value),
    width = parseInt(document.getElementById("width").value),
    height = parseInt(document.getElementById("height").value),
    x2 = parseInt(document.getElementById("x2").value),
    y2 = parseInt(document.getElementById("y2").value),
    x3 = parseInt(document.getElementById("x3").value),
    y3 = parseInt(document.getElementById("y3").value);

    addShape(shape, x, y, color, radius, width, height, x2, y2, x3, y3);
}

function addShape(shape, x, y, color, radius, width, height, x2, y2, x3, y3) {
    switch (shape) {
        case 'circle':
			if(!x || !y || !radius){
				alert('Arguments must be: x1, y1, color, radius');
			}
			
            var circle = new CreateShape.Circle(x, y, color, radius);
            shapesList[('s' + count)] = circle;
            addShapeInfo(circle);
            break;
        case 'rectangle':
			if(!x || !y || !width || !height){
				alert('Arguments must be: x1, y1, color, width, height');
			}
			
            var rectangle = new CreateShape.Rectangle(x, y, color, width, height);
            shapesList[('s' + count)] = rectangle;
            addShapeInfo(rectangle);
            break;
        case 'triangle':
			if(!x || !y || !x2 || !y2 || !x3 || !y3){
				alert('Arguments must be: x1, y1, color, x2, y2, x3, y3');
			}
			
            var triangle = new CreateShape.Triangle(x, y, color, x2, y2, x3, y3);
            shapesList[('s' + count)] = triangle;
            addShapeInfo(triangle);
            break;
        case 'line':
			if(!x || !y || !x2 || !y2){
				alert('Arguments must be: x1, y1, color, x2, y2');
			}
			
            var line = new CreateShape.Line(x, y, color, x2, y2);
            shapesList[('s' + count)] = line;
            addShapeInfo(line);
            break;
        case 'segment':
			if(!x || !y || !x2 || !y2){
				alert('Arguments must be: x1, y1, color, x2, y2');
			}
			
            var segment = new CreateShape.Segment(x, y, color, x2, y2);
            shapesList[('s' + count)] = segment;
            addShapeInfo(segment);
            break;
        default:
            break;
    }

    count++;
    drawShapesList();
}

function addShapeInfo(shape) {
    var shapesInfoTag = document.getElementById("shapes-info"),
    newOption = document.createElement("option"),
	textNode = document.createTextNode(shape.toString());
	
    newOption.setAttribute("value", ("s" + count));
    newOption.appendChild(textNode);
    shapesInfoTag.appendChild(newOption);
}

function drawShapesList() {
    ctx.clearRect(0, 0, 700, 500);
	
    for (var i in shapesList) {
        shapesList[i].draw();
    }
}

function removeShape() {
    var element = document.getElementById("shapes-info"),
    shapeIndex = element.options[element.selectedIndex].value;

    element.removeChild(element.options[element.selectedIndex]);
    delete shapesList[shapeIndex];
    drawShapesList();
}