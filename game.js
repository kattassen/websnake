//Class segment
function Segment(color, x, y) {
	this.color = color;
	this.x = x;
	this.y = y;

	this.move = function(x, y) {
		this.x = x;
		this.y = y;
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
    this.direction = "right";
	this.segments = [new Segment("#000000", 20, 20)];

	this.addSegment = function(color) {
    	//Find last segments position
    	var x = this.segments[this.segments.length -1].x;
    	var y = this.segments[this.segments.length -1].y;
    	switch (this.direction) {
      	case "left":
        	x += 10;
      	case "right":
        	x -= 10;
      	case "up":
        	y += 10;
      	case "down":
        	y -= 10;
    	}
	  	this.segments.push(new Segment(color, x, y));
	};

	this.move = function() {
		for (var i = this.segments.length - 1; i >= 0; i--) {
			if (i == 0) {
				var x = 0;
				var y = 0;
				switch (this.direction) {
				case "right":
					x = 10;
					break;
				case "left":
					x = -10;
					break;
				case "up":
					y = -10;
					break;
				case "down":
					y = 10;
					break;
				default:
					console.log("Bad direction");
				}
				this.segments[i].move(this.segments[i].x + x, this.segments[i].y + y);
			} else {
				this.segments[i].move(this.segments[i-1].x, this.segments[i-1].y);
			}
		}
	};

	this.draw = function() {
		for (var i = 0; i < this.segments.length; i++) {
			this.segments[i].draw();
			console.log(i + "  " + this.segments[i].x + "  " + this.segments[i].y);
		}
	}

  this.setDirection = function(direction) {
    if ((direction == "left" && this.direction != "right") ||
        (direction == "right" && this.direction != "left") ||
        (direction == "up" && this.direction != "down") ||
        (direction == "down" && this.direction != "up"))
      this.direction = direction;
	}

	this.checkCollision = function(x,y) {
		if (this.segments[0].x == x && this.segments[0].y == y)
			return true;
		else
			return false;
	};

	this.checkSelfCollision = function() {
		for (var i = this.segments.length - 1; i > 0; i--) {
			if (this.segments[0].x == this.segments[i].x && this.segments[0].y == this.segments[i].y)
				return true;
			else
				return false;
		}
	};
};

//Global objects
var ctx;
var snake = new Snake();
var food = new Segment("#111199", 100, 100);

function init() {
	//get a reference to the canvas
	ctx = $('#canvas')[0].getContext("2d");
  	bindEvents();

  	//Add some segments to snake
  	snake.addSegment("#AA00BB");
	snake.addSegment("#AA00BB");
	snake.addSegment("#AAFFBB");
	snake.addSegment("#1100BB");


	return setInterval(gameLoop, 500);
};

function gameLoop() {
	//Move snake
    snake.move();

    //Check if collision with self
    if (snake.checkSelfCollision())
    	alert("GAME OVER!");

	//Check if food is eaten and
	//add segment to snake and new food
	//if applicable
	if (snake.checkCollision(food.x, food.y)) {
		snake.addSegment(food.color);
		food = new Segment("#336622", 200, 200);
	}

	//Clear canvas and draw the snake
  	ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
	snake.draw();
	food.draw();
};

function bindEvents() {
    var keysToDirections = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    $(document).keydown(function (event) {
      var key = event.which;
      var direction = keysToDirections[key];
      if (direction) {
        snake.setDirection(direction);
        event.preventDefault();
      }
      else if (key === 32) {
        restart();
      }
    });
};

$(document).ready(function() {
	init();
});

