class Ship {
  constructor(size, position) {
    this.image = image;
    this.size = size;
    this.position = position;
  }

  draw() {
    fill(0);
    rectMode(CENTER);
    rect(this.position.x, this.position.y, 50, 100);
    // ellipse(100, 100, 100, 100);
  }
}
