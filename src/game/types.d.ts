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

export type Color = "white" | "black";

export type Action = "piece" | "card";

export interface GameSettings {
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
}
