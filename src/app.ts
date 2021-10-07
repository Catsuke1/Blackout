import { Board } from "./game/Board";
import { Game } from "./game/Game";
import { createSquareElements } from "./index";

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

// create square elements
const squareElements = createSquareElements(
  gameSettings.rows,
  gameSettings.columns,
  document.getElementById("board")
);

// create board
const board = new Board(squareElements);

// create game
const game = new Game(gameSettings, board);
