let ship;
let controller;

class GameManager {
  createGameObjects(shipImage) {
    controller = new GameController();
    ship = controller.createShip(shipImage);
  }

  drawGame() {
    ship.draw();
    this.checkInputs();
  }

  checkInputs() {
    if (keyIsDown(39)) {
      ship.rotateShip(4);
    } else if (keyIsDown(37)) {
      ship.rotateShip(-4);
    }

    if(keyIsDown(32)){
      ship.fireEngine();
    }
  }
}
