let ship;
let controller;

class GameManager {
  createGameObjects(shipImage) {
    controller = new GameController();
    ship = controller.createShip(shipImage);
  }

  drawGame() {
    this.checkInputs();
    ship.draw();
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
