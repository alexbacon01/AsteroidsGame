
class GameController {

  createShip(image) {
    let shipStartPos = createVector(100, 100);
    let shipMass = createVector(5,5);
    let ship = new Ship(image,100, shipStartPos,shipMass);
    return ship;
  }
}
