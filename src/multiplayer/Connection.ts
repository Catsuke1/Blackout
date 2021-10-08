import { GameCondition } from "../types";
import { Game } from "../game/Game";
import { Player } from "./Player";

export class Connection {
  player1: Player;
  player2: Player;
  game: Game;

  constructor(player1: Player, player2: Player, game: Game) {
    this.player1 = player1;
    this.player2 = player2;
    this.game = game;

    this.player1.setGame(this.game);
    this.player2.setGame(this.game);
    this.player1.color = "white";
    this.player2.color = "black";

    this.game.on("endTurn", (gameCondition: GameCondition) => {
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
