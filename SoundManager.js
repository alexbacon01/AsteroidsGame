class SoundManager {
  constructor(music) {
    this.bgMusic = music;
  }
  backgroundMusic() {
      this.bgMusic.loop();
  }

  playSound(sound) {
    sound.play();
  }

  stopMusic(){
    this.bgMusic.stop();
  }
}
