let gameManager;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager();
  gameManager.createGameObjects();
}

function draw() {
  background(220);
  gameManager.drawGame();
}
