class HUD {
  constructor(font) {
    this.font = font;
    this.input;
    this.startButton = new Button(
      createVector(width / 2, height - height / 3.5),
      createVector(width / 1.8, height / 8),
      "Start",
      this.font
    );
    this.leaderboardButton = new Button(
      createVector(width / 2, height - height / 2.2),
      createVector(width / 1.8, height / 8),
      "Leaderboard",
      this.font
    );
    this.restartButton = new Button(
      createVector(width / 2, height - height / 3.5),
      createVector(width / 1.8, height / 8),
      "Restart",
      this.font
    );
  }
  drawScore(score) {
    this.setFont();
    let string = "Score: " + score;
    text(string, width - textWidth(string), 75);
  }

  drawLives(lives) {
    this.setFont();
    let string = "Lives: " + lives;
    text(string, 0 + textWidth(string), 75);
  }

  endScreen(score) {
    this.setFont();
    let string = "game over";
    textSize(width / 10);
    text(string, width / 2, height / 3);
    textSize(width / 16);
    text("Score: " + score, width / 2, height / 3 + height / 9);

    this.restartButton.draw();
    this.leaderboardButton.draw();
  }

  setFont() {
    textFont(this.font);
    fill(255);
    textSize(width / 40);
    textAlign(CENTER);
  }

  titleScreen() {
    this.setFont();
    let string = "Asteroids";
    textSize(width / 12);
    text(string, width / 2, height / 4);
    textSize(width / 20);
    text("Enter your name:", width / 2, height / 2.8);
    this.startButton.draw();
    this.leaderboardButton.draw();
  }

  displayLeader(leaderboard) {
    background(0);
    this.setFont();
    let string = "";
    for (let i = 1; i < 11; i++) {
      if (getItem(i.toString()) != null) {
        string = i + ". " + getItem(i + "name") + ": " + getItem(i);
        text(string, width / 3, i * 40);
      }
    }

    this.startButton.draw();
  }
}
