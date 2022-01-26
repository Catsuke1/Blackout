import { BoardData } from "./BoardData";
import { getValidQueenMoves } from "./chess";
import { SquareType } from "./SquareTypes";
import { IGameSettings } from "./GameSettings";

export enum Color {
  White,
  Black,
}

export enum Action {
  Piece,
  Card,
}

type Winner = Color | null;

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

  winner: Winner;

  constructor(gameSettings: IGameSettings) {
    this.gameSettings = gameSettings;

    this.reset();
  }

  reset(): void {
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

    this.winner = this.getWinner();
  }

  nextTurn(): void {
    this.turn.color =
      this.turn.color === Color.Black ? Color.White : Color.Black;

    if (this.turn.color === this.gameSettings.start.color) {
      this.turn.action =
        this.turn.action === Action.Card ? Action.Piece : Action.Card;
    }

    this.winner = this.getWinner();
  }

  getWinner(): Winner {
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
      if (this.turn.color === Color.White) return Color.Black;
      return Color.White;
    }

    if (whiteLost) {
      return Color.Black;
    }

    if (blackLost) {
      return Color.White;
    }

    return null;
  }
}
