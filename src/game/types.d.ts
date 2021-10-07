type Position = {
  row: number;
  column: number;
};

type Color = "white" | "black";

type Action = "piece" | "card";

interface GameSettings {
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
