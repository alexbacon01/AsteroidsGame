class GameController {
  spawnShip() {
    let shipPos = new createVector(width / 2, height / 2);
    let ship = new Ship(100, shipPos);
    ship.draw();
  }
}
