let gameManager;
let shipImg;
let asteroidImg;
let mediumAsteroidImg1;
let mediumAsteroidImg2;
let smallAsteroidImg;
let bgMusic;
let saucerSFX;
let engineSFX;
let hyperspaceSFX;
let asteroidSFX;
let shotSFX;
let gameFont;

function preload() {
  //load pictures
  shipImg = loadImage("Images/xwingImage.png");
  asteroidImg = loadImage("Images/asteroid.png");
  mediumAsteroidImg1 = loadImage("Images/mediumAsteroid.png");
  mediumAsteroidImg2 = loadImage("Images/mediumAsteroid2.png");
  smallAsteroidImg = loadImage("Images/smallAsteroid.png");
  //load sounds
  bgMusic = loadSound("Sounds/AsteroidsBackgroundMusic.mp3");
  saucerSFX = loadSound("Sounds/Saucer.mp3");
  engineSFX = loadSound("Sounds/EngineFire.mp3");
  hyperspaceSFX = loadSound("Sounds/Hyperspace.mp3");
  asteroidSFX = loadSound("Sounds/AsteroidBreak.mp3");
  shotSFX = loadSound("Sounds/ShipShot.mp3");
  //load font
  gameFont = loadFont("Fonts/StarJediRounded.ttf");
}

function setup() {
  createCanvas(1920, 1080);
  gameManager = new GameManager();
  gameManager.createGameObjects(
    shipImg,
    asteroidImg,
    mediumAsteroidImg1,
    mediumAsteroidImg2,
    smallAsteroidImg,
    bgMusic,
    gameFont,
    saucerSFX,
    engineSFX,
    hyperspaceSFX,
    asteroidSFX,
    shotSFX
  );
}

function draw() {
  background(0);
  gameManager.drawGame();
  if (restart) {
    gameManager.createGameObjects(
      shipImg,
      asteroidImg,
      mediumAsteroidImg1,
      mediumAsteroidImg2,
      smallAsteroidImg,
      bgMusic,
      gameFont,
      saucerSFX,
      engineSFX,
      hyperspaceSFX,
      asteroidSFX,
      shotSFX
    );
    restart = false;
  }
}
