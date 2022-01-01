import { make2dArray, forEach2d } from "./arrayUtils";
import { IPosition } from "./Position";
import { toPos } from "./Position";
import { SquareTypes } from "./SquareTypes";

export class BoardData {
  rows: number;
  columns: number;

  squareTypes: SquareTypes[][];

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;

    this.squareTypes = make2dArray(rows, columns, SquareTypes.Empty);
  }

  getSquareType(position: IPosition) {
    return this.squareTypes[position.row][position.column];
  }

  setSquareType(position: IPosition, squareType: SquareTypes) {
    this.squareTypes[position.row][position.column] = squareType;
  }

  forEachSquareType(
    fn: (squareType: SquareTypes, position: IPosition) => void
  ) {
    forEach2d(this.squareTypes, (squareType, row, column) => {
      fn(squareType, toPos(row, column));
    });
  }

  movePiece(origin: IPosition, destination: IPosition) {
    this.setSquareType(destination, this.getSquareType(origin));
    this.setSquareType(origin, SquareTypes.Empty);
  }

  getQueenPositions() {
    const queens: {
      white: IPosition[];
      black: IPosition[];
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
