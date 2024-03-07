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
      controller.checkInputs();
      ship.draw();
      for (let i = 0; i < ship.bullets.length; i++) {
        if (ship.bullets[i] != null && ship.bullets[i].alive) {
          ship.bullets[i].draw();
          ship.bullets[i].shoot();
          controller.wrap(ship.bullets[i]);
        } else {
          ship.bullets.pop();
        }
      }

      controller.wrap(ship);

      for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].draw();
        asteroids[i].move();
        if (controller.checkCollisions(asteroids[i], ship)) {
          //check for ship and asteroid collisions
          if (lives > 0) {
            controller.respawnShip();
          }
        }
        controller.wrap(asteroids[i]);
        for (let j = 0; j < ship.bullets.length; j++) {
          if (
            controller.checkCollisions(ship.bullets[j], asteroids[i]) &&
            ship.bullets[j] != null
          ) {
            asteroids[i].break();
          }
        }
      }
      hud.drawScore(score);
      hud.drawLives(lives);
    } else {
      hud.endScreen();
    }

    if (lives > 0) {
      gameRunning = true;
    } else {
      gameRunning = false;
    }
  }

  changeScore(change) {
    score += change;
  }
}
