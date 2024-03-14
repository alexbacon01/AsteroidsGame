class Bullet {
  constructor(startPos, size, colour, direction, angle, velocity) {
    this.position = startPos;
    this.size = size;
    this.colour = colour;
    this.velocity = velocity;
    this.speedLimit = 12;
    this.angle = angle;
    this.direction = direction;
    this.time = 0;
    this.alive = true;
    this.collider = new Collider(this.position, this.size - 10);
  }

  draw() {
    this.collider.draw();
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
    let force = this.direction;
    this.velocity.add(force);
    this.velocity.limit(this.speedLimit);
  }

  timer() {
    this.time++;
  }

  getTime() {
    return this.time;
  }
}
