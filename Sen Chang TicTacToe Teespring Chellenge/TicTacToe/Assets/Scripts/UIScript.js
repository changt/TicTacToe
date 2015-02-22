#pragma strict
import UnityEngine.UI;
var boardScript: BoardScript;
var victoryPanel: GameObject;//panel to show who wins
var beginPanel: GameObject;//panel to select who moves first
var victoryText: Text;
var circleScoreText: Text;
var crossScoreText: Text;

private var circleScore:int;
private var crossScore:int;
private var CIRCLE = 1;
private var CROSS = 2;


function Start () {
	circleScore = 0;
	crossScore = 0;
}

function Update () {

}

function displayVictory (winner:int) {
	victoryPanel.SetActive(true);
	if (winner == CIRCLE){
		victoryText.text = "Circle Wins";
		circleScore += 1;
		circleScoreText.text = circleScore.ToString();
	}else{
		victoryText.text = "Cross Wins";
		crossScore += 1;
		crossScoreText.text = crossScore.ToString();
	}
}

function displayTie(){
	victoryPanel.SetActive(true);
	victoryText.text = "Tie";
}

function startMatch(firstPlayer:int){
	beginPanel.SetActive(false);
	boardScript.startGame(firstPlayer);
}

function rematch () {
	victoryPanel.SetActive(false);
	boardScript.destroyCells();	
	beginPanel.SetActive(true);
}

function backToMenu () {
	Application.LoadLevel("menu");
}