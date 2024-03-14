class Asteroid {
  constructor(image, position, size, velocity, acceleration, multiplier) {
    this.position = position;
    this.size = size;
    this.image = image;
    this.velocity = velocity.copy();
    this.acceleration = acceleration;
    this.speedLimit = 0.5;
    this.rotation = random(0, 360);
    this.collider = new Collider(this.position, this.size);
    this.multiplier = multiplier;
  }

  draw() {
    push();
    this.position.add(this.velocity);
    this.velocity.mult(this.multiplier)
    angleMode(DEGREES);
    translate(this.position.x, this.position.y);
    rotate((this.rotation += 0.1));
    imageMode(CENTER);
    image(this.image, 0, 0);
    pop();
    this.collider.draw();
  }

  move() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speedLimit);
  }
}
