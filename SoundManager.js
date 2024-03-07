class SoundManager {
  constructor(music) {
    this.bgMusic = music;
  }
  backgroundMusic() {
    this.bgMusic.loop();
  }
}
