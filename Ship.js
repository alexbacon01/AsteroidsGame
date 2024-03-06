
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
    this.hyperSpaceCooldown = 500;
    this.hyperSpaceTimer = 600;
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
    image(this.image,0,0);
    this.image.resize(this.size, this.size);
    pop();

    this.hyperSpaceTimer = this.coolDownTimer(this.hyperSpaceTimer);
    this.wrap();
  }

  rotateShip(step) {
    this.angle += step;
  }

  fireEngine(){
 let force = p5.Vector.fromAngle(radians(this.direction)).setMag(0.2);
 this.velocity.add(force);
 this.velocity.limit(this.maxSpeed);
  }

  hyperSpace(){
    if(this.hyperSpaceTimer>this.hyperSpaceCooldown){
      let newX = random(0 + this.size/2, width-this.size/2);
      let newY = random(0 + this.size/2, height-this.size/2);
  
      this.position = createVector(newX, newY);
      this.hyperSpaceTimer = 0;
    }
  }

  coolDownTimer(currentTime){
    currentTime++;
    return currentTime;
  }

  wrap(){
    if(this.position.x- this.size/2> width){
      this.position.x = 0;
    } else if(this.position.x +this.size/2< 0){
      this.position.x = width;
    }

    if(this.position.y-this.size/2 > height){
      this.position.y = 0;
    } else if(this.position.y + this.size/2 < 0){
      this.position.y = height;
    }
    }
  }

