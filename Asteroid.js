class Asteroid {
  constructor(image, position, size, velocity, acceleration) {
    this.position = position;
    this.size = size;
    this.image = image;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.speedLimit = 0.5;
    this.rotation = random(0, 360);
  }

  draw() {
    push();
    angleMode(DEGREES);
    translate(this.position.x, this.position.y);
    rotate((this.rotation += 0.1));
    imageMode(CENTER);
    image(this.image, 0, 0);
    this.image.resize(this.size, this.size);
    pop();
  }

  move() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speedLimit);
    this.position.add(this.velocity);
  }
}
