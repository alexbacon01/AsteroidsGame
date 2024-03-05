let gameManager;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager();
}

function draw() {
  background(220);
  gameManager.createGameObjects();
  gameManager.drawGame();
}
