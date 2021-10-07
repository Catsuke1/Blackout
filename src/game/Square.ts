import { getValidQueenMoves, isValidMove } from "./Chess";

export enum SquareTypes {
  Empty,
  WhitePiece,
  BlackPiece,
  Card,
}

export class Square {
  type: SquareTypes;

  element: HTMLElement;

  highlight: boolean;

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
          if (game.turnAction === "card") {
            this.setType(SquareTypes.Card);

            game.nextTurn();
          }

          if (game.turnAction === "piece") {
            if (game.figure.wasClicked) {
              if (
                isValidMove(
                  {
                    row: this.row,
                    column: this.col,
                  },
                  game.figure.validMoves
                )
              ) {
                board.movePiece(game.figure.position, {
                  row: this.row,
                  column: this.col,
                });

                board.clearSquares();

                game.nextTurn();
              } else {
                board.clearSquares();

                game.resetPiece();
              }
            }
          }
          break;

        case SquareTypes.Card:
          board.clearSquares();

          game.resetPiece();
          break;

        case SquareTypes.BlackPiece:
          if (game.turnAction === "piece") {
            if (game.turnColor === "black") {
              if (game.figure.wasClicked) {
                board.clearSquares();

                game.resetPiece();
              } else {
                const validMoves = getValidQueenMoves(
                  board.squares,
                  this.row,
                  this.col
                );

                board.showValidMoves(validMoves);

                game.setPiece(this.row, this.col, validMoves);
              }
            }
          }
          break;

        case SquareTypes.WhitePiece:
          if (game.turnAction === "piece") {
            if (game.turnColor === "white") {
              if (game.figure.wasClicked) {
                board.clearSquares();

                game.resetPiece();
              } else {
                const validMoves = getValidQueenMoves(
                  board.squares,
                  this.row,
                  this.col
                );

                board.showValidMoves(validMoves);

                game.setPiece(this.row, this.col, validMoves);
              }
            }
          }
          break;
      }
    };
  }

  setHighlight(flag: boolean) {
    this.highlight = flag;

    if (this.highlight) {
      this.element.innerText = "X";
    } else {
      this.element.innerText = "";
    }
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

      case SquareTypes.WhitePiece:
        this.element.innerText = "♕";
        break;

      case SquareTypes.BlackPiece:
        this.element.innerText = "♛";
        break;
    }
  }
}
