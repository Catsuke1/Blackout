import { Square, SquareTypes } from "./Square";
import { forEach2d, make2dArray } from "../utils";

export class Board {
  rows: number;
  columns: number;

  squares: Square[][];

  constructor(squareElements: HTMLElement[][]) {
    this.rows = squareElements.length;
    this.columns = squareElements[0].length;

    this.squares = make2dArray(this.rows, this.columns);

    forEach2d(squareElements, (element, row, col) => {
      this.squares[row][col] = new Square(row, col, element, SquareTypes.Empty);
    });
  }

  showValidMoves(
    validMoves: {
      row: number;
      column: number;
    }[]
  ) {
    this.clearSquares();

    for (const move of validMoves) {
      this.squares[move.row][move.column].element.innerText = "X";
    }
  }

  clearSquares() {
    forEach2d(this.squares, (square, row, col) => {
      if (square.type === SquareTypes.Empty) {
        square.element.innerText = "";
      }
    });
  }

  movePiece(
    origin: { row: number; column: number },
    destination: { row: number; column: number }
  ) {
    const originSquare = this.squares[origin.row][origin.column];
    const destinationSquare = this.squares[destination.row][destination.column];

    destinationSquare.setType(originSquare.type);
    originSquare.setType(SquareTypes.Empty);
  }

  getQueens() {
    const queens: {
      white: {
        row: number;
        column: number;
      }[];
      black: {
        row: number;
        column: number;
      }[];
    } = {
      white: [],
      black: [],
    };

    forEach2d(this.squares, (square, row, column) => {
      if (square.type === SquareTypes.WhitePiece) {
        queens.white.push({ row: row, column: column });
      } else if (square.type === SquareTypes.BlackPiece) {
        queens.black.push({ row: row, column: column });
      }
    });

    return queens;
  }
}
