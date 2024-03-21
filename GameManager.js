let ship;
let controller;
let soundManager;
let score = 0;
const NUM_ASTEROIDS = 7;
let largeAsteroids = [];
let mediumAsteroids = [];
let smallAsteroids = [];
let saucers = [];
let hud;
let startLives = 3;
let lives = startLives;
let livesGained = 1;
let gameRunning = true;
let largeAsteroidsImg;
let medAsteroidImg1;
let medAsteroidImg2;
let smAsteroidImg;
let largeScore = 100;
let mediumScore = 200;
let smallScore = 300;
let saucerInterval = 1000;
let gameStarted = false;
let saucer;
let numSaucers = 0;
let restart = false;

class GameManager {
  constructor() {
    this.leaderboard = new Array(10);
    this.name;
    this.showLeaders = false;
    this.input = createInput("");
    this.input.position(width / 3, height / 2.5);
    this.input.size(width / 3);
  }
  createGameObjects(
    shipImage,
    asteroidImage,
    medAsteroidImg1,
    medAsteroidImg2,
    smallAsteroidImg,
    bgMusic,
    font,
    saucerSFX,
    engineSFX,
    hyperspaceSFX,
    asteroidSFX,
    shotSFX
  ) {
    let asteroid;
    controller = new GameController();
    ship = controller.createShip(
      shipImage,
      startLives,
      engineSFX,
      hyperspaceSFX,
      shotSFX
    );
    largeAsteroidsImg = asteroidImage;
    medAsteroidImg1 = medAsteroidImg1;
    medAsteroidImg2 = medAsteroidImg2;
    smAsteroidImg = smallAsteroidImg;
    soundManager = new SoundManager(bgMusic);
    soundManager.backgroundMusic();
    hud = new HUD(font);
    for (let i = 0; i < NUM_ASTEROIDS; i++) {
      asteroid = controller.createAsteroid(asteroidImage, 96, 1.1);
      largeAsteroids[i] = asteroid;
    }
  }

  drawGame() {
    if (gameRunning) {
      controller.checkInputs();

      //ship
      ship.draw();
      if (score / saucerInterval > numSaucers) {
        saucers.push(controller.createSaucer(96));
        soundManager.playSound(saucerSFX);
        numSaucers++;
      }
      for (let i = 0; i < saucers.length; i++) {
        if (saucers[i] != null) {
          saucers[i].draw();
          saucers[i].move();
          saucers[i].shoot(ship.position);
          controller.wrap(saucers[i]);
          this.checkAsteroids(largeAsteroids, 1, saucers[i]);
          this.checkAsteroids(mediumAsteroids, 2, saucers[i]);
          this.checkAsteroids(smallAsteroids, 3, saucers[i]);

          if (controller.checkCollisions(ship, saucers[i])) {
            saucers[i].lives -= 1;
            ship.lives -= 1;
            controller.respawnShip();
          }

          for (let j = 0; j < saucers[i].bullets.length; j++) {
            if (controller.checkCollisions(ship, saucers[i].bullets[j])) {
              controller.wrap(saucers[i].bullets[j]);
              ship.lives -= 1;
              controller.respawnShip();
            }
          }

          for (let j = 0; j < ship.bullets.length; j++) {
            if (controller.checkCollisions(saucers[i], ship.bullets[j])) {
              saucers[i].lives -= 1;
              this.changeScore(saucers[i].points);
            }
          }

          controller.showBullets(saucers[i]);

          if (saucers[i].lives == 0) {
            saucers.splice(i, 1);
          }
        }
      }

      controller.showBullets(ship);
      controller.wrap(ship);

      //asteroids
      this.checkAsteroids(largeAsteroids, 1, ship);
      this.checkAsteroids(mediumAsteroids, 2, ship);
      this.checkAsteroids(smallAsteroids, 3, ship);

      //hud
      hud.drawScore(score);
      hud.drawLives(ship.lives);
    }
    if (!gameRunning && gameStarted) {
      hud.endScreen(score);

      this.storeScore(this.name, score);
      if (hud.restartButton.clicked()) {
        ship.lives = startLives;
        score = 0;
        gameRunning = true;
        largeAsteroids = [];
        mediumAsteroids = [];
        smallAsteroids = [];
        saucers = [];
        restart = true;
      }

      if (hud.leaderboardButton.clicked()) {
        this.showLeaders = true;
      }
    }
    if (!gameRunning && !gameStarted) {
      hud.titleScreen();
      this.name = this.input.value();
      if (hud.startButton.clicked() && this.name != "") {
        this.input.position(-1000, -1000);
        gameStarted = true;
      }
      if (hud.leaderboardButton.clicked()) {
        this.showLeaders = true;
      }
    }

    if (this.showLeaders) {
      hud.displayLeader(this.leaderboard);
      this.input.position(-1000, -1000);
      if (hud.startButton.clicked()) {
        this.showLeaders = false;
        gameStarted = true;
      }
    }
    //end game
    if (ship.lives > 0 && gameStarted) {
      gameRunning = true;
    } else {
      gameRunning = false;
    }
  }

  changeScore(change) {
    score += change;
    if (score / 10000 >= livesGained) {
      ship.lives += 1;
      livesGained += 1;
    }
  }

  asteroidBreak(size, pos, velocity) {
    soundManager.playSound(asteroidSFX);
    let newA;
    let direction = createVector(random(-1, 1), random(-1, 1));
    print("break");
    if (size == 2) {
      newA = new Asteroid(
        mediumAsteroidImg1,
        pos,
        64,
        velocity.copy(),
        direction,
        4
      );
    }
    if (size == 3) {
      newA = new Asteroid(
        mediumAsteroidImg2,
        pos,
        64,
        velocity.copy(),
        direction,
        4
      );
    }
    if (size == 4) {
      newA = new Asteroid(
        smAsteroidImg,
        pos,
        32,
        velocity.copy(),
        direction,
        6
      );
    }
    return newA;
  }

  checkAsteroids(size, stage, object) {
    let isShip = false;
    if (object == ship) {
      isShip = true;
    }
    for (let i = 0; i < size.length; i++) {
      size[i].draw();
      size[i].move();
      if (controller.checkCollisions(size[i], object)) {
        //check for object and asteroid collisions
        if (ship.lives > 0 && isShip) {
          controller.respawnShip();
        }
        object.lives -= 1;
      }
      controller.wrap(size[i]);
      for (let j = 0; j < object.bullets.length; j++) {
        if (controller.checkCollisions(object.bullets[j], size[i])) {
          if (stage == 1) {
            mediumAsteroids.push(
              this.asteroidBreak(
                2,
                size[i].position.copy(),
                size[i].velocity.copy()
              )
            );
            mediumAsteroids.push(
              this.asteroidBreak(
                3,
                size[i].position.copy(),
                size[i].velocity.copy()
              )
            );
            largeAsteroids.splice(i, 1);
            if (isShip) {
              this.changeScore(largeScore);
            }
          }
          if (stage == 2) {
            smallAsteroids.push(
              this.asteroidBreak(
                4,
                size[i].position.copy(),
                size[i].velocity.copy()
              )
            );
            smallAsteroids.push(
              this.asteroidBreak(
                4,
                size[i].position.copy(),
                size[i].velocity.copy()
              )
            );
            mediumAsteroids.splice(i, 1);

            if (isShip) {
              this.changeScore(mediumScore);
            }
          }
          if (stage == 3) {
            smallAsteroids.splice(i, 1);
            if (isShip) {
              this.changeScore(smallScore);
            }
          }
          object.bullets.splice(j, 1);
        }
      }
    }
  }

  storeScore(name, score) {
    for (let i = 0; i < 11; i++) {
      let val = i;
      if (getItem(val.toString()) < score) {
        storeItem((val + 1).toString(), getItem(val.toString()));
        storeItem(val + 1 + "name", getItem((val + 1 + "name").toString()));
        storeItem(val.toString(), score);
        storeItem(val + "name", name);
        this.score = 0;
        return;
        print(i);
      } else if (getItem(val.toString()) == null) {
        storeItem(val.toString(), score);
        storeItem(val + "name", name);
        this.score = 0;
        return;
      }
    }
  }
}
