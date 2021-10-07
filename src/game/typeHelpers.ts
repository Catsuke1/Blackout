import { Position } from "./types";

export function toPos(row: number, column: number): Position {
  return { row: row, column: column };
}
