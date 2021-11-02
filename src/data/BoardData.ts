import { Position, SquareTypes, toPos } from "../types";
import { forEach2d, make2dArray } from "../utils";

export class BoardData {
  rows: number;
  columns: number;

  squareTypes: SquareTypes[][];

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;

    this.squareTypes = make2dArray(rows, columns, SquareTypes.Empty);
  }

  getSquareType(position: Position) {
    return this.squareTypes[position.row][position.column];
  }

  setSquareType(position: Position, squareType: SquareTypes) {
    this.squareTypes[position.row][position.column] = squareType;
  }

  forEachSquareType(fn: (squareType: SquareTypes, position: Position) => void) {
    forEach2d(this.squareTypes, (squareType, row, column) => {
      fn(squareType, toPos(row, column));
    });
  }

  movePiece(origin: Position, destination: Position) {
    this.setSquareType(destination, this.getSquareType(origin));
    this.setSquareType(origin, SquareTypes.Empty);
  }

  getQueenPositions() {
    const queens: {
      white: Position[];
      black: Position[];
    } = {
      white: [],
      black: [],
    };

    this.forEachSquareType((type, position) => {
      if (type === SquareTypes.WhitePiece) {
        queens.white.push(position);
      } else if (type === SquareTypes.BlackPiece) {
        queens.black.push(position);
      }
    });

    return queens;
  }
}
