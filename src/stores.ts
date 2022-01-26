import { writable } from "svelte/store";
import { createGameSettings } from "./game/GameSettings";
import { Action, Color, GameData } from "./game/GameData";

const gameSettings = createGameSettings(
  8,
  8,
  [
    [0, 2],
    [0, 4],
  ],
  [
    [7, 3],
    [7, 5],
  ],
  Color.White,
  Action.Piece
);

export const Game = writable(new GameData(gameSettings));
