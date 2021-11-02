export enum SquareTypes {
  Empty,
  WhitePiece,
  BlackPiece,
  Card,
}

export type Position = {
  row: number;
  column: number;
};

export function toPos(row: number, column: number): Position {
  return { row: row, column: column };
}

export type Color = "white" | "black";

export type Action = "piece" | "card";

export type WinCondition = "blackwin" | "whitewin" | "nowin";

export type BoardData = SquareTypes[][];

export type GameElement = {
  parent: HTMLElement;
  board: HTMLElement;
  turnColor: HTMLElement;
  turnAction: HTMLElement;
  winner: HTMLElement;
};

export type GameSettings = {
  rows: number;
  columns: number;

  start: {
    pieces: {
      white: Position[];
      black: Position[];
    };
    color: Color;
    action: Action;
  };
};
