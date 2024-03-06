
class GameController {

  createShip(image) {
    let shipStartPos = createVector(width/2, height/2);
    let shipMass = createVector(5,5);
    let ship = new Ship(image,64, shipStartPos,shipMass);
    return ship;
  }

  createAsteroid(image, size){
    let x = random(0 + size/2, width-size/2);
    let y = random(0 + size/2, height-size/2);

    let startPos = createVector(x, y);
    let asteroid = new Asteroid(image, startPos, size);
    return asteroid;
  }
}
