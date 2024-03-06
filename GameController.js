
class GameController {

  createShip(image) {
    let shipStartPos = createVector(width/2, height/2);
    let shipMass = createVector(5,5);
    let ship = new Ship(image,64, shipStartPos,shipMass);
    return ship;
  }
}
