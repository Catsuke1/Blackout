import { GameData } from "../game/GameData";
import { Player } from "./Player";

export class Connection {
  player1: Player;
  player2: Player;
  gameData: GameData;

  constructor(player1: Player, player2: Player, gameData: GameData) {
    this.player1 = player1;
    this.player2 = player2;
    this.gameData = gameData;

    this.player1.setColor("white");
    this.player2.setColor("black");

    this.updateGameData(gameData);

    this.player1.on("move", (gameData) => {
      // if is valid
      if (this.isValidGameData(gameData)) {
        this.updateGameData(gameData);
      }
    });

    this.player2.on("move", (gameData) => {
      // if is valid
      if (this.isValidGameData(gameData)) {
        this.updateGameData(gameData);
      }
    });
  }

  updateGameData(gameData: GameData) {
    this.gameData = gameData;
    this.player1.setGameData(gameData);
    this.player2.setGameData(gameData);
  }

  isValidGameData(newGameData: GameData) {
    return true;
  }
}
