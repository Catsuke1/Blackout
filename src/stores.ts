import { writable } from "svelte/store";
import { createGameSettings } from "./game/GameSettings";
import { Action, Color, GameData } from "./game/GameData";
import { PeerClient } from "./connection/PeerClient";
import { Connection } from "./connection/Connection";

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

const connectionState: {
  connected: boolean;
  connection: Connection;
  color: Color;
} = {
  connected: false,
  connection: undefined,
  color: undefined,
};

export const ConnectionStore = writable(connectionState);
