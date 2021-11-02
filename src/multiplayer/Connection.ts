import { WinCondition } from "../types";
import { GameData } from "../data/GameData";
import { Player } from "./Player";

export class Connection {
  player1: Player;
  player2: Player;
  game: GameData;

  constructor(player1: Player, player2: Player, game: GameData) {
    this.player1 = player1;
    this.player2 = player2;
    this.game = game;

    this.player1.setGame(this.game);
    this.player2.setGame(this.game);
    this.player1.color = "white";
    this.player2.color = "black";

    this.game.on("endTurn", (gameCondition: WinCondition) => {
      console.log("End Turn");
      this.player1.setGame(this.game);
      this.player2.setGame(this.game);

      if (gameCondition === "blackwin") {
        document.getElementById("winner").innerText = "Black wins!";
        return;
      }
      if (gameCondition === "whitewin") {
        document.getElementById("winner").innerText = "White wins!";
        return;
      }
    });
  }
}
