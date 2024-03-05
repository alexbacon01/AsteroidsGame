let angle = 90;
class Ship {
  constructor(size, position) {
    this.image = image;
    this.size = size;
    this.position = position;
  }

  draw() {
    fill(0);
    push();
    rectMode(CENTER);
    angleMode(DEGREES);

    translate(this.position.x, this.position.y);
    rotate(angle);
    rect(0, 0, 50, 100);

    pop();
  }

  rotateShip(direction) {
    angle += direction;
  }
}
