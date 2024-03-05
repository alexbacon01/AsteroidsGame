class GameController {
  createShip() {
    let shipStartPos = createVector(100, 100);
    let ship = new Ship(100, shipStartPos);
    return ship;
  }
}
