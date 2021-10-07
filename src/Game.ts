import { board } from "./app";
import { getValidQueenMoves } from "./Chess";

export class Game {
  figure: {
    wasClicked: boolean;
    position: {
      row: number;
      column: number;
    };
    validMoves: { row: number; column: number }[];
  };

  startingColor: "black" | "white";

  turn: "black" | "white";
  turnType: "card" | "piece";

  gameover: boolean;

  constructor(turn: "black" | "white", turnType: "card" | "piece") {
    this.figure = {
      wasClicked: false,
      position: {
        row: undefined,
        column: undefined,
      },
      validMoves: undefined,
    };

    this.startingColor = turn;
    this.turn = turn;
    this.turnType = turnType;

    this.displayTurnStatus();

    this.gameover = false;
  }

  setPiece(
    row: number,
    column: number,
    validMoves: {
      row: number;
      column: number;
    }[]
  ) {
    this.figure.wasClicked = true;
    this.figure.position.row = row;
    this.figure.position.column = column;
    this.figure.validMoves = validMoves;
  }

  resetPiece() {
    this.figure.wasClicked = false;
    this.figure.position.row = undefined;
    this.figure.position.column = undefined;
    this.figure.validMoves = undefined;
  }

  nextTurn() {
    this.turn = this.turn === "black" ? "white" : "black";

    if (this.turn === this.startingColor) {
      this.turnType = this.turnType === "card" ? "piece" : "card";
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

    turnElement.innerText = this.turn;
    turnTypeElement.innerText = this.turnType;
  }

  checkGameCondition() {
    const queens = board.getQueens();

    let whiteLost = true;
    let blackLost = true;

    for (const whiteQueen of queens.white) {
      if (
        getValidQueenMoves(board.squares, whiteQueen.row, whiteQueen.column)
          .length !== 0
      ) {
        whiteLost = false;
        break;
      }
    }

    for (const blackQueen of queens.black) {
      if (
        getValidQueenMoves(board.squares, blackQueen.row, blackQueen.column)
          .length !== 0
      ) {
        blackLost = false;
        break;
      }
    }

    if (whiteLost && blackLost) {
      this.gameover = true;
      if (this.turn === "white") return "blackwin";
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
