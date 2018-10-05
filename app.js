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
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNzAiIGhlaWdodD0iNzAiICB4bWw6c3BhY2U9InByZXNlcnZlIj4gICAgPHBhdGggaWQ9ImJlemllcjQiIHN0cm9rZT0ibm9uZSIgZmlsbD0icmdiKDI0MSwgMTUyLCA1MSkiIGQ9Ik0gMjUuNjUsMzIuMiBDIDE4LjA2LDM5LjI4IDIwLjM4LDQ1LjgzIDI0LjgsNTEuNyBMIDI0Ljg3LDUxLjc5IEMgMjUuMjUsNTIuMjkgMzcuMDksNjQuMjIgMzcuMDksNjQuMjIgTCA0OC4wOSw1My4yMiA0OC4xNSw1My4xNiBDIDU0LjAzLDQ3LjA3IDUzLjg2LDM3LjM3IDQ3Ljc3LDMxLjQ4IDQ3LjU4LDMxLjMgMzQuNDEsMjQuMDMgMjUuNjUsMzIuMiBaIE0gMjUuNjUsMzIuMiIgLz4gICAgPHBhdGggaWQ9ImJlemllcjUiIHN0cm9rZT0ibm9uZSIgZmlsbD0icmdiKDEzMCwgMTg0LCA0OCkiIGQ9Ik0gNDMuNTgsMTAuNyBDIDQ1LjY0LDkuOTEgNDguNDUsMTEuNTggNTIuMzEsMTEuMyA1Mi4zNCwxMS42OSA1MS41OCwyNS4zMiAzOC4yNCwyNS4zMiAzOC4yNCwyNS4zMiAzNS4yNywyNS42MSAzMy44LDI0Ljk5IDMzLjc5LDI1LjE5IDMzLjc4LDI1LjMxIDMzLjc4LDI1LjMxIEwgMzMuODksMjUuMzggMzMuNzQsMjUuMzMgQyAyNy4yMiwyMy4zNiAyNi4xNSwyMS42MyAyNi4xNSwyMS42MyAyMi40NCwxNi4zNyAyMi41OSwxMS44IDIyLjU5LDExLjQgMjIuOTUsMTEuMzYgMjcuMjQsMTEuMTIgMjkuNzcsMTIuNTkgMzAuMzQsOC45MSAzMi44NSw1LjI4IDM5LjE3LDMgNDEuNTcsNS4yIDQzLjA4LDcuODcgNDMuNTgsMTAuNyBaIE0gNDMuNTgsMTAuNyIgLz48L3N2Zz4=";
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

function createFood() {
    /******** Task #1.1 ********/
    // Create food
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

function render() {

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
    // if the snake eats food, spawn new food, else, remove tail.
    if (newHead.x == food.x && newHead.y == food.y) {
        createFood();
    } else {
        snake.pop();
    }

    /******** Task #3 ********/
    // Restart the game if nextHead is in a coordinate that would end the game.
    if (
        /******** Task #3.1 ********/
        // End game if statement
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
    direction = null;
    input = null;
	createSnake();
	createFood();
	refreshCanvas();
}

// Init game
setupNewGame();
