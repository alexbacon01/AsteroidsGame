let ship;
let controller;
let soundManager;
let score = 0;
const NUM_ASTEROIDS = 6;
let asteroids = [];
let hud;
let lives = 3;
let gameRunning = true;

class GameManager {
  createGameObjects(shipImage, asteroidImage, bgMusic, font) {
    let asteroid;
    controller = new GameController();
    ship = controller.createShip(shipImage);
    soundManager = new SoundManager(bgMusic);
    soundManager.backgroundMusic();
    hud = new HUD(font);
    for (let i = 0; i < NUM_ASTEROIDS; i++) {
      asteroid = controller.createAsteroid(asteroidImage, 64);
      asteroids[i] = asteroid;
    }
  }

  drawGame() {
    if (gameRunning) {
      this.checkInputs();
      ship.draw();
      this.wrap(ship);
      for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].draw();
        asteroids[i].move();
        if (this.checkCollisions(asteroids[i], ship)) {
          //check for ship and asteroid collisions
          if (lives > 0) {
            this.respawnShip();
          }
        }
        this.wrap(asteroids[i]);
      }
      hud.drawScore(score);
      hud.drawLives(lives);
    } else {
      hud.endScreen();
      print("End");
    }

    if (lives > 0) {
      gameRunning = true;
    } else {
      gameRunning = false;
    }
  }

  checkInputs() {
    if (keyIsDown(39)) {
      ship.rotateShip(2);
    } else if (keyIsDown(37)) {
      ship.rotateShip(-2);
    }

    if (keyIsDown(32)) {
      //space bar
      ship.fireEngine();
    }

    if (keyIsDown(70)) {
      //F key
      ship.hyperSpace();
    }
  }

  wrap(Object) {
    if (Object.position.x - Object.size / 2 > width) {
      Object.position.x = 0;
    } else if (Object.position.x + Object.size / 2 < 0) {
      Object.position.x = width;
    }

    if (Object.position.y - Object.size / 2 > height) {
      Object.position.y = 0;
    } else if (Object.position.y + Object.size / 2 < 0) {
      Object.position.y = height;
    }
  }

  changeScore(change) {
    score += change;
  }

  checkCollisions(object1, object2) {
    let size1 = object1.size / 2;
    let size2 = object2.size / 2;
    if (
      object1.position.x + size1 >= object2.position.x - size2 &&
      object1.position.x - size1 <= object2.position.x + size2 &&
      object1.position.y + size1 >= object2.position.y &&
      object1.position.y - size1 <= object2.position.y
    ) {
      print(object1.position.y + size1 + " " + object2.position.y);
      return true;
    }
  }

  respawnShip() {
    ship.position = createVector(width / 2, height / 2);
    ship.velocity = createVector(0, 0);
    lives--;
  }
}
