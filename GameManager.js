class GameManager {
  gameController = new GameController();

  spawnObjects() {
    this.gameController.spawnShip();
  }
}
