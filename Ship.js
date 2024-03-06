
class Ship {
  constructor(image,size, position, mass) {
    this.image = image;
    this.size = size;
    this.position = position;
    this.mass = mass;
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.multiplier = 0.1;
    this.angle = 0 ;
    this.maxSpeed = 5;
    this.image = image;
    this.direction = 0;
    this.directionVector = p5.Vector.fromAngle(radians(this.direction));
  }

  draw() {
    fill(0);   
    if(this.direction != this.angle){
      this.direction = lerp(this.direction, this.angle, 0.1);
      this.directionVector  = p5.Vector.fromAngle(radians(this.direction));
    }
    push();
    angleMode(DEGREES);
    this.position.add(this.velocity); 
    this.velocity.mult(0.99);
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.image, 0, 0);
    pop();
  }

  rotateShip(step) {
    this.angle += step;
  }

  fireEngine(){
 let force = p5.Vector.fromAngle(radians(this.direction)).setMag(0.2);
 print(force);
 this.velocity.add(force);
 this.velocity.limit(this.maxSpeed);
  }


}
