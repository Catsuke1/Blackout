import { GameComponent } from "./components/GameComponent";
import { GameElement, GameSettings } from "./types";
import { Game } from "./game/Game";
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

const game = new Game(gameSettings);

const gameElement1: GameElement = {
  parent: document.querySelector("#player1"),
  board: document.querySelector("#player1>.board"),
  turnColor: document.querySelector("#player1>.gamestate .turnColor"),
  turnAction: document.querySelector("#player1>.gamestate .turnAction"),
};
const client1 = new GameComponent(gameElement1, game);

const player1 = new Player(client1, "white");

// const gameElement2: GameElement = {
//   parent: document.querySelector("#player2"),
//   board: document.querySelector("#player2>.board"),
//   turnColor: document.querySelector("#player2>.gamestate .turnColor"),
//   turnAction: document.querySelector("#player2>.gamestate .turnAction"),
// };
// const client2 = new GameComponent(gameElement2, game);

// const player2 = new Player(client2, "black");

// const connection = new Connection(player1, player2, game);
