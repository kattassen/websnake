//Segment class
function segment(color, x, y) {
	this.color = color;
	this.x = x;
	this.y = 25;
	
	this.draw = function() {
		//draw a circle
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y,  5, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
	};
};

//Class snake
function Snake(color) {
	var segments = [new segment("#000000", 25, 25)];
	
	this.addSegment = function(color, x, y) {
		segments.push(new segment(color, x, y));
	};
	
	this.draw = function() {
		for (var i = 0; i < segments.length; i++) {
			segments[i].draw();
		}
	}
};
var ctx;

var snake = new Snake();

function init() {
	//get a reference to the canvas
	ctx = $('#canvas')[0].getContext("2d");
	return setInterval(gameLoop, 10);
};

function move() {
	var seg1 = new segment("red");
	seg1.draw();
};

function gameLoop() {
	// Move snake
	
	//Check if food is eaten
	snake.addSegment("#CCFFFF", 50, 50);
	
	//Draw the snake
	snake.draw();
};

$(document).ready(function() {
	init();
	//var snake = new Object();
	
	//var seg1 = new segment("red");

	//seg1.draw();
});

