import { make2dArray, forEach2d } from "./arrayUtils";
import { IPosition } from "./Position";
import { toPos } from "./Position";
import { SquareType } from "./SquareTypes";

export interface IBoardData {
  rows: number;
  columns: number;
  squareTypes: SquareType[][];

  getTypeAt(position: IPosition): SquareType;
}

export class BoardData implements IBoardData {
  rows: number;
  columns: number;
  squareTypes: SquareType[][];

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;

    this.squareTypes = make2dArray(rows, columns, SquareType.Empty);
  }

  getTypeAt(position: IPosition) {
    return this.squareTypes[position.row][position.column];
  }

  setSquareType(position: IPosition, squareType: SquareType) {
    this.squareTypes[position.row][position.column] = squareType;
  }

  forEachSquareType(fn: (squareType: SquareType, position: IPosition) => void) {
    forEach2d(this.squareTypes, (squareType, row, column) => {
      fn(squareType, toPos(row, column));
    });
  }

  movePiece(origin: IPosition, destination: IPosition) {
    this.setSquareType(destination, this.getTypeAt(origin));
    this.setSquareType(origin, SquareType.Empty);
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
      if (type === SquareType.WhitePiece) {
        queens.white.push(position);
      } else if (type === SquareType.BlackPiece) {
        queens.black.push(position);
      }
    });

    return queens;
  }
}
