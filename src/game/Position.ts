export interface IPosition {
  row: number;
  column: number;
}

export function toPos(row: number, column: number): IPosition {
  return { row: row, column: column };
}

export function isEqual(position: IPosition, target: IPosition): boolean {
  return position.row === target.row && position.column === target.column;
}
