import { IBoardData } from "./BoardData";
import { getValidQueenMoves } from "./chess";
import { IPosition } from "./Position";

export class Piece {
  isActive: boolean = false;
  position: IPosition = undefined;
  validMoves: IPosition[] = [];

  constructor() {}

  activate(position: IPosition, boardData: IBoardData) {
    this.isActive = true;
    this.position = position;
    this.validMoves = getValidQueenMoves(boardData, position);
  }

  deactivate() {
    this.isActive = false;
    this.position = undefined;
    this.validMoves = [];
  }
}
