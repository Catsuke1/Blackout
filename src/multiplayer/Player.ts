import { GameComponent } from "../components/GameComponent";
import { getValidQueenMoves, isMoveValid } from "../game/Chess";
import { Game } from "../game/Game";
import {
  Color,
  GameCondition,
  GameData,
  GameElement,
  SquareTypes,
} from "../types";
import { EventEmitter } from "events";

export class Player extends EventEmitter {
  gameComponent: GameComponent;
  game: Game;

  constructor(gameElement: GameElement, game: Game) {
    super();

    this.gameComponent = new GameComponent(gameElement, game);
    this.game = game;

    this.gameComponent.boardComponent.forEachSquare(
      (squareComponent, position) => {
        squareComponent.element.onclick = () => {
          console.log(this.game.board.getSquareType(position), position);

          switch (this.game.board.getSquareType(position)) {
            case SquareTypes.Empty:
              if (this.game.turnAction === "card") {
                this.game.board.setSquareType(position, SquareTypes.Card);

                this.game.nextTurn();
              }

              if (
                this.game.turnAction === "piece" &&
                this.gameComponent.activePiece.wasClicked
              ) {
                if (
                  isMoveValid(
                    position,
                    this.gameComponent.activePiece.validMoves
                  )
                ) {
                  this.game.board.movePiece(
                    this.gameComponent.activePiece.position,
                    position
                  );

                  this.gameComponent.boardComponent.clearHighlights();

                  this.game.nextTurn();
                } else {
                  this.gameComponent.boardComponent.clearHighlights();

                  this.gameComponent.resetPiece();
                }
              }
              break;

            case SquareTypes.Card:
              this.gameComponent.boardComponent.clearHighlights();

              this.gameComponent.resetPiece();
              break;

            case SquareTypes.WhitePiece:
              this.gameComponent.boardComponent.clearHighlights();

              if (
                this.game.turnAction === "piece" &&
                this.game.turnColor === "white"
              ) {
                if (
                  this.gameComponent.activePiece.wasClicked &&
                  this.gameComponent.activePiece.position === position
                ) {
                  this.gameComponent.resetPiece();
                } else {
                  const validMoves = getValidQueenMoves(
                    this.game.board,
                    position
                  );

                  this.gameComponent.boardComponent.highlightSquares(
                    validMoves
                  );

                  this.gameComponent.setActivePiece(position, validMoves);
                }
              }
              break;

            case SquareTypes.BlackPiece:
              this.gameComponent.boardComponent.clearHighlights();

              if (
                this.game.turnAction === "piece" &&
                this.game.turnColor === "black"
              ) {
                if (
                  this.gameComponent.activePiece.wasClicked &&
                  this.gameComponent.activePiece.position === position
                ) {
                  this.gameComponent.resetPiece();
                } else {
                  const validMoves = getValidQueenMoves(
                    this.game.board,
                    position
                  );

                  this.gameComponent.boardComponent.highlightSquares(
                    validMoves
                  );

                  this.gameComponent.setActivePiece(position, validMoves);
                }
              }
              break;
          }
        };
      }
    );

    this.game.on("endTurn", (gameCondition: GameCondition) => {
      this.emit("endTurn", gameCondition);
    });
  }

  setGame(game: Game) {
    this.game = game;

    this.gameComponent.setGame(game);
  }
}
