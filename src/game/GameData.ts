import { Action, Color, WinCondition } from "./types";
import { BoardData } from "./BoardData";
import { getValidQueenMoves } from "./chess";
import { SquareType } from "./SquareTypes";
import { IGameSettings } from "./GameSettings";

export class GameData {
  gameSettings: IGameSettings;

  boardData: BoardData;

  turn: {
    color: Color;
    action: Action;
  } = {
    color: undefined,
    action: undefined,
  };

  winCondition: WinCondition;

  constructor(gameSettings: IGameSettings) {
    this.gameSettings = gameSettings;

    this.boardData = new BoardData(
      this.gameSettings.rows,
      this.gameSettings.columns
    );

    for (const whiteQueen of this.gameSettings.start.pieces.white) {
      this.boardData.setSquareType(whiteQueen, SquareType.WhitePiece);
    }

    for (const blackQueen of this.gameSettings.start.pieces.black) {
      this.boardData.setSquareType(blackQueen, SquareType.BlackPiece);
    }

    this.turn.color = this.gameSettings.start.color;
    this.turn.action = this.gameSettings.start.action;

    this.winCondition = this.getWinCondition();
  }

  nextTurn() {
    this.turn.color = this.turn.color === "black" ? "white" : "black";

    if (this.turn.color === this.gameSettings.start.color) {
      this.turn.action = this.turn.action === "card" ? "piece" : "card";
    }

    this.winCondition = this.getWinCondition();
  }

  getWinCondition() {
    const queens = this.boardData.getQueenPositions();

    let whiteLost = true;
    let blackLost = true;

    for (const whiteQueen of queens.white) {
      if (getValidQueenMoves(this.boardData, whiteQueen).length !== 0) {
        whiteLost = false;
        break;
      }
    }

    for (const blackQueen of queens.black) {
      if (getValidQueenMoves(this.boardData, blackQueen).length !== 0) {
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
