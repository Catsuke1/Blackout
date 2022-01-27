import { writable } from "svelte/store";
import { createGameSettings } from "./game/GameSettings";
import { Action, Color, GameData } from "./game/GameData";
import { PeerClient } from "./connection/PeerClient";
import { MultiplayerHandler } from "./game/MultiplayerHandler";

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

export const Client = writable(new PeerClient());

export const Multiplayer = writable(new MultiplayerHandler());
