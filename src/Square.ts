import { board, gameState } from "./app";
import { getValidQueenMoves, isValidMove } from "./Chess";

export enum SquareTypes {
  Empty,
  WhiteFigure,
  BlackFigure,
  Card,
}

export class Square {
  row: number;
  col: number;
  element: HTMLElement;
  type: SquareTypes;

  constructor(
    row: number,
    col: number,
    element: HTMLElement,
    type: SquareTypes
  ) {
    this.row = row;
    this.col = col;
    this.element = element;
    this.type = type;

    this.element.onclick = () => {
      console.log(this.row, this.col);

      switch (this.type) {
        case SquareTypes.Empty:
          if (gameState.figure.wasClicked) {
            if (
              isValidMove(
                {
                  row: this.row,
                  column: this.col,
                },
                gameState.figure.validMoves
              )
            ) {
              board.movePiece(gameState.figure.position, {
                row: this.row,
                column: this.col,
              });
            }

            board.clearSquares();

            gameState.figure.wasClicked = false;
          } else {
            this.setType(SquareTypes.Card);
          }

          break;

        case SquareTypes.BlackFigure:
        case SquareTypes.WhiteFigure:
          if (gameState.figure.wasClicked) {
            if (
              gameState.figure.position.row === this.row &&
              gameState.figure.position.column === this.col
            ) {
              board.clearSquares();

              gameState.figure.wasClicked = false;
            }
          } else {
            const validMoves = getValidQueenMoves(
              board.squares,
              this.row,
              this.col
            );

            board.showValidMoves(validMoves);

            gameState.figure.wasClicked = true;
            gameState.figure.position.row = this.row;
            gameState.figure.position.column = this.col;
            gameState.figure.validMoves = validMoves;
          }
          break;
      }
    };
  }

  setType(type: SquareTypes) {
    this.type = type;

    switch (this.type) {
      case SquareTypes.Empty:
        this.element.innerText = "";
        break;

      case SquareTypes.Card:
        this.element.classList.add("card");
        break;

      case SquareTypes.WhiteFigure:
        this.element.innerText = "♕";
        break;

      case SquareTypes.BlackFigure:
        this.element.innerText = "♛";
        break;
    }
  }
}
