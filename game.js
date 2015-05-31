//Class segment
function segment(color, x, y) {
	this.color = color;
	this.x = x;
	this.y = y;
	
	this.move = function(dir, length) {
		switch (dir) {
			case "right":
				this.x += length;
				break;
			case "left":
				this.x -= length;
				break;
			case "up":
				this.y -= length;
				break;
			case "down":
				this.y += length;
				break;
			default:
				console.log("Bad direction");
		}
	};
	
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
	
	this.move = function(dir) {
		for (var i = 0; i < segments.length; i++) {
			segments[i].move(dir, 10);
		}
	};
	
	this.draw = function() {
		for (var i = 0; i < segments.length; i++) {
			segments[i].draw();
		}
	}
};

//Global objects
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
	snake.move("right");
	
	//Check if food is eaten
	snake.addSegment("#CCFFFF", 100, 100);
	
	//Draw the snake
	snake.draw();
};

$(document).ready(function() {
	init();
	//var snake = new Object();
	
	//var seg1 = new segment("red");

	//seg1.draw();
});

