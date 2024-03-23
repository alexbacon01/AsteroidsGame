
class GameManager {
  constructor() {
    this.leaderboard = new Array(10);
    this.name;
    this.hud;
    this.soundManager;

    //state of game bools
    this.showLeaders = false;
    this.gameRunning = true;
    this.gameStarted = false;
    this.shouldSave = true;
    this.invulnreable = true;

    //input box
    this.input = createInput("");
    this.input.position(width / 3, height / 2.5);
    this.input.size(width / 3);

    //arrays of objects
    this.largeAsteroids = [];
    this.mediumAsteroids = [];
    this.smallAsteroids = [];
    this.saucers = [];

    //game objects
    this.ship;
    this.controller;

    //pictures
    this.largeAsteroidsImg;
    this.medAsteroidImg1;
    this.medAsteroidImg2;
    this.smAsteroidImg;

    this.score = 0;
    this.numSaucers = 1;
    this.livesGained = 1;
    this.startLives = 3;
    this.currentLevel = 1;

    //asteroid scores
    this.largeScore = 100;
    this.mediumScore = 200;
    this.smallScore = 300;

    this.saucerInterval = 800;
    this.numAsteroids =  this.currentLevel * 2;
    this.currentNumAsteroids = this.numAsteroids;
    this.restart = false;
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
    this.soundManager = new SoundManager(bgMusic);
    this.soundManager.backgroundMusic();
    this.hud = new HUD(font);
    this.controller = new GameController(this.soundManager,engineSFX,
      hyperspaceSFX, shotSFX, saucerSFX);
    let asteroid;
    this.ship = this.controller.createShip(
      shipImage,
      this.startLives);
    this.largeAsteroidsImg = asteroidImage;
    this.medAsteroidImg1 = medAsteroidImg1;
    this.medAsteroidImg2 = medAsteroidImg2;
    this.smAsteroidImg = smallAsteroidImg;
    for (let i = 0; i < this.numAsteroids; i++) {
      asteroid = this.controller.createAsteroid(asteroidImage, 96, 1.1);
      this.largeAsteroids[i] = asteroid;
    }
  }

  drawGame() {
    print(this.currentNumAsteroids);
    if (this.gameRunning) {
      this.controller.checkInputs(this.ship); //check for player controls

      //ship draw, show the bullets on screen, and wrap around screen
      this.ship.draw();
      this.controller.showBullets(this.ship);
      this.controller.wrap(this.ship);

      //deals with all the saucer issues
      this.handleSaucers();

      //asteroids
      this.checkAsteroids(this.largeAsteroids, 1, this.ship);
      this.checkAsteroids(this.mediumAsteroids, 2, this.ship);
      this.checkAsteroids(this.smallAsteroids, 3, this.ship);

      //hud
      this.hud.drawScore(this.score);
      this.hud.drawLives(this.ship.lives);
    }
    this.trackState();
  }

  changeScore(change) {
    this.score += change;
    if (this.score / 2000 >= this.livesGained) {
      this.ship.lives += 1;
      this.livesGained += 1;
    }
  }

  asteroidBreak(size, pos, velocity) {
    this.soundManager.playSound(asteroidSFX);
    let newA;
    let direction = createVector(random(-1, 1), random(-1, 1));
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
        this.smAsteroidImg,
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
    if (object == this.ship) {
      isShip = true;
    }
    for (let i = 0; i < size.length; i++) {
      if(isShip){
        size[i].draw();
        size[i].move();
      }
      if (this.controller.checkCollisions(size[i], object)) {
        //check for object and asteroid collisions
        if (this.ship.lives > 0 && isShip) {
          this.controller.respawnShip(this.ship);
        }
        object.lives -= 1;
      }
      this.controller.wrap(size[i]);
      for (let j = 0; j < object.bullets.length; j++) {
        if (this.controller.checkCollisions(object.bullets[j], size[i])) {
          if (stage == 1) {
            this.mediumAsteroids.push(
              this.asteroidBreak(
                2,
                size[i].position.copy(),
                size[i].velocity.copy()
              )
            );
            this.mediumAsteroids.push(
              this.asteroidBreak(
                3,
                size[i].position.copy(),
                size[i].velocity.copy()
              )
            );
            this.largeAsteroids.splice(i, 1);
            if (isShip) {
              this.changeScore(this.largeScore);
            }
            this.currentNumAsteroids++;
          }
          if (stage == 2) {
            this.smallAsteroids.push(
              this.asteroidBreak(
                4,
                size[i].position.copy(),
                size[i].velocity.copy()
              )
            );
            this.smallAsteroids.push(
              this.asteroidBreak(
                4,
                size[i].position.copy(),
                size[i].velocity.copy()
              )
            );
            this.mediumAsteroids.splice(i, 1);
            this.currentNumAsteroids++;
            if (isShip) {
              this.changeScore(this.mediumScore);
            }
          }
          if (stage == 3) {
            this.smallAsteroids.splice(i, 1);
            this.currentNumAsteroids--;
            if (isShip) {
              this.changeScore(this.smallScore);
            }
          }
          object.bullets.splice(j, 1);
        }
      }
    }
  }

  handleSaucers() {
    if (this.score / this.saucerInterval >= this.numSaucers) {
      this.saucers.push(this.controller.createSaucer(96));
      this.numSaucers += 1;
      print(this.numSaucers);
    }
    for (let i = 0; i < this.saucers.length; i++) {
      if (this.saucers[i] != null) {
        this.saucers[i].draw();
        this.saucers[i].move();
        this.saucers[i].shoot(this.ship.position, this.score);
        this.controller.showBullets(this.saucers[i]);
        this.controller.wrap(this.saucers[i]);
        this.checkAsteroids(this.largeAsteroids, 1, this.saucers[i]);
        this.checkAsteroids(this.mediumAsteroids, 2, this.saucers[i]);
        this.checkAsteroids(this.smallAsteroids, 3, this.saucers[i]);
        if (this.controller.checkCollisions(this.ship, this.saucers[i])) {
          this.saucers[i].lives -= 1;
          this.ship.lives -= 1;
          this.controller.respawnShip(this.ship);
        }

        for (let j = 0; j < this.saucers[i].bullets.length; j++) {
          if (
            this.controller.checkCollisions(
              this.ship,
              this.saucers[i].bullets[j]
            )
          ) {
            this.controller.wrap(this.saucers[i].bullets[j]);
            this.ship.lives -= 1;
            this.controller.respawnShip(this.ship);
          }
        }

        for (let j = 0; j < this.ship.bullets.length; j++) {
          if (
            this.controller.checkCollisions(
              this.saucers[i],
              this.ship.bullets[j]
            )
          ) {
            this.saucers[i].lives -= 1;
            this.changeScore(this.saucers[i].points);
          }
        }

        if (this.saucers[i].lives == 0) {
          this.saucers.splice(i, 1);
        }
      }
    }
  }

  storeScore(name, score) {
    for (let i = 1; i < 11; i++) {
      let val = i;
      if (getItem(val.toString()) < score && this.shouldSave) {
        storeItem((val + 1).toString(), getItem(val.toString()));
        storeItem(val + 1 + "name", getItem((val + 1 + "name").toString()));
        storeItem(val.toString(), score);
        storeItem(val + "name", name);
        this.shouldSave = false;
        return;
      } else if (getItem(val.toString()) == null && this.shouldSave) {
        storeItem(val.toString(), score);
        storeItem(val + "name", name);
        this.shouldSave = false;
        return;
      }
    }
  }

  nextLevel() {
    this.currentLevel++;
    this.gameRunning = true;
    this.largeAsteroids = [];
    this.mediumAsteroids = [];
    this.smallAsteroids = [];
    this.saucers = [];
    this.restart = true;
    this.currentNumAsteroids = this.numAsteroids;
  }

  trackState() {
    if (!this.gameRunning && this.gameStarted) {
      this.hud.endScreen(this.score);

      this.storeScore(this.name, this.score);
      if (this.hud.restartButton.clicked()) {
        this.ship.lives = this.startLives;
        this.score = 0;
        this.gameRunning = true;
        this.largeAsteroids = [];
        this.mediumAsteroids = [];
        this.smallAsteroids = [];
        this.saucers = [];
        this.restart = true;
        this.shouldSave = true;
        this.currentNumAsteroids = this.numAsteroids;
      }

      if (this.hud.leaderboardButton.clicked()) {
        this.showLeaders = true;
      }
    }
    if (!this.gameRunning && !this.gameStarted) {
      this.hud.titleScreen();
      this.name = this.input.value();
      if (this.hud.startButton.clicked() && this.name != "") {
        this.input.position(-1000, -1000);
        this.soundManager.backgroundMusic();
        this.gameStarted = true;
        this.shouldSave = true;
        
      }
      if (this.hud.leaderboardButton.clicked()) {
        this.showLeaders = true;
      }
    }

    if (this.showLeaders) {
      this.hud.displayLeader(this.leaderboard);
      this.input.position(-1000, -1000);
      if (this.hud.startButton.clicked()) {
        this.showLeaders = false;
        this.gameStarted = true;
        this.soundManager.backgroundMusic();
        this.currentNumAsteroids = this.numAsteroids;
      }
    }
    //end game
    if (this.ship.lives > 0 && this.gameStarted) {
      this.gameRunning = true;
    } else {
      this.gameRunning = false;
      this.soundManager.stopMusic();
    }

    if (this.currentNumAsteroids == 0) {
      this.nextLevel();
    }
  }
}
