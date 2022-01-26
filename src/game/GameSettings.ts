import { IPosition, toPos } from "./Position";
import { Vector2 } from "../utils/Vector2";
import { Color, Action } from "./GameData";

export interface IGameSettings {
  rows: number;
  columns: number;

  start: {
    pieces: {
      white: IPosition[];
      black: IPosition[];
    };
    color: Color;
    action: Action;
  };
}

export function createGameSettings(
  rows: number,
  columns: number,
  whiteStartingPositions: Vector2<number>[],
  blackStartingPositions: Vector2<number>[],
  startingColor: Color,
  startingAction: Action
): IGameSettings {
  return {
    rows,
    columns,
    start: {
      pieces: {
        white: whiteStartingPositions.map((vector) =>
          toPos(vector[0], vector[1])
        ),
        black: blackStartingPositions.map((vector) =>
          toPos(vector[0], vector[1])
        ),
      },
      color: startingColor,
      action: startingAction,
    },
  };
}
