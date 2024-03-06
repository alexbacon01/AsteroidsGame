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
    ship.wrap();
    for(let i = 0; i<asteroids.length; i++){
      asteroids[i].draw();
      asteroids[i].move();
      asteroids[i].wrap();
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

  wrap(){
    if(this.position.x- this.size/2> width){
      this.position.x = 0;
    } else if(this.position.x +this.size/2< 0){
      this.position.x = width;
    }

    if(this.position.y-this.size/2 > height){
      this.position.y = 0;
    } else if(this.position.y + this.size/2 < 0){
      this.position.y = height;
    }
    }
}
