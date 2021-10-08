import { EventEmitter } from "events";
import { GameComponent } from "../components/GameComponent";
import { Color, GameCondition } from "../types";
import { Game } from "../game/Game";

export class Player extends EventEmitter {
  gameComponent: GameComponent;
  color: Color;

  constructor(gameComponent: GameComponent, color: Color) {
    super();

    this.gameComponent = gameComponent;
    this.color = color;

    this.gameComponent.game.on("endTurn", (gameCondition: GameCondition) => {
      this.emit("endTurn", gameCondition);
    });
  }

  getGame() {
    return this.gameComponent.game;
  }

  setGame(game: Game) {
    this.gameComponent.setGame(game);
  }
}
