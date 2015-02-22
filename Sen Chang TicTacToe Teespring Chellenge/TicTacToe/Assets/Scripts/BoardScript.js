#pragma strict
//Unity's version of javaScript. Some variables needs to be typed.
//public variables can also be given value in the editor.
var xSize:int;
var ySize:int;
var winningChainSize:int;

var cellPrefab:GameObject;
var uiScript:UIScript;


var currentPlayer:int;
private var CIRCLE = 1;
private var CROSS = 2;

//Array that contains reference to the cellScripts on the board.
private var cells:CellScript[,];
//How many empty spaces are there left on the board, accounts for ties.
private var emptySpace:int;

//Input is disabled when a dialog box is up.
var inputDisabled:boolean;

function Start () {
}

function Update () {
}

function startGame(firstPlayer:int) {
	inputDisabled = false;
	currentPlayer = firstPlayer;
	emptySpace = xSize * ySize;
	cells = new CellScript[xSize, ySize];
	for (var i = 0; i < xSize; i++) {
		for (var j = 0; j < ySize; j++){
			var newCell:GameObject = Instantiate (cellPrefab, new Vector2(0,0),Quaternion.identity);
			var newCellScript:CellScript = newCell.GetComponent(CellScript);
			cells[i,j] = newCellScript;
			newCellScript.x = i;
			newCellScript.y = j;
			newCellScript.boardScript = this;
		}
	}
}

//Reset all cells on the board for a new game
function destroyCells() {
	for (var i = 0; i < xSize; i++) {
		for (var j = 0; j < ySize; j++){
			Destroy(cells[i,j].gameObject);
		}
	}
}

//x,y are the coordinate of the move being made by the current player.
//This function is only called when (x,y) is empty.
function makeMove(x:int,y:int) {
	emptySpace -= 1;
	checkVictory(x,y);	//only need to check for chains made possibly at (x,y)
	//Switch the current player.
	if (currentPlayer == 1){
		currentPlayer = 2;
	} else {
		currentPlayer = 1;
	}
}


function checkVictory(x:int,y:int) {

	var directions = [[1,0],[0,1],[1,-1],[1,1]];
	var maxChainLength = 0;
	//get the maximum chain length in each direction.
	for(var direction in directions){
		var chainLength = getChainLength(x,y,direction[0],direction[1]);
		if (chainLength >maxChainLength){
			maxChainLength = chainLength;
		}
	}
	
	if (maxChainLength >= winningChainSize){
		inputDisabled = true;
		uiScript.displayVictory(currentPlayer);
	}else if (emptySpace == 0){
		uiScript.displayTie();
	}
}

//Counts the length of chain containing (x,y) along one direction.
function getChainLength(x:int, y: int, xIncrement: int, yIncrement: int){
	var countUp = 0;
	var countDown = 0;
	while (cells[x + countUp * xIncrement, y + countUp * yIncrement].cellStatus == cells[x,y].cellStatus){
		countUp ++;
		if (Mathf.Max(x + countUp * xIncrement, y + countUp * yIncrement) > xSize - 1 || Mathf.Min(x + countUp * xIncrement, y + countUp * yIncrement) < 0){
			break;
		}
	}
	while (cells[x - countDown * xIncrement, y - countDown * yIncrement].cellStatus == cells[x,y].cellStatus){
		countDown ++;
		if (Mathf.Max(x - countDown * xIncrement, y - countDown * yIncrement) > xSize - 1 || Mathf.Min(x - countDown * xIncrement, y - countDown * yIncrement) < 0){
			break;
		}
	}
	return countUp + countDown - 1;
}