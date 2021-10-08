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

export type GameCondition = "blackwin" | "whitewin" | "nowin";

export type BoardData = SquareTypes[][];

export type GameData = {
  boardData: BoardData;
  turnColor: Color;
  turnAction: Action;
};

export type GameElement = {
  parent: HTMLElement;
  board: HTMLElement;
  turnColor: HTMLElement;
  turnAction: HTMLElement;
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
