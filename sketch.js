let gameManager;
let shipImg;
let asteroidImg;
let bgMusic;

function preload(){
  shipImg = loadImage('images/xwingImage.png'); 
  asteroidImg = loadImage('images/asteroid.png');
  bgMusic = loadSound('Sounds/AsteroidsBackgroundMusic.mp3');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager();
  gameManager.createGameObjects(shipImg, asteroidImg, bgMusic);
}

function draw() {
  background(0);
  gameManager.drawGame();
}
