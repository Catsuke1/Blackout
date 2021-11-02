import { BoardData } from "./BoardData";
import { Position, SquareTypes, toPos } from "./types";

export function isMoveValid(move: Position, validMoves: Position[]) {
  for (const validMove of validMoves) {
    if (move.row === validMove.row && move.column === validMove.column) {
      return true;
    }
  }

  return false;
}

export function getValidQueenMoves(board: BoardData, queenPosition: Position) {
  const validMoves: Position[] = [];

  // top
  for (let row = queenPosition.row - 1; row > -1; row--) {
    const squarePosition = toPos(row, queenPosition.column);

    if (board.getSquareType(squarePosition) !== SquareTypes.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // bottom
  for (let row = queenPosition.row + 1; row < board.rows; row++) {
    const squarePosition = toPos(row, queenPosition.column);

    if (board.getSquareType(squarePosition) !== SquareTypes.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // left
  for (let column = queenPosition.column - 1; column > -1; column--) {
    const squarePosition = toPos(queenPosition.row, column);

    if (board.getSquareType(squarePosition) !== SquareTypes.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // right
  for (
    let column = queenPosition.column + 1;
    column < board.columns;
    column++
  ) {
    const squarePosition = toPos(queenPosition.row, column);

    if (board.getSquareType(squarePosition) !== SquareTypes.Empty) {
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

    if (board.getSquareType(squarePosition) !== SquareTypes.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // diagonal top-right
  for (
    let row = queenPosition.row - 1, column = queenPosition.column + 1;
    row > -1 && column < board.columns;
    row--, column++
  ) {
    const squarePosition = toPos(row, column);

    if (board.getSquareType(squarePosition) !== SquareTypes.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // diagonal bottom-left
  for (
    let row = queenPosition.row + 1, column = queenPosition.column - 1;
    row < board.rows && column > -1;
    row++, column--
  ) {
    const squarePosition = toPos(row, column);

    if (board.getSquareType(squarePosition) !== SquareTypes.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  // diagonal bottom-right
  for (
    let row = queenPosition.row + 1, column = queenPosition.column + 1;
    row < board.rows && column < board.columns;
    row++, column++
  ) {
    const squarePosition = toPos(row, column);

    if (board.getSquareType(squarePosition) !== SquareTypes.Empty) {
      break;
    }

    validMoves.push(squarePosition);
  }

  return validMoves;
}
