var width = 10; // width of canvas
var height = 10; // height of canvas

var input; // The arrow key input of the user.
var direction; // The direction that the snake is moving.

var food; // The coordinate of the food.
var snake; // The list of coordinates of the snake.

var interval = 300; // Time in milliseconds between each render() loop.

// Canvas Setup
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var box = 30; // Pixel equivalent of one width/height unit in the canvas
cvs.height = height * box;
cvs.width = width * box;

// Food img
var foodImg = new Image();
foodImg.src =
	'data:image/png;base64,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';

// Updates the canvas
function refreshCanvas() {
	// Clear the canvas
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	// Draw food
	ctx.drawImage(foodImg, food.x * box, food.y * box, box, box);
	// Draw snake
	for (let i = snake.length - 1; i >= 0; i--) {
		ctx.fillStyle = i === 0 ? 'green' : '#EB8921';
		ctx.fillRect(snake[i].x * box, snake[i].y * box, box, box);
		ctx.strokeStyle = 'white';
		ctx.strokeRect(snake[i].x * box, snake[i].y * box, box, box);
	}
}

// Records input direction
document.addEventListener('keydown', arrowInput);
function arrowInput(event) {
	if (event.keyCode === 37) {
		input = 'left';
	} else if (event.keyCode === 38) {
		input = 'up';
	} else if (event.keyCode === 39) {
		input = 'right';
	} else if (event.keyCode === 40) {
		input = 'down';
	}
}



// **************  DO NOT CHANGE ANY CODE ABOVE **************

/******** Task #1.1 ********/
// Create food
function createFood() {
	food = {
		x: Math.floor(Math.random() * width),
		y: Math.floor(Math.random() * height)
    };
    /******** Task #4.1 ********/
    // Check collision between new food coordinate and snake coordinates.
    if (collision(food) === true){
        createFood();
    }
}

/******** Task #1.2 ********/
function createSnake() {
	// Initiate the snake and give it its first and starting coordinate.
	snake = [
        {x: 1, y: 1}
    ];
}

// Draw scene
function render() {
   // Add your code here!

	/******** Task #2.1 ********/
    // Create a new coordinate called newHead, making it's x and y equal to current head coordinates.
    var newHead = {
        x: snake[0].x,
        y: snake[0].y
    }

    /******** Task #4.2 ********/
    // Set direction equal to input ONLY if input is legal.
    if (
        (input == "right" && direction != "left") ||
        (input == "left" && direction != "right") ||
        (input == "up" && direction != "down") ||
        (input == "down" && direction != "up")
    ){
        /******** Task #2.1 ********/
        // Set direction equal to input
        direction = input;
    }

    /******** Task #2.1 ********/
    //determines direction and calculates newHead coordinates according to direction
    if (direction == "right") {
        newHead.x++;
    }
    if (direction == "left") {
        newHead.x--;
    }
    if (direction == "up") {
        newHead.y--;
    }
    if (direction == "down") {
        newHead.y++;
    }

    /******** Task #2.2 ********/
    // if the snake eats food
    if (newHead.x == food.x && newHead.y == food.y) {
        createFood();
        // don't want to remove tail if the snake eats food
    } else {
        // Remove the tail
        snake.pop();
    }

    /******** Task #3 ********/
    // Restart the game if nextHead is in a coordinate that would end the game.
    if (
        /******** Task #3.1 ********/
        newHead.y > height -1 ||
        newHead.y < 0 ||
        newHead.x > width -1 ||
        newHead.x < 0 ||
        /******** Task #3.2 ********/
        collision(newHead)
    ) {
        setupNewGame();
    } else {
        /******** Task #2.1 ********/
        // snake moves by placing newHead into the front position of snake.
        snake.unshift(newHead);
    }
    
    // Updates the canvas. This should be the last line in the render() function.
    refreshCanvas();
}

/******** Task #3.2 ********/
// Check collision between 
function collision(coordinate) {
    for (var i = 0; i < snake.length; i++) {
       if (coordinate.x === snake[i].x && coordinate.y === snake[i].y) {
          return true;
       }
    }
    return false;
} 
 

// ************** DO NOT CHANGE ANY CODE BELOW **************

// CAll draw function every 300 ms
var drawLoop = setInterval(render, interval);

// Setup game objects to initial values
function setupNewGame() {
    direction = 'right';
    input = 'right';
	createSnake();
	createFood();
	refreshCanvas();
}

// Init game
setupNewGame();
