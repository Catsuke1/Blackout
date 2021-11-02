import { GameComponent } from "./components/GameComponent";
import { GameData } from "./game/GameData";
import { LocalGame } from "./local/LocalGame";
import { Connection } from "./multiplayer/Connection";

import { GameElement, GameSettings } from "./game/types";
import { Player } from "./multiplayer/Player";

const gameSettings: GameSettings = {
  rows: 8,
  columns: 8,

  start: {
    pieces: {
      white: [
        {
          row: 0,
          column: 2,
        },
        {
          row: 0,
          column: 4,
        },
      ],
      black: [
        {
          row: 7,
          column: 3,
        },
        {
          row: 7,
          column: 5,
        },
      ],
    },

    color: "white",
    action: "piece",
  },
};

const gameData = new GameData(gameSettings);

const gameElement1: GameElement = {
  parent: document.querySelector("#player1"),
  board: document.querySelector("#player1>.board"),
  turnColor: document.querySelector("#player1>.gamestate .turnColor"),
  turnAction: document.querySelector("#player1>.gamestate .turnAction"),
  winner: document.querySelector("#player1>.gamestate .winner"),
};

const gameComponent1 = new GameComponent(gameElement1, gameData);

// const localGame = new LocalGame(gameData, gameComponent);

const player1 = new Player(gameComponent1);

const gameElement2: GameElement = {
  parent: document.querySelector("#player2"),
  board: document.querySelector("#player2>.board"),
  turnColor: document.querySelector("#player2>.gamestate .turnColor"),
  turnAction: document.querySelector("#player2>.gamestate .turnAction"),
  winner: document.querySelector("#player2>.gamestate .winner"),
};

const gameComponent2 = new GameComponent(gameElement2, gameData);

const player2 = new Player(gameComponent2);

const connection = new Connection(player1, player2, gameData);
