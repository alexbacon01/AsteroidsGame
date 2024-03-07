class Bullet {
  constructor(startPos, size, colour, direction, angle, velocity) {
    this.position = startPos;
    this.size = size;
    this.colour = colour;
    this.velocity = velocity;
    this.speedLimit = 8;
    this.angle = angle;
    this.direction = direction;
    this.bulletTimer = 0;
    this.bulletLife = 300;
    this.alive = true;
  }

  draw() {
    push();
    angleMode(DEGREES);
    fill(this.colour);
    this.position.add(this.velocity);
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    ellipse(0, 0, this.size * 3, this.size);
    pop();
    this.bulletTimer++;
    if (this.bulletTimer >= this.bulletLife) {
      this.alive = false;
    }
  }

  shoot() {
    let force = this.direction.setMag(0.2);
    this.velocity.add(force);
    this.velocity.limit(this.speedLimit);
  }
}
