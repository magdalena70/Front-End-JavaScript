window.onload = game();
var player;
var ctx;
var canvas;
var squares;
function game() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.addEventListener('mousedown', fillXandO);
    player = 0;

    squares = [{ x: 0, y: 0, width: 100, height: 100, value: "none" },
               { x: 100, y: 0, width: 100, height: 100, value: "none" },
               { x: 200, y: 0, width: 100, height: 100, value: "none" },
               { x: 0, y: 100, width: 100, height: 100, value: "none" },
               { x: 100, y: 100, width: 100, height: 100, value: "none" },
               { x: 200, y: 100, width: 100, height: 100, value: "none" },
               { x: 0, y: 200, width: 100, height: 100, value: "none" },
               { x: 100, y: 200, width: 100, height: 100, value: "none" },
               { x: 200, y: 200, width: 100, height: 100, value: "none" }
    ];

    for (var i = 0; i < squares.length; i++) {
		ctx.strokeStyle = "#CCC";
        ctx.strokeRect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
    }
}

function fillXandO(event) {
    var left = event.clientX - ctx.canvas.offsetLeft;
    var top = event.clientY - ctx.canvas.offsetTop;

    for (var i = 0; i < squares.length; i++) {
        if (left > squares[i].x && left < squares[i].x + squares[i].width &&
            top > squares[i].y && top < squares[i].y + squares[i].height &&
			!squares[i].selected) {
				squares[i].selected = true;
				ctx.font = "75px 'Left hand comic'";
				if (player % 2 == 0) {
					squares[i].value = "x";
					ctx.shadowColor = "#000";
					ctx.shadowBlur = 8;
					ctx.fillStyle="#000";
					ctx.fillText("x", squares[i].x + squares[i].width * 0.15, squares[i].y + squares[i].height * 0.80);
				} else {
					squares[i].value = "o";
					ctx.shadowColor = "#fff";
					ctx.shadowBlur = 8;
					ctx.fillStyle = "#fff";
					ctx.fillText("o", squares[i].x + squares[i].width * 0.25, squares[i].y + squares[i].height * 0.80);
					
				}
				
            player++;
            sequenceCheck();
            break;
        }
    }
}

//check for sequence of identical elements
function sequenceCheck() {
	// horizontal line check (left to right)
    for (var i = 0; i < 9; i += 3) { 
        if (squares[i].value == squares[i + 1].value &&
			squares[i + 1].value == squares[i + 2].value &&
            squares[i].value != "none" &&
			squares[i + 1].value != "none" &&
			squares[i + 2].value != "none") {
				youWin(squares[i].value);
        }
    }
	
	// vertical line check (top to bottom)
    for (var i = 0; i < 3; i ++) { 
        if (squares[i].value == squares[i + 3].value &&
			squares[i + 3].value == squares[i + 6].value &&
            squares[i].value != "none" &&
			squares[i + 3].value != "none" &&
			squares[i + 6].value != "none") {
				youWin(squares[i].value);
        }
    }

    // top-left to bottom-right diagonal check
    if (squares[0].value == squares[4].value &&
		squares[4].value == squares[8].value &&
        squares[0].value != "none" &&
		squares[4].value != "none" &&
		squares[8].value != "none") {
			youWin(squares[0].value);
    }

    // top-right to bottom-left diagonal check
    if (squares[2].value == squares[4].value &&
		squares[4].value == squares[6].value &&
        squares[2].value != "none" &&
		squares[4].value != "none" &&
		squares[6].value != "none") {
			youWin(squares[2].value);
    }

    //check for empty squares
    var emptySquare;
    for (var i = 0; i < squares.length; i ++) {
        if (squares[i].value == "none") {
            emptySquare = true;
            break;
        }
    }

    if (!emptySquare) {
        document.getElementById('message').innerText = "Go to New Game!";
    }
}

function youWin(value) {
	if(value == "x"){
		document.getElementById('message').innerText = "BLACK - YOU WIN!!! \n\n WHITE, do not give up! Let's go again!";
	}else{
		document.getElementById('message').innerText = "WHITE - YOU WIN!!!  \n\n BLACK, do not give up! Let's go again!";
	}
	
    squares = null;
}

function newGame (event) {
    location.reload();
}