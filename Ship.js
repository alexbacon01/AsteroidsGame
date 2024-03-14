class Ship {
  constructor(image, size, position, mass, lives) {
    this.image = image;
    this.size = size;
    this.position = position;
    this.mass = mass;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.multiplier = 0.1;
    this.angle = -90;
    this.maxSpeed = 5;
    this.image = image;
    this.direction = 0;
    this.directionVector = p5.Vector.fromAngle(radians(this.direction));
    this.hyperSpaceCooldown = 100;
    this.hyperSpaceTimer = 100;
    this.bulletTimer = 20;
    this.bulletCooldown = 20;
    this.bullets = [];
    this.collider = new Collider(this.position, this.size - 10);
    this.lives = lives;
  }

  draw() {
    fill(0);
    this.collider.draw();
    if (this.direction != this.angle) {
      this.direction = lerp(this.direction, this.angle, 0.1);
      this.directionVector = p5.Vector.fromAngle(radians(this.direction));
    }
    push();
    angleMode(DEGREES);
    this.position.add(this.velocity);
    this.velocity.mult(0.99);
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.image, 0, 0);
    this.image.resize(this.size, this.size);
    pop();
    this.hyperSpaceTimer = this.coolDownTimer(this.hyperSpaceTimer);
    this.bulletTimer = this.coolDownTimer(this.bulletTimer);
  }

  rotateShip(step) {
    this.angle += step;
  }

  fireEngine() {
    let force = p5.Vector.fromAngle(radians(this.direction)).setMag(0.2);
    this.velocity.add(force);
    this.velocity.limit(this.maxSpeed);
    this.collider.position = this.position;
  }

  hyperSpace() {
    if (this.hyperSpaceTimer > this.hyperSpaceCooldown) {
      let newX = random(0 + this.size / 2, width - this.size / 2);
      let newY = random(0 + this.size / 2, height - this.size / 2);

      this.position = createVector(newX, newY);
      this.collider.position = this.position;

      this.hyperSpaceTimer = 0;
    }
  }

  coolDownTimer(currentTime) {
    currentTime++;
    return currentTime;
  }

  shootBullet(side) {
    //1 == left 2 ==right
    if (this.bulletTimer > this.bulletCooldown) {
      if (side == 1) {
        this.bullets.push(
          new Bullet(
            createVector(this.position.x, this.position.y),
            5,
            "c93312",
            this.directionVector.copy(),
            this.angle,
            this.velocity.copy()
          )
        );

        /*this.shootBullet(2);
      } else if (side == 2) {
        this.bullets.push(
          new Bullet(
            createVector(
              this.position.x + this.size / 2.4,
              this.position.y - this.size / 20
            ),
            5,
            "#2cfc03",
            this.directionVector.copy(),
            this.angle,
            this.velocity.copy()
          )
        );
      }
*/
        this.bulletTimer = 0;
      }
    }
  }
}
