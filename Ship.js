class Ship {
  constructor(image, size, position, mass) {
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
  }

  draw() {
    fill(0);
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
  }

  hyperSpace() {
    if (this.hyperSpaceTimer > this.hyperSpaceCooldown) {
      let newX = random(0 + this.size / 2, width - this.size / 2);
      let newY = random(0 + this.size / 2, height - this.size / 2);

      this.position = createVector(newX, newY);
      this.hyperSpaceTimer = 0;
    }
  }

  coolDownTimer(currentTime) {
    currentTime++;
    return currentTime;
  }

  shootBullet() {
    if (this.bulletTimer > this.bulletCooldown) {
      this.bullets.push(
        new Bullet(
          createVector(
            this.position.x - this.size / 2.4,
            this.position.y - this.size / 20
          ),
          5,
          "#2cfc03",
          this.directionVector.copy(),
          this.angle,
          this.velocity.copy()
        )
      );
      this.numBullets++;
      this.bulletTimer = 0;
    }
  }
}
