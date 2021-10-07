import { Board } from "./game/Board";
import { Game } from "./game/Game";
import { GameSettings } from "./game/types";
import { createSquareElements } from "./index";

declare global {
  interface Window {
    game?: Game;
  }
}

document.getElementById("newGame").onclick = () => {
  createNewGame();
};

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

createNewGame();

function createNewGame() {
  document.getElementById("board").textContent = "";

  const squareElements = createSquareElements(
    gameSettings.rows,
    gameSettings.columns,
    document.getElementById("board")
  );

  const board = new Board(squareElements);

  window.game = new Game(gameSettings, board);

  window.game.on("gameover", () => {
    console.log("gameover");
  });
}
