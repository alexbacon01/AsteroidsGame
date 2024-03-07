class GameController {
  createShip(image) {
    let shipStartPos = createVector(width / 2, height / 2);
    let shipMass = createVector(5, 5);
    let ship = new Ship(image, 64, shipStartPos, shipMass);
    return ship;
  }

  createAsteroid(image, size) {
    let x = random(0 + size / 2, width - size / 2);
    let y = random(0 + size / 2, height - size / 2);

    let startPos = createVector(x, y);
    let asteroid = new Asteroid(image, startPos, size);
    return asteroid;
  }

  checkInputs() {
    if (keyIsDown(39)) {
      ship.rotateShip(2);
    } else if (keyIsDown(37)) {
      ship.rotateShip(-2);
    }

    if (keyIsDown(38)) {
      //space bar
      ship.fireEngine();
    }

    if (keyIsDown(70)) {
      //F key
      ship.hyperSpace();
    }

    if (keyIsDown(32)) {
      ship.shootBullet();
    }
  }

  wrap(Object) {
    if (Object.position.x - Object.size / 2 > width) {
      Object.position.x = 0;
    } else if (Object.position.x + Object.size / 2 < 0) {
      Object.position.x = width;
    }

    if (Object.position.y - Object.size / 2 > height) {
      Object.position.y = 0;
    } else if (Object.position.y + Object.size / 2 < 0) {
      Object.position.y = height;
    }
  }

  checkCollisions(object1, object2) {
    let size1 = object1.size / 2;
    let size2 = object2.size / 2;
    if (
      object1.position.x + size1 >= object2.position.x - size2 &&
      object1.position.x - size1 <= object2.position.x + size2 &&
      object1.position.y + size1 >= object2.position.y &&
      object1.position.y - size1 <= object2.position.y
    ) {
      return true;
    }
  }

  respawnShip() {
    ship.position = createVector(width / 2, height / 2);
    ship.velocity = createVector(0, 0);
    ship.angle = -90;
    lives--;
  }
}
