let gameManager;
let shipImg;
let asteroidImg;
let mediumAsteroidImg1;
let mediumAsteroidImg2;
let smallAsteroidImg;
let bgMusic;
let gameFont;

function preload(){
  shipImg = loadImage('Images/xwingImage.png'); 
  asteroidImg = loadImage('Images/asteroid.png');
  mediumAsteroidImg1 = loadImage('Images/mediumAsteroid.png');
  mediumAsteroidImg2 = loadImage('Images/mediumAsteroid2.png');
  smallAsteroidImg = loadImage('Images/smallAsteroid.png');
  bgMusic = loadSound('Sounds/AsteroidsBackgroundMusic.mp3');
  gameFont = loadFont('Fonts/StarJediRounded.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager();
  gameManager.createGameObjects(shipImg, asteroidImg, mediumAsteroidImg1, mediumAsteroidImg2, smallAsteroidImg, bgMusic, gameFont);
}

function draw() {
  background(0);
  gameManager.drawGame();

}
