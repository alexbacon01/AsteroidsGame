class SoundManager {
  constructor(music, saucerSFX, asteroidSFX, engineSFX, shotSFX, hyperspaceSFX) {
    this.bgMusic = music;
  }
  backgroundMusic() {
    this.bgMusic.loop();
  }
}
