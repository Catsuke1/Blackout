import { Board } from "./game/Board";
import { Game } from "./game/Game";
import { createSquareElements } from "./index";
import { SquareTypes } from "./game/Square";

export const gameSettings = {
  width: 8,
  height: 8,
};

// create square elements
const squareElements = createSquareElements(
  gameSettings.width,
  gameSettings.height,
  document.getElementById("board")
);

// create board
export const board = new Board(squareElements);

// place initial pieces
board.squares[0][2].setType(SquareTypes.WhitePiece);
board.squares[0][4].setType(SquareTypes.WhitePiece);

board.squares[7][3].setType(SquareTypes.BlackPiece);
board.squares[7][5].setType(SquareTypes.BlackPiece);

export const game = new Game("white", "piece");
