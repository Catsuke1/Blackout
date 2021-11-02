import { EventEmitter } from "events";
import {
  Action,
  Color,
  GameSettings,
  SquareTypes,
  WinCondition,
} from "./types";
import { BoardData } from "./BoardData";
import { getValidQueenMoves } from "./chess";

export class GameData {
  gameSettings: GameSettings;

  board: BoardData;

  turn: {
    color: Color;
    action: Action;
  } = {
    color: undefined,
    action: undefined,
  };

  win: WinCondition;

  constructor(gameSettings: GameSettings) {
    this.gameSettings = gameSettings;

    this.board = new BoardData(
      this.gameSettings.rows,
      this.gameSettings.columns
    );

    for (const whiteQueen of this.gameSettings.start.pieces.white) {
      this.board.setSquareType(whiteQueen, SquareTypes.WhitePiece);
    }

    for (const blackQueen of this.gameSettings.start.pieces.black) {
      this.board.setSquareType(blackQueen, SquareTypes.BlackPiece);
    }

    this.turn.color = this.gameSettings.start.color;
    this.turn.action = this.gameSettings.start.action;

    this.win = this.checkGameCondition();
  }

  nextTurn() {
    this.turn.color = this.turn.color === "black" ? "white" : "black";

    if (this.turn.color === this.gameSettings.start.color) {
      this.turn.action = this.turn.action === "card" ? "piece" : "card";
    }

    this.win = this.checkGameCondition();
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
      if (this.turn.color === "white") return "blackwin";
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
