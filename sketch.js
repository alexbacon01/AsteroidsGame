let gameManager;
let shipImg;

function preload(){
  shipImg = loadImage('images/xwing.png'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager();
  gameManager.createGameObjects(shipImg);
}

function draw() {
  background(0);
  gameManager.drawGame();

}
