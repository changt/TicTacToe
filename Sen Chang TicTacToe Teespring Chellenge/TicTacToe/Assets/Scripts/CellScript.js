#pragma strict
//The cell's location on the board
var x:int;
var y:int;

var boardScript:BoardScript;

//how big the sprite is, used to shift each cell the approprite distance from each other
var scaling:int;

//what is currently in the cell
var cellStatus = 0; 
private var EMPTY = 0;
private var CIRCLE = 1;
private var CROSS = 2;

//what is currently being shown in the cell
private var cellDisplay = 0;
private var EMPTYDISPLAY = EMPTY;
private var CIRCLEDISPLAY = CIRCLE;
private var CROSSDISPLAY = CROSS;
private var CIRCLEPENDINGDISPLAY = 3;
private var CROSSPENDINGDISPLAY = 4;

//Possible textures that the cell could have.
var emptySprite:Sprite;
var circleSprite:Sprite;
var crossSprite:Sprite;
var circlePending:Sprite;
var crossPending:Sprite;
private var sprites:Sprite[];

function Start () {
	sprites = [emptySprite,circleSprite,crossSprite,circlePending,crossPending];
	gameObject.transform.parent = boardScript.gameObject.transform;
	gameObject.transform.localPosition = new Vector2 (0,0);
	var xOffset = boardScript.xSize/2.0f - 0.5f;
	var yOffset = boardScript.ySize/2.0f - 0.5f;
	gameObject.transform.Translate (scaling * new Vector2(x - xOffset, y - yOffset), gameObject.transform.parent);
}

function Update () {
		gameObject.GetComponent(SpriteRenderer).sprite = sprites[cellDisplay];
}

function OnMouseUpAsButton () {
	if (cellStatus == EMPTY && !boardScript.inputDisabled){
		cellStatus = boardScript.currentPlayer;
		cellDisplay = cellStatus;
		boardScript.makeMove(x,y);
	}
}

//Creates the hover-over effect.
function OnMouseOver () {
	if (cellStatus == EMPTY && !boardScript.inputDisabled){
		if (boardScript.currentPlayer == CIRCLE){
			cellDisplay = CIRCLEPENDINGDISPLAY;
		}else{
			cellDisplay = CROSSPENDINGDISPLAY;
		}
	}
}

function OnMouseExit () {
	cellDisplay = cellStatus;
}