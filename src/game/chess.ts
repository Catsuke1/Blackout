import { IBoardData } from "./BoardData";
import { IPosition } from "./Position";
import { toPos } from "./Position";
import { SquareType } from "./SquareTypes";

export function isMoveValid(move: IPosition, validMoves: IPosition[]) {
  for (const validMove of validMoves) {
    if (move.row === validMove.row && move.column === validMove.column) {
      return true;
    }
  }

  return false;
}

export function getValidQueenMoves(
  boardData: IBoardData,
  queenPosition: IPosition
): IPosition[] {
  const validMoves: IPosition[] = [];

  // top
  for (let row = queenPosition.row - 1; row > -1; row--) {
    const squarePosition = toPos(row, queenPosition.column);

    if (boardData.getTypeAt(squarePosition) !== SquareType.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // bottom
  for (let row = queenPosition.row + 1; row < boardData.rows; row++) {
    const squarePosition = toPos(row, queenPosition.column);

    if (boardData.getTypeAt(squarePosition) !== SquareType.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // left
  for (let column = queenPosition.column - 1; column > -1; column--) {
    const squarePosition = toPos(queenPosition.row, column);

    if (boardData.getTypeAt(squarePosition) !== SquareType.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // right
  for (
    let column = queenPosition.column + 1;
    column < boardData.columns;
    column++
  ) {
    const squarePosition = toPos(queenPosition.row, column);

    if (boardData.getTypeAt(squarePosition) !== SquareType.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // diagonal top-left
  for (
    let row = queenPosition.row - 1, column = queenPosition.column - 1;
    row > -1 && column > -1;
    row--, column--
  ) {
    const squarePosition = toPos(row, column);

    if (boardData.getTypeAt(squarePosition) !== SquareType.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // diagonal top-right
  for (
    let row = queenPosition.row - 1, column = queenPosition.column + 1;
    row > -1 && column < boardData.columns;
    row--, column++
  ) {
    const squarePosition = toPos(row, column);

    if (boardData.getTypeAt(squarePosition) !== SquareType.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // diagonal bottom-left
  for (
    let row = queenPosition.row + 1, column = queenPosition.column - 1;
    row < boardData.rows && column > -1;
    row++, column--
  ) {
    const squarePosition = toPos(row, column);

    if (boardData.getTypeAt(squarePosition) !== SquareType.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // diagonal bottom-right
  for (
    let row = queenPosition.row + 1, column = queenPosition.column + 1;
    row < boardData.rows && column < boardData.columns;
    row++, column++
  ) {
    const squarePosition = toPos(row, column);

    if (boardData.getTypeAt(squarePosition) !== SquareType.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  return validMoves;
}
