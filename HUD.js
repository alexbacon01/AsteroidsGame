class HUD {
    constructor(font){
        this.font = font;
        this.startButton = new Button(createVector(width/2, height - height/3), createVector(width/3, height/6), "Start", this.font);
        this.restartButton = new Button(createVector(width/2, height - height/3), createVector(width/3, height/6), "Restart", this.font);
    }
    drawScore(score){
        this.setFont();
        let string = "Score: " + score;
        text(string, width-textWidth(string), 75);
    }

    drawLives(lives){
        this.setFont();
        let string = "Lives: " + lives;
        text(string, 0+textWidth(string), 75);
    }

    endScreen(){
        this.setFont();
        let string = "game over";
        textSize(width/10);
        text(string, width/2, height/3);

        this.restartButton.draw();
    }

    setFont(){
        textFont(this.font);
        fill(255);
        textSize(width/40);
        textAlign(CENTER);
    }

    titleScreen(){
        this.setFont();
        let string = "Asteroids"
        textSize(width/12);
        text(string, width/2, height/3);

        this.startButton.draw();

    }

}