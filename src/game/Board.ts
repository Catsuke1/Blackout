import { forEach2d, make2dArray } from "../utils";
import { Square } from "./Square";
import { Position, SquareTypes } from "./types";

export class Board {
  rows: number;
  columns: number;

  squares: Square[][];

  constructor(squareElements: HTMLElement[][]) {
    this.rows = squareElements.length;
    this.columns = squareElements[0].length;

    this.squares = make2dArray(this.rows, this.columns);

    forEach2d(squareElements, (element, row, col) => {
      this.squares[row][col] = new Square(element, SquareTypes.Empty);
    });
  }

  getSquare(position: Position) {
    return this.squares[position.row][position.column];
  }

  forEachSquare(fn: (square: Square, position: Position) => void) {
    forEach2d(this.squares, (square, row, column) => {
      fn(square, { row: row, column: column });
    });
  }

  highlightValidMoves(validMoves: Position[]) {
    for (const validMove of validMoves) {
      this.getSquare(validMove).setHighlight(true);
    }
  }

  clearHighlights() {
    this.forEachSquare((square, position) => {
      if (square.highlight) {
        square.setHighlight(false);
      }
    });
  }

  movePiece(origin: Position, destination: Position) {
    const originSquare = this.getSquare(origin);
    const destinationSquare = this.getSquare(destination);

    destinationSquare.setType(originSquare.type);
    originSquare.setType(SquareTypes.Empty);
  }

  getQueenPositions() {
    const queens: {
      white: Position[];
      black: Position[];
    } = {
      white: [],
      black: [],
    };

    this.forEachSquare((square, position) => {
      if (square.type === SquareTypes.WhitePiece) {
        queens.white.push(position);
      } else if (square.type === SquareTypes.BlackPiece) {
        queens.black.push(position);
      }
    });

    return queens;
  }
}
