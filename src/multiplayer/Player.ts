import { GameComponent } from "../components/GameComponent";
import { EventEmitter } from "events";
import { GameData } from "../game/GameData";
import { Color, SquareTypes } from "../game/types";
import { isMoveValid, getValidQueenMoves } from "../game/chess";

export class Player extends EventEmitter {
  gameComponent: GameComponent;

  color: Color;
  gameData: GameData;

  constructor(gameComponent: GameComponent) {
    super();

    this.gameComponent = gameComponent;

    this.gameComponent.on("click", (position) => {
      if (this.color !== this.gameData.turn.color) return;

      const squareType = this.gameData.board.getSquareType(position);

      switch (squareType) {
        case SquareTypes.Empty:
          if (this.gameData.turn.action === "card") {
            this.gameData.board.setSquareType(position, SquareTypes.Card);

            this.sendMove();
          }

          if (
            this.gameData.turn.action === "piece" &&
            this.gameComponent.activePiece.wasClicked
          ) {
            if (
              isMoveValid(position, this.gameComponent.activePiece.validMoves)
            ) {
              this.gameData.board.movePiece(
                this.gameComponent.activePiece.position,
                position
              );

              this.gameComponent.resetPiece();

              this.sendMove();
            } else {
              this.gameComponent.resetPiece();
            }
          }
          break;

        case SquareTypes.Card:
          this.gameComponent.resetPiece();
          break;

        case SquareTypes.WhitePiece:
          if (this.gameComponent.activePiece.wasClicked) {
            if (this.gameComponent.activePiece.position === position) {
              this.gameComponent.resetPiece();
              break;
            }
          }

          this.gameComponent.resetPiece();

          if (
            this.gameData.turn.action === "piece" &&
            this.gameData.turn.color === "white"
          ) {
            const validMoves = getValidQueenMoves(
              this.gameData.board,
              position
            );

            this.gameComponent.setActivePiece(position, validMoves);
          }
          break;

        case SquareTypes.BlackPiece:
          if (this.gameComponent.activePiece.wasClicked) {
            if (this.gameComponent.activePiece.position === position) {
              this.gameComponent.resetPiece();
              break;
            }
          }

          this.gameComponent.resetPiece();

          if (
            this.gameData.turn.action === "piece" &&
            this.gameData.turn.color === "black"
          ) {
            const validMoves = getValidQueenMoves(
              this.gameData.board,
              position
            );

            this.gameComponent.setActivePiece(position, validMoves);
          }
          break;
      }
    });
  }

  setGameData(gameData: GameData) {
    this.gameData = gameData;
    this.gameComponent.setGame(gameData);
  }

  setColor(color: Color) {
    this.color = color;
  }

  sendMove() {
    this.gameData.nextTurn();
    this.emit("move", this.gameData);
    console.log(this.gameData);
  }
}
