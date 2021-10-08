import { EventEmitter } from "events";
import { Action, Color, GameData, GameSettings, SquareTypes } from "../types";
import { Board } from "./Board";
import { getValidQueenMoves } from "./Chess";

export class Game extends EventEmitter {
  gameSettings: GameSettings;

  board: Board;
  turnColor: Color;
  turnAction: Action;

  constructor(gameSettings: GameSettings) {
    super();

    this.gameSettings = gameSettings;

    this.board = new Board(this.gameSettings.rows, this.gameSettings.columns);

    for (const whiteQueen of this.gameSettings.start.pieces.white) {
      this.board.setSquareType(whiteQueen, SquareTypes.WhitePiece);
    }

    for (const blackQueen of this.gameSettings.start.pieces.black) {
      this.board.setSquareType(blackQueen, SquareTypes.BlackPiece);
    }

    this.turnColor = this.gameSettings.start.color;
    this.turnAction = this.gameSettings.start.action;
  }

  getData(): GameData {
    return {
      boardData: this.board.squareTypes,
      turnColor: this.turnColor,
      turnAction: this.turnAction,
    };
  }

  nextTurn() {
    this.turnColor = this.turnColor === "black" ? "white" : "black";

    if (this.turnColor === this.gameSettings.start.color) {
      this.turnAction = this.turnAction === "card" ? "piece" : "card";
    }

    const gameCondition = this.checkGameCondition();

    this.emit("endTurn", gameCondition);
  }

  checkGameCondition() {
    const queens = this.board.getQueenPositions();

    let whiteLost = true;
    let blackLost = true;

    for (const whiteQueen of queens.white) {
      if (getValidQueenMoves(this.board, whiteQueen).length !== 0) {
        whiteLost = false;
        break;
      }
    }

    for (const blackQueen of queens.black) {
      if (getValidQueenMoves(this.board, blackQueen).length !== 0) {
        blackLost = false;
        break;
      }
    }

    if (whiteLost && blackLost) {
      if (this.turnColor === "white") return "blackwin";
      return "whitewin";
    }

    if (whiteLost) {
      return "blackwin";
    }

    if (blackLost) {
      return "whitewin";
    }

    return "nowin";
  }
}
