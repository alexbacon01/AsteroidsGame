class Saucer {
  constructor(position, size, velocity, acceleration, shotSpeed) {
    this.position = position.copy();
    this.size = size;
    this.vel = velocity.copy();
    this.acceleration = acceleration;
    this.speedLimit = 0.5;
    this.collider = new Collider(this.position, this.size);
    this.bulletTimer = 200;
    this.bulletCooldown = shotSpeed;
    this.bullets = [];
    this.angle = 90;
    this.direction = 0;
    this.directionVector = p5.Vector.fromAngle(radians(this.direction));
    this.lives = 1;
    this.points = 300;
  }

  draw() {
    if (this.direction != this.angle) {
      this.direction = lerp(this.direction, this.angle, 0.1);
      this.directionVector = p5.Vector.fromAngle(radians(this.direction));
    }
    push();
    translate(this.position.x, this.position.y);
    //imageMode(CENTER);
    //image(this.image, 0, 0);
    fill(255);
    ellipse(0, 0, this.size, this.size);
    pop();
    this.collider.draw();
    this.bulletTimer = this.coolDownTimer(this.bulletTimer);
  }

  move() {
    this.vel.add(this.acceleration);
    this.vel.limit(this.speedLimit);
    this.position.add(this.vel);

    this.collider.position = this.position;
  }

  shoot(shipPos) {
    let m = (shipPos.y - this.position.y) / (shipPos.x - this.position.x);
    this.angle = atan(m);
    if (this.bulletTimer > this.bulletCooldown) {
      this.bullets.push(
        new Bullet(
          createVector(this.position.x, this.position.y),
          5,
          "#2cfc03",
          this.directionVector.copy(),
          this.angle,
          this.vel.copy()
        )
      );
      this.bulletTimer = 0;
    }
  }

  coolDownTimer(currentTime) {
    currentTime++;
    return currentTime;
  }
}
