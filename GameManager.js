let ship;
let controller;
const NUM_ASTEROIDS = 6;
let asteroids = [];

class GameManager {
  createGameObjects(shipImage, asteroidImage) {
    let asteroid;
    controller = new GameController();
    ship = controller.createShip(shipImage);
    for(let i = 0; i<NUM_ASTEROIDS; i++){
      asteroid = controller.createAsteroid(asteroidImage, 64);
      asteroids[i] = asteroid;
    }
  }

  drawGame() {
    this.checkInputs();
    ship.draw();
    for(let i = 0; i<asteroids.length; i++){
      asteroids[i].draw();
      asteroids[i].move();
    }
    

  }

  checkInputs() {
    if (keyIsDown(39)) {
      ship.rotateShip(2);
    } else if (keyIsDown(37)) {
      ship.rotateShip(-2);
    }

    if(keyIsDown(32)){ //space bar
      ship.fireEngine();
    }

    if(keyIsDown(70)){//F key
      ship.hyperSpace();
    } 
  }


}
