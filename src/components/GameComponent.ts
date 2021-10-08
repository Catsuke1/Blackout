import { getValidQueenMoves, isMoveValid } from "../game/Chess";
import { Game } from "../game/Game";
import { BoardComponent } from "./BoardComponent";
import { GameElement, Position, SquareTypes } from "../types";

export class GameComponent {
  element: GameElement;
  game: Game;

  boardComponent: BoardComponent;

  activePiece: {
    wasClicked: boolean;
    position: Position;
    validMoves: Position[];
  };

  constructor(element: GameElement, game: Game) {
    this.element = element;
    this.game = game;

    this.boardComponent = new BoardComponent(
      this.element.board,
      this.game.board
    );

    this.activePiece = {
      wasClicked: false,
      position: undefined,
      validMoves: undefined,
    };

    // setup squares
    this.boardComponent.forEachSquare((square, position) => {
      square.element.onclick = () => {
        console.log(square.type, position);

        switch (square.type) {
          case SquareTypes.Empty:
            if (this.game.turnAction === "card") {
              square.setType(SquareTypes.Card);

              this.game.nextTurn();
            }

            if (
              this.game.turnAction === "piece" &&
              this.activePiece.wasClicked
            ) {
              if (isMoveValid(position, this.activePiece.validMoves)) {
                this.boardComponent.movePiece(
                  this.activePiece.position,
                  position
                );

                this.boardComponent.clearHighlights();

                this.game.nextTurn();
              } else {
                this.boardComponent.clearHighlights();

                this.resetPiece();
              }
            }
            break;

          case SquareTypes.Card:
            this.boardComponent.clearHighlights();

            this.resetPiece();
            break;

          case SquareTypes.WhitePiece:
            this.boardComponent.clearHighlights();

            if (
              this.game.turnAction === "piece" &&
              this.game.turnColor === "white"
            ) {
              if (
                this.activePiece.wasClicked &&
                this.activePiece.position === position
              ) {
                this.resetPiece();
              } else {
                const validMoves = getValidQueenMoves(
                  this.game.board,
                  position
                );

                this.boardComponent.highlightSquares(validMoves);

                this.setActivePiece(position, validMoves);
              }
            }
            break;

          case SquareTypes.BlackPiece:
            this.boardComponent.clearHighlights();

            if (
              this.game.turnAction === "piece" &&
              this.game.turnColor === "black"
            ) {
              if (
                this.activePiece.wasClicked &&
                this.activePiece.position === position
              ) {
                this.resetPiece();
              } else {
                const validMoves = getValidQueenMoves(
                  this.game.board,
                  position
                );

                this.boardComponent.highlightSquares(validMoves);

                this.setActivePiece(position, validMoves);
              }
            }
            break;
        }
      };
    });

    this.displayTurnStatus();
  }

  setGame(game: Game) {
    this.game = game;

    this.boardComponent.setBoard(this.game.board);
    this.displayTurnStatus();
  }

  displayTurnStatus() {
    this.element.turnColor.innerText = this.game.turnColor;
    this.element.turnAction.innerText = this.game.turnAction;
  }

  disableSquaresOnclick() {
    this.boardComponent.forEachSquare((square, position) => {
      square.element.onclick = () => {};
    });
  }

  setActivePiece(position: Position, validMoves: Position[]) {
    this.activePiece.wasClicked = true;
    this.activePiece.position = position;
    this.activePiece.validMoves = validMoves;
  }

  resetPiece() {
    this.activePiece.wasClicked = false;
    this.activePiece.position = undefined;
    this.activePiece.validMoves = undefined;
  }
}
