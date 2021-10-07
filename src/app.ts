import { Board } from "./Board";
import { Game } from "./Game";
import { createBoard } from "./index";
import { SquareTypes } from "./Square";

const width = 8;
const height = 8;

// create square elements
const squareElements = createBoard(
  width,
  height,
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
