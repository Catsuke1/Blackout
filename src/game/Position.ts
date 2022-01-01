export interface IPosition {
  row: number;
  column: number;
}

export class Position implements IPosition {
  public static isEqual(position: IPosition, target: IPosition): boolean {
    return position.row === target.row && position.column === target.column;
  }

  constructor(public row: number, public column: number) {}
}

export function toPos(row: number, column: number): Position {
  return new Position(row, column);
}
