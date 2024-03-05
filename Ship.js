
class Ship {
  constructor(size, position, mass) {
    this.image = image;
    this.size = size;
    this.position = position;
    this.mass = mass;
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.multiplier = 0.1;
    this.angle = 0;
    this.maxSpeed = 5;
  }

  draw() {
    fill(0);   
    push();
    rectMode(CENTER);
    angleMode(DEGREES);
    this.position.add(this.velocity);
    this.velocity.mult(0.99);
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rect(0, 0, 50, 100);

    pop();
  }

  rotateShip(direction) {
    this.angle += direction;
  }

  fireEngine(){
 let force = p5.Vector.fromAngle(radians(this.angle)).setMag(0.2);
 this.velocity.add(force);
 this.velocity.limit(this.maxSpeed);
  }

  applyForce(force){
    let scaled = p5.Vector.div(force, this.mass);
    this.acceleration.add(scaled);
    print(this.acceleration);
  }
}
