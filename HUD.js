class HUD {
    constructor(font){
        this.font = font;
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
        text(string, width/2, height/2);
    }

    setFont(){
        textFont(this.font);
        fill(255);
        textSize(width/40);
        textAlign(CENTER);
    }

}