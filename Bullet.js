class Bullet {
  constructor(startPos, size, colour) {
    this.pos = startPos;
    this.size = size;
    this.colour = colour;
  }

  draw() {
    fill(this.colour);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  shoot(speed, angle) {
    this.pos.x += speed * sin(angle);
    this.pos.y += speed * cos(angle);
  }
}
