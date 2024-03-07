class Asteroid {
  constructor(image, position, size) {
    this.position = position;
    this.size = size;
    this.image = image;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(random(-1, 1), random(-1, 1));
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

  break() {
    print("break");
  }
}
