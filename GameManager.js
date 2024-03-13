let ship;
let controller;
let soundManager;
let score = 0;
const NUM_ASTEROIDS = 6;
let largeAsteroids = [];
let mediumAsteroids = [];
let smallAsteroids = [];
let hud;
let lives = 3;
let gameRunning = true;
let maxBulletTime = 200;
let largeAsteroidsImg;
let medAsteroidImg1;
let medAsteroidImg2;
let smAsteroidImg;
let largeScore = 100;
let mediumScore = largeScore + largeScore/2; 
let smallScore = mediumScore + mediumScore/2;

class GameManager {
  createGameObjects(shipImage, asteroidImage, medAsteroidImg1, medAsteroidImg2, smallAsteroidImg, bgMusic, font) {
    let asteroid;
    controller = new GameController();
    ship = controller.createShip(shipImage);
    largeAsteroidsImg= asteroidImage;
    medAsteroidImg1 = medAsteroidImg1;
    medAsteroidImg2 = medAsteroidImg2;
    smAsteroidImg = smallAsteroidImg;
    soundManager = new SoundManager(bgMusic);
    soundManager.backgroundMusic();
    hud = new HUD(font);
    for (let i = 0; i < NUM_ASTEROIDS; i++) {
      asteroid = controller.createAsteroid(asteroidImage, 96);
      largeAsteroids[i] = asteroid;
    }
  }

  drawGame() {
    if (gameRunning) {
      controller.checkInputs();

      //ship
      ship.draw();
      for (let i = 0; i < ship.bullets.length; i++) {
        if (ship.bullets[i] != null) {
          ship.bullets[i].draw();
          ship.bullets[i].shoot();
          controller.wrap(ship.bullets[i]);
          ship.bullets[i].timer();
  
          if(ship.bullets[i].getTime() > maxBulletTime){
            ship.bullets.shift();
          }
        }
      }
      controller.wrap(ship);

      //asteroids
      this.checkAsteroids(largeAsteroids, 1);
      this.checkAsteroids(mediumAsteroids, 2);
      this.checkAsteroids(smallAsteroids, 3);

      //hud
      hud.drawScore(score);
      hud.drawLives(lives);
    } else {
      hud.endScreen();
    }

    //end game
    if (lives > 0) {
      gameRunning = true;
    } else {
      gameRunning = false;
    }
  }

  changeScore(change) {
    score += change;
  }

  asteroidBreak(size, pos, velocity){
    let newA;
    let direction = createVector(random(-1, 1), random(-1, 1));
    if(size == 2){
    newA = new Asteroid(mediumAsteroidImg1, pos, 96, velocity, direction);
    } 
    if(size == 3){
      newA = new Asteroid(mediumAsteroidImg2, pos, 96, velocity, direction);
    } 
     if(size == 4){
      newA = new Asteroid(smAsteroidImg, pos, 96, velocity, direction);
    }
    return newA;
  }

  checkAsteroids(size, stage){
    for (let i = 0; i < size.length; i++) {
      size[i].draw();
      size[i].move();
      if (controller.checkCollisions(size[i], ship)) {
        //check for ship and asteroid collisions
        if (lives > 0) {
          controller.respawnShip();
        }
      }
      controller.wrap(size[i]);
      for (let j = 0; j < ship.bullets.length; j++) {
        if (
          controller.checkCollisions(ship.bullets[j], size[i]) &&
          ship.bullets[j] != null && size[i] !=null
        ) {
          if(stage ==1){
            mediumAsteroids.push(this.asteroidBreak(2,size[i].position.copy(), size[i].velocity));
            mediumAsteroids.push(this.asteroidBreak(3,size[i].position.copy(), size[i].velocity));
            largeAsteroids.splice(i, 1);
            this.changeScore(largeScore);
          } 
           if(stage ==2){
            smallAsteroids.push(this.asteroidBreak(4,size[i].position.copy(), size[i].velocity));
            smallAsteroids.push(this.asteroidBreak(4,size[i].position.copy(), size[i].velocity));
            mediumAsteroids.splice(i, 1);
            this.changeScore(mediumScore);
          }
          if(stage ==3){
            smallAsteroids.splice(i, 1);
            this.changeScore(smallScore);
          }
          ship.bullets.splice(j,1);
        } 
      }
    }
  }
}
