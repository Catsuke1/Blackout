import { Board } from "./Board";
import { createBoard } from "./index";
import { SquareTypes } from "./Square";

const width = 8;
const height = 8;

interface GameState {
  figure: {
    wasClicked: boolean;
    position: {
      row: number;
      column: number;
    };
    validMoves: { row: number; column: number }[];
  };
}

export const gameState: GameState = {
  figure: {
    wasClicked: false,
    position: {
      row: undefined,
      column: undefined,
    },
    validMoves: undefined,
  },
};

// create square elements
const squareElements = createBoard(
  width,
  height,
  document.getElementById("board")
);

// create board
export const board = new Board(squareElements);

// place initial pieces
board.squares[0][2].setType(SquareTypes.WhiteFigure);
board.squares[0][4].setType(SquareTypes.WhiteFigure);

board.squares[7][3].setType(SquareTypes.BlackFigure);
board.squares[7][5].setType(SquareTypes.BlackFigure);

board.squares[4][2].setType(SquareTypes.WhiteFigure);
