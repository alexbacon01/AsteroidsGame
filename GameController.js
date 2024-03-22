let maxBulletTime = 200;
let engineSound;
let hyperspaceSound;
let shotSound;
class GameController {
  createShip(image, startingLives, engineSFX, hyperspaceSFX, shotSFX) {
    let shipStartPos = createVector(width / 2, height / 2);
    let shipMass = createVector(5, 5);
    let ship = new Ship(image, 64, shipStartPos, shipMass, startingLives);
    engineSound = engineSFX;
    hyperspaceSound = hyperspaceSFX;
    shotSound = shotSFX;
    return ship;
  }

  createAsteroid(image, size, multiplier) {
    let x = random(0 + size / 2, width - size / 2);
    let y = random(0 + size / 2, height - size / 2);

    let startPos = createVector(x, y);
    let asteroid = new Asteroid(
      image,
      startPos,
      size,
      createVector(0, 0),
      createVector(random(-1, 1), random(-1, 1)),
      random(0, 360),
      multiplier
    );
    return asteroid;
  }

  createSaucer(saucerSize) {
    let x = -50;
    let y = random(height - saucerSize, height / 3);

    let saucerStartPos = createVector(x, y);
    let saucer = new Saucer(
      saucerStartPos,
      saucerSize,
      createVector(0, 0),
      createVector(1, 0),
      random(0, 360),
      75
    );
    return saucer;
  }

  checkInputs(ship) {
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
      soundManager.playSound(hyperspaceSFX);
    }

    if (keyIsDown(32)) {
      ship.shootBullet(1);
      soundManager.playSound(shotSFX);
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

  showBullets(object) {
    for (let i = 0; i < object.bullets.length; i++) {
      if (object.bullets[i] != null) {
        object.bullets[i].draw();
        object.bullets[i].shoot();
        this.wrap(object.bullets[i]);
        object.bullets[i].timer();

        if (object.bullets[i].getTime() > maxBulletTime) {
          object.bullets.shift();
        }
      }
    }
  }

  checkCollisions(object1, object2) {
    if (object1 != null && object2 != null) {
      let size1 = object1.collider.size / 2;
      let size2 = object2.collider.size / 2;

      if (
        object1.collider.position.x + size1 >=
          object2.collider.position.x - size2 &&
        object1.collider.position.x - size1 <=
          object2.collider.position.x + size2 &&
        object1.collider.position.y + size1 >=
          object2.collider.position.y - size2 &&
        object1.collider.position.y - size1 <=
          object2.collider.position.y + size2
      ) {
        return true;
      }
    }
  }

  respawnShip(ship) {
    ship.position = createVector(width / 2, height / 2);
    ship.velocity = createVector(0, 0);
    ship.angle = -90;
    ship.collider.position = ship.position;
  }
}
