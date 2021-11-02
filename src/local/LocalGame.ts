import { getValidQueenMoves, isMoveValid } from "../chess";
import { GameComponent } from "../components/GameComponent";
import { GameData } from "../data/GameData";
import { GameElement, SquareTypes } from "../types";

export class LocalGame {
  gameData: GameData;
  gameComponent: GameComponent;

  constructor(gameData: GameData, gameComponent: GameComponent) {
    this.gameData = gameData;
    this.gameComponent = gameComponent;

    this.gameComponent.on("click", (position) => {
      const squareType = this.gameData.board.getSquareType(position);

      switch (squareType) {
        case SquareTypes.Empty:
          if (this.gameData.turn.action === "card") {
            this.gameData.board.setSquareType(position, SquareTypes.Card);

            this.nextTurn();
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

              this.nextTurn();
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

  nextTurn() {
    this.gameData.nextTurn();
    this.gameComponent.setGame(this.gameData);
  }
}
