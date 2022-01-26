import { IBoardData } from "./BoardData";
import { getValidQueenMoves } from "./chess";
import { IPosition } from "./Position";

export class SelectedPiece {
  isSet: boolean = false;
  position: IPosition = undefined;
  validMoves: IPosition[] = [];

  constructor() {}

  set(position: IPosition, boardData: IBoardData) {
    this.isSet = true;
    this.position = position;
    this.validMoves = getValidQueenMoves(boardData, position);
  }

  unset() {
    this.isSet = false;
    this.position = undefined;
    this.validMoves = [];
  }
}
