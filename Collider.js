class Collider {
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }

  //for debugging
  draw() {
    let c = color("#e33124");
    stroke(c);
    c.setAlpha(25);
    fill(c);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}
