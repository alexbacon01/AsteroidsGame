let gameManager;
let shipImg;

function preload(){
  shipImg = loadImage('images/xwingImage.png'); 
  asteroidImg = loadImage('images/asteroid.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager();
  gameManager.createGameObjects(shipImg, asteroidImg);
}

function draw() {
  background(0);
  gameManager.drawGame();

}
