var Board;
const human_player = 'O';
const ai_player = 'X';
const winning_Line=[
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
start_Game();

function start_Game()
{
	document.querySelector(".finishgame").style.display = "none";
	Board = Array.from(Array(9).keys());
	console.log(Board);
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', whenClicked, false);
	}
}

function whenClicked(cell) 
{
	if(typeof Board[cell.target.id] == 'number')
	{
		turn(cell.target.id, human_player);
		if(!checkTie()) turn(id_click(),ai_player);
	}
}

function turn(cell_id, player) 
{
	Board[cell_id] = player;
	document.getElementById(cell_id).innerText = player;
	let gameWon = Win(Board, player);
	if (gameWon) gameOver(gameWon);
}

function Win(board, player) 
{
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);

	let gameWon = null;
	
	for (let [index, win] of winning_Line.entries()) 
	{
		if (win.every(elem => plays.indexOf(elem) > -1)) 
		{
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) 
{
	for (let index of winning_Line[gameWon.index]) 
	{
		document.getElementById(index).style.backgroundColor =
			gameWon.player == human_player ? "#3BB9FF" : "#FF2400";
	}
	for (var i = 0; i < cells.length; i++) 
	{
		cells[i].removeEventListener('click', whenClicked, false);
	}
	declareWinner(gameWon.player == human_player ? "You win!!" : "You lose..");
}

function declareWinner(x)
{
	document.querySelector(".finishgame").style.display = "block";
	document.querySelector(".finishgame .text").innerText = x;
}

function emptyCell() 
{
	return Board.filter(s => typeof s == 'number');
}

function id_click()
{
	return emptyCell()[0];
}

function checkTie()
{
	if (emptyCell().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "#00FF00";
			cells[i].removeEventListener('click', whenClicked, false);
		}
		declareWinner("Tie !!!")
		return true;
	}
	return false;
}