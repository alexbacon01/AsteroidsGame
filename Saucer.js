class Saucer{
    constructor( position, size, velocity, acceleration, shotSpeed) {
        this.position = position;
        this.size = size;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.speedLimit = 0.5;
        this.collider = new Collider(this.position, this.size);
        this.bulletTimer = 50;
        this.bulletCooldown = shotSpeed;
        this.bullets = [];
        this.angle = 90;
        this.direction = 0;
        this.directionVector = p5.Vector.fromAngle(radians(this.direction));
        this.lives = 1;
      }
    
      draw() {
        if (this.direction != this.angle) {
            this.direction = lerp(this.direction, this.angle, 0.1);
            this.directionVector = p5.Vector.fromAngle(radians(this.direction));
          }
        push();
        translate(this.position.x, this.position.y);
        //imageMode(CENTER);
        //image(this.image, 0, 0);
        fill(255);
        ellipse(0, 0, this.size, this.size);
        pop();
        this.collider.draw();
        this.bulletTimer = this.coolDownTimer(this.bulletTimer);
      }
    
      move() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.speedLimit);
        this.position.add(this.velocity);

        this.collider.position  = this.position;
      }

      shoot(shipPos){
        let m = (shipPos.y - this.position.y) / (shipPos.x - this.position.x);
         this.angle = atan(m);
        print(this.bulletTimer);
       if (this.bulletTimer > this.bulletCooldown) {
            print("Shoot")
              this.bullets.push(
                new Bullet(
                  createVector(this.position.x, this.position.y),
                  5,
                  "#2cfc03",
                  this.directionVector.copy(),
                  this.angle,
                  this.velocity.copy()
                )
              );
              this.bulletTimer = 0;
          }
      }

      coolDownTimer(currentTime) {
        currentTime++;
        return currentTime;
      }
}