class Button {
  constructor(position, size, text, font) {
    this.position = position;
    this.size = size;
    this.text = text;
    this.font = font;
  }

  draw() {
    push();
    textFont(this.font);
    textAlign(CENTER);

    rectMode(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(8);
    rect(this.position.x, this.position.y, this.size.x, this.size.y);
    textSize(width / 16);
    text(this.text, width / 2, this.position.y);
    pop();
  }

  clicked() {
    if (
      mouseIsPressed &&
      mouseX <= this.position.x + this.size.x / 2 &&
      mouseX >= this.position.x - this.size.x / 2 &&
      mouseY <= this.position.y + this.size.y / 2 &&
      mouseY >= this.position.y - this.size.y / 2
    ) {
      return true;
    }
    return false;
  }
}
