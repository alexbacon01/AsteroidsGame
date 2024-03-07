let gameManager;
let shipImg;
let asteroidImg;
let bgMusic;
let gameFont;

function preload(){
  shipImg = loadImage('Images/xwingImage.png'); 
  asteroidImg = loadImage('Images/asteroid.png');
  bgMusic = loadSound('Sounds/AsteroidsBackgroundMusic.mp3');
  gameFont = loadFont('Fonts/StarJediRounded.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager();
  gameManager.createGameObjects(shipImg, asteroidImg, bgMusic, gameFont);
}

function draw() {
  background(0);
  gameManager.drawGame();

}
