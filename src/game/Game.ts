import { Board } from "./Board";
import { getValidQueenMoves } from "./Chess";
import { Action, Color, GameSettings, Position } from "./types";

export class Game {
  gameSettings: GameSettings;
  board: Board;

  turnColor: Color;
  turnAction: Action;

  figure: {
    wasClicked: boolean;
    position: Position;
    validMoves: Position[];
  };

  gameover: boolean;

  constructor(gameSettings: GameSettings, board: Board) {
    this.gameSettings = gameSettings;
    this.board = board;

    this.turnColor = this.gameSettings.start.color;
    this.turnAction = this.gameSettings.start.action;

    this.gameover = false;

    this.resetPiece();
    this.displayTurnStatus();
  }

  setPiece(position: Position, validMoves: Position[]) {
    this.figure.wasClicked = true;
    this.figure.position = position;
    this.figure.validMoves = validMoves;
  }

  resetPiece() {
    this.figure.wasClicked = false;
    this.figure.position = undefined;
    this.figure.validMoves = undefined;
  }

  nextTurn() {
    this.turnColor = this.turnColor === "black" ? "white" : "black";

    if (this.turnColor === this.gameSettings.start.color) {
      this.turnAction = this.turnAction === "card" ? "piece" : "card";
    }

    this.resetPiece();
    this.displayTurnStatus();

    const gameCondition = this.checkGameCondition();

    if (this.gameover) {
      const winnerElement = document.getElementById("winner");
      winnerElement.innerText = gameCondition;
    }
  }

  displayTurnStatus() {
    const turnElement = document.getElementById("turn");
    const turnTypeElement = document.getElementById("turnType");

    turnElement.innerText = this.turnColor;
    turnTypeElement.innerText = this.turnAction;
  }

  checkGameCondition() {
    const queens = this.board.getQueenPositions();

    let whiteLost = true;
    let blackLost = true;

    for (const whiteQueen of queens.white) {
      if (
        getValidQueenMoves(
          this.board.squares,
          whiteQueen.row,
          whiteQueen.column
        ).length !== 0
      ) {
        whiteLost = false;
        break;
      }
    }

    for (const blackQueen of queens.black) {
      if (
        getValidQueenMoves(
          this.board.squares,
          blackQueen.row,
          blackQueen.column
        ).length !== 0
      ) {
        blackLost = false;
        break;
      }
    }

    if (whiteLost && blackLost) {
      this.gameover = true;
      if (this.turnColor === "white") return "blackwin";
      return "whitewin";
    }

    if (whiteLost) {
      this.gameover = true;
      return "blackwin";
    }

    if (blackLost) {
      this.gameover = true;
      return "whitewin";
    }

    return "nowin";
  }
}
